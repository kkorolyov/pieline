package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthRequest
import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthResponse
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `auth` module of the GraphQL schema.
 */
object AuthSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(AuthSchema::class.java)

	/**
	 * Authenticates a user for [request].
	 */
	@Query("authenticate")
	fun auth(@Arg("request") request: AuthRequest, authStub: AuthCoroutineStub): ListenableFuture<AuthResponse> {
		return runBlocking {
			future {
				authStub.authenticate(request).also {
					log.info("authenticated user{{}}", request.user)
				}
			}
		}
	}

	/**
	 * Registers a user for [request]].
	 */
	@Mutation("register")
	fun register(@Arg("request") request: AuthRequest, authStub: AuthCoroutineStub): ListenableFuture<AuthResponse> {
		return runBlocking {
			future {
				authStub.register(request).also {
					log.info("registered user{{}}", request.user)
				}
			}
		}
	}
}
