package dev.kkorolyov.pieauth.service

import dev.kkorolyov.pieauth.auth.PassMaster
import dev.kkorolyov.pieauth.auth.RoleMaster
import dev.kkorolyov.pieauth.auth.TokenMaster
import dev.kkorolyov.pieauth.db.Credentials
import dev.kkorolyov.pieauth.db.DbConfig
import dev.kkorolyov.pieauth.util.clientInterceptor
import dev.kkorolyov.pieauth.util.tracer
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineImplBase
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthRequest
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthResponse
import dev.kkorolyov.pieline.proto.common.Common.Uuid
import dev.kkorolyov.pieline.proto.user.UserOuterClass.Details
import dev.kkorolyov.pieline.proto.user.UserOuterClass.User
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import dev.kkorolyov.pieline.trace.span
import dev.kkorolyov.pieline.util.Address
import io.grpc.ManagedChannelBuilder
import io.grpc.Status
import io.grpc.StatusRuntimeException
import io.opentracing.contrib.grpc.OpenTracingContextKey
import io.opentracing.tag.Tags
import kotlinx.coroutines.flow.first
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

private val usersStub: UsersCoroutineStub = Address.forEnv("ADDR_USERS").let { (host, port) ->
	UsersCoroutineStub(
		ManagedChannelBuilder.forAddress(host, port)
			.intercept(clientInterceptor)
			.usePlaintext()
			.build()
	)
}

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

	override suspend fun authenticate(request: AuthRequest): AuthResponse =
		tracer.span("transaction", parent = OpenTracingContextKey.activeSpan()).use {
			it.setTag(Tags.DB_TYPE, "sql")

			transaction {
				addLogger(Slf4jSqlDebugLogger)

				Credentials.select {
					Credentials.key eq request.user
				}.firstOrNull { row -> PassMaster.verify(row[Credentials.pass], request.pass.toCharArray()) }
					?.get(Credentials.id)
			}?.let {
				AuthResponse.newBuilder().apply {
					token = TokenMaster.generate(it, *RoleMaster.get(it))
					id = it.toString()
				}.build().also {
					log.info("authenticated user {{}}", request.user)
				}
			}
		} ?: throw StatusRuntimeException(Status.UNAUTHENTICATED).also {
			log.error("failed to authenticate user {{}}", request.user)
		}

	override suspend fun register(request: AuthRequest): AuthResponse =
		tracer.span("transaction", parent = OpenTracingContextKey.activeSpan()).use {
			it.setTag(Tags.DB_TYPE, "sql")

			// Both credentials and user profile must be created together
			val id = transaction {
				try {
					addLogger(Slf4jSqlDebugLogger)

					val id = Credentials.insert { statement ->
						statement[key] = request.user
						statement[pass] = PassMaster.hash(request.pass.toCharArray())
						statement[id] = UUID.randomUUID()
					}.also {
						log.info("created credentials for user {{}}", request.user)
					}[Credentials.id]

					runBlocking {
						usersStub.upsert(
							flowOf(
								User.newBuilder().apply {
									this.id = Uuid.newBuilder().apply {
										value = id.toString()
									}.build()
									details = Details.newBuilder().apply {
										email = request.user
									}.build()
								}.build()
							)
						).first()
					}.also {
						log.info("created profile for user {{}}", request.user, it.id)
					}
					id
				} catch (e: Exception) {
					rollback()
					log.error("failed to register user {{${request.user}}}", e)
					throw StatusRuntimeException(Status.ALREADY_EXISTS)
				}
			}
			log.info("registered user {{}}", request.user)

			AuthResponse.newBuilder().apply {
				token = TokenMaster.generate(id, *RoleMaster.get(id))
			}.build()
		}
}
