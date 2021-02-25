package dev.kkorolyov.pieproj.service

import dev.kkorolyov.pieline.proto.common.Common.Uuid
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.Project
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.Project.Details
import dev.kkorolyov.pieline.proto.project.ProjectsGrpcKt.ProjectsCoroutineImplBase
import dev.kkorolyov.pieline.trace.span
import dev.kkorolyov.pieproj.db.DB
import dev.kkorolyov.pieproj.db.Projects
import dev.kkorolyov.pieproj.trace.TRACER
import io.grpc.Status
import io.grpc.StatusRuntimeException
import io.opentracing.contrib.grpc.OpenTracingContextKey
import io.opentracing.tag.Tags
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Slf4jSqlDebugLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import org.slf4j.LoggerFactory
import java.util.UUID

/**
 * Services project requests.
 */
object ProjectService : ProjectsCoroutineImplBase() {
	private val log = LoggerFactory.getLogger(ProjectService::class.java)

	init {
		// Initialize database
		DB
		transaction {
			SchemaUtils.createMissingTablesAndColumns(Projects)
		}
	}

	override fun get(requests: Flow<Uuid>): Flow<Project> =
		TRACER.span("transaction", parent = OpenTracingContextKey.activeSpan()).use { span ->
			span.setTag(Tags.DB_TYPE, "sql")

			val result = transaction {
				addLogger(Slf4jSqlDebugLogger)

				Projects.select {
					Projects.id inList runBlocking {
						try {
							requests.map {
								UUID.fromString(it.value)
							}.toList()
						} catch (e: IllegalArgumentException) {
							throw StatusRuntimeException(Status.INVALID_ARGUMENT)
						}
					}
				}.map {
					Project.newBuilder().apply {
						id = Uuid.newBuilder().apply {
							value = it[Projects.id].toString()
						}.build()
						details = Details.newBuilder().apply {
							title = it[Projects.title]
							description = it[Projects.description]
						}.build()
					}.build()
				}
			}
			span.setTag("result.count", result.size)
			log.info("GET {} projects", result.size)

			result.asFlow()
		}

	override fun upsert(requests: Flow<Project>): Flow<Project> =
		TRACER.span("transaction", parent = OpenTracingContextKey.activeSpan()).use { span ->
			span.setTag(Tags.DB_TYPE, "sql")

			val result = transaction {
				addLogger(Slf4jSqlDebugLogger)

				val collectRequests = runBlocking { requests.toList() }

				val toCreate = mutableListOf<Project>()
				val toUpdate = mutableListOf<Project>()

				collectRequests.forEach {
					(if (it.id.value.isEmpty()) toCreate else toUpdate) += it
				}

				val created = create(toCreate)
				val updated = update(toUpdate)

				collectRequests.map {
					created[it] ?: updated[it]!!
				}
			}
			span.setTag("result.count", result.size)
			log.info("UPSERT {} projects", result.size)

			result.asFlow()
		}

	private fun create(requests: Collection<Project>): Map<Project, Project> = requests.map { request ->
		val result = Projects.insert { row ->
			row[id] = UUID.randomUUID()
			request.details?.let {
				row[title] = it.title
				row[description] = it.description
			}
		}

		request to Project.newBuilder().apply {
			id = Uuid.newBuilder().apply {
				value = result[Projects.id].toString()
			}.build()
			details = Details.newBuilder().apply {
				title = result[Projects.title]
				description = result[Projects.description]
			}.build()
		}.build()
	}.toMap()

	private fun update(requests: Collection<Project>): Map<Project, Project> {
		try {
			requests.forEach { request ->
				Projects.update({
					Projects.id eq UUID.fromString(request.id.value)
				}) { row ->
					row[id] = UUID.randomUUID()
					request.details?.let {
						row[title] = it.title
						row[description] = it.description
					}
				}
			}
		} catch (e: IllegalArgumentException) {
			throw StatusRuntimeException(Status.INVALID_ARGUMENT)
		}

		val result = Projects.select {
			Projects.id inList requests.map { UUID.fromString(it.id.value) }
		}.map { result ->
			Project.newBuilder().apply {
				id = Uuid.newBuilder().apply {
					value = result[Projects.id].toString()
				}.build()
				details = Details.newBuilder().apply {
					title = result[Projects.title]
					description = result[Projects.description]
				}.build()
			}.build()
		}.associateBy { it.id }

		return requests.map { it to result[it.id]!! }.toMap()
	}

	override fun delete(requests: Flow<Uuid>): Flow<Project> =
		TRACER.span("transaction", parent = OpenTracingContextKey.activeSpan()).use { span ->
			span.setTag(Tags.DB_TYPE, "sql")

			val result = transaction {
				addLogger(Slf4jSqlDebugLogger)

				val result = Projects.slice(Projects.id).select {
					Projects.id inList runBlocking {
						try {
							requests.map { UUID.fromString(it.value) }.toList()
						} catch (e: IllegalArgumentException) {
							throw StatusRuntimeException(Status.INVALID_ARGUMENT)
						}
					}
				}.map {
					Project.newBuilder().apply {
						id = Uuid.newBuilder().apply {
							value = it[Projects.id].toString()
						}.build()
						details = Details.newBuilder().apply {
							title = it[Projects.title]
							description = it[Projects.description]
						}.build()
					}.build()
				}

				Projects.deleteWhere {
					Projects.id inList result.map { UUID.fromString(it.id.value) }
				}

				result
			}
			span.setTag("result.count", result.size)
			log.info("DELETE {} projects", result.size)

			result.asFlow()
		}
}
