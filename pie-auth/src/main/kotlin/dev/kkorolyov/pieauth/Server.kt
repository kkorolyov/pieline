package dev.kkorolyov.pieauth

import dev.kkorolyov.pieauth.service.AuthService
import io.grpc.Context
import io.grpc.Contexts
import io.grpc.Metadata
import io.grpc.ServerBuilder
import io.grpc.ServerCall
import io.grpc.ServerCall.Listener
import io.grpc.ServerCallHandler
import io.grpc.ServerInterceptor
import org.slf4j.LoggerFactory

private val PORT = Integer.parseInt(System.getenv("PORT"))

/**
 * Starts pie-auth server.
 */
fun main() {
	val log = LoggerFactory.getLogger("main")

	Thread.setDefaultUncaughtExceptionHandler { _, e ->
		log.error("unhandled exception", e)
	}

	val server = ServerBuilder.forPort(PORT)
		.addService(AuthService)
		.intercept(object : ServerInterceptor {
			override fun <ReqT : Any?, RespT : Any?> interceptCall(
				call: ServerCall<ReqT, RespT>,
				headers: Metadata,
				next: ServerCallHandler<ReqT, RespT>
			): Listener<ReqT> {
				log.info("INTERCEPTING")
				return Contexts.interceptCall(
					Context.current().withToken(headers.token),
					call,
					headers,
					next
				)
			}
		})
		.build()
		.start()

	log.info("Started on port{{}}", PORT)

	server.awaitTermination()
}
