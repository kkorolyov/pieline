package dev.kkorolyov.pieauth.service

import dev.kkorolyov.pieauth.PassMaster
import dev.kkorolyov.pieauth.db.Credentials
import dev.kkorolyov.pieauth.db.DbConfig
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineImplBase
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthRequest
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthResponse
import dev.kkorolyov.pieline.proto.common.Common.Uuid
import dev.kkorolyov.pieline.proto.user.UserOuterClass.Details
import dev.kkorolyov.pieline.proto.user.UserOuterClass.User
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import io.grpc.ManagedChannelBuilder
import io.grpc.Status
import io.grpc.StatusRuntimeException
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Slf4jSqlDebugLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory
import java.util.UUID

private val usersStub: UsersCoroutineStub =
	UsersCoroutineStub(ManagedChannelBuilder.forAddress("localhost", 50051).usePlaintext().build())

/**
 * Services auth-related requests.
 */
object AuthService : AuthCoroutineImplBase() {
	private val log = LoggerFactory.getLogger(AuthService::class.java)

	init {
		// Register DB
		DbConfig.db
		// Bootstrap tables
		transaction {
			SchemaUtils.createMissingTablesAndColumns(Credentials)
		}
	}

	override suspend fun authenticate(request: AuthRequest): AuthResponse {
		return transaction {
			addLogger(Slf4jSqlDebugLogger)

			Credentials.select {
				Credentials.key eq request.user
			}.firstOrNull { row -> PassMaster.verify(row[Credentials.pass], request.pass.toCharArray()) }?.get(Credentials.id)
		}?.let {
			AuthResponse.newBuilder().apply {
				// TODO
				jwt = "{id=$it}"
			}.build().also {
				log.info("authenticated user {{}}", request.user)
			}

		} ?: throw StatusRuntimeException(Status.UNAUTHENTICATED).also {
			log.error("failed to authenticate user {{}}", request.user)
		}
	}

	override suspend fun register(request: AuthRequest): AuthResponse {
		// Both credentials and user profile must be created together
		val id = transaction {
			try {
				addLogger(Slf4jSqlDebugLogger)

				val result = Credentials.insert {
					it[key] = request.user
					it[pass] = PassMaster.hash(request.pass.toCharArray())
					it[id] = UUID.randomUUID()
				}.also {
					log.info("created credentials for user {{}}", request.user)
				}

				runBlocking {
					usersStub.upsert(
						flowOf(
							User.newBuilder().apply {
								id = Uuid.newBuilder().apply {
									value = result[Credentials.id].toString()
								}.build()
								details = Details.newBuilder().apply {
									email = request.user
								}.build()
							}.build()
						)
					)
				}.also {
					log.info("created profile for user {{}}", request.user)
				}
				id
			} catch (e: Exception) {
				rollback()
				log.error("failed to register user {{${request.user}}}", e)
				throw e
			}
		}
		log.info("registered user {{}}", request.user)

		return AuthResponse.newBuilder().apply {
			// TODO
			jwt = "{id=$id}"
		}.build()
	}
}
