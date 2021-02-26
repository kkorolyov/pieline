package dev.kkorolyov.piegate.schema

import com.auth0.jwt.JWT
import com.google.api.graphql.rejoiner.Namespace
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.pieline.proto.debug.Debug.Jwt
import io.grpc.Metadata
import io.grpc.Metadata.Key
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking

/**
 * `debug` module of the GraphQL schema.
 */
@Namespace("debug")
object DebugSchema : SchemaModule() {
	/**
	 * Returns JWT claims of a given token.
	 */
	@Query("jwt")
	fun jwt(metadata: Metadata): ListenableFuture<Jwt?> = runBlocking {
		future {
			metadata.get(Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER))?.let {
				Jwt.newBuilder().apply {
					putAllClaims(JWT.decode(it.removePrefix("Bearer ")).claims
						.mapValues { it.value.asString() }
						.filterValues { it != null }
					)
				}.build()
			}
		}
	}
}
