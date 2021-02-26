package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Namespace
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.piegate.util.authRequest
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthResponse
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `auth` module of the GraphQL schema.
 */
@Namespace("auth")
object AuthSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(AuthSchema::class.java)

	/**
	 * Authenticates a {[user], [pass]} combination.
	 */
	@Query("login")
	fun auth(
		@Arg("user") user: String,
		@Arg("pass") pass: String,
		authStub: AuthCoroutineStub
	): ListenableFuture<AuthResponse> {
		return runBlocking {
			future {
				authStub.authenticate(authRequest(user, pass)).also {
					log.info("authenticated user{{}}", user)
				}
			}
		}
	}

	/**
	 * Registers a [user] with [pass].
	 */
	@Mutation("register")
	fun register(
		@Arg("user") user: String,
		@Arg("pass") pass: String,
		authStub: AuthCoroutineStub
	): ListenableFuture<AuthResponse> {
		return runBlocking {
			future {
				authStub.register(authRequest(user, pass)).also {
					log.info("registered user{{}}", user)
				}
			}
		}
	}
}
