package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Namespace
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.piegate.util.uuid
import dev.kkorolyov.pieline.proto.common.Common.UuidList
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.Project
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.SearchRequest
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.SearchResponse
import dev.kkorolyov.pieline.proto.project.ProjectsGrpcKt.ProjectsCoroutineStub
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `projects` module of the GraphQL schema.
 */
@Namespace("projects")
object ProjectsSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(ProjectsSchema::class.java)

	/**
	 * Searches for projects matching [request].
	 */
	@Query("search")
	fun search(
		@Arg("request") request: SearchRequest,
		projectsStub: ProjectsCoroutineStub
	): ListenableFuture<SearchResponse> = runBlocking {
		future {
			projectsStub.search(request).also {
				log.info("search projects for request{{}} = {}", request, it)
			}
		}
	}

	/**
	 * Gets project for [id], if any.
	 */
	@Query("get")
	fun get(@Arg("id") id: String, projectsStub: ProjectsCoroutineStub): ListenableFuture<Project?> = runBlocking {
		future {
			projectsStub.get(flowOf(uuid(id))).firstOrNull().also {
				log.info("get project for id{{}} = {}", id, it)
			}
		}
	}

	/**
	 * Upserts [project].
	 */
	@Mutation("set")
	fun set(@Arg("project") project: Project, projectsStub: ProjectsCoroutineStub): ListenableFuture<Project> =
		runBlocking {
			future {
				projectsStub.upsert(flowOf(project)).first().also {
					log.info("set project{{}} = {}", project, it)
				}
			}
		}

	/**
	 * Deletes all projects matching [ids] and returns their former representations.
	 */
	@Mutation("delete")
	fun delete(@Arg("ids") ids: UuidList, projectsStub: ProjectsCoroutineStub): ListenableFuture<List<Project>> =
		runBlocking {
			future {
				projectsStub.delete(ids.idsList.asFlow()).toList().also {
					log.info("delete projects for ids{{}} = {}", ids, it)
				}
			}
		}
}
