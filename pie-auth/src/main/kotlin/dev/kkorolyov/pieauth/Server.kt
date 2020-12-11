package dev.kkorolyov.pieauth

import dev.kkorolyov.pieauth.service.AuthService
import dev.kkorolyov.pieauth.trace.SERVER_TRACER
import dev.kkorolyov.pieline.token.TOKEN_INTERCEPTOR
import io.grpc.ServerBuilder
import org.slf4j.LoggerFactory

private val PORT = Integer.parseInt(System.getenv("PORT"))

private val LOG = LoggerFactory.getLogger("main").apply {
	Thread.setDefaultUncaughtExceptionHandler { _, e ->
		error("unhandled exception", e)
	}
}

/**
 * Starts pie-auth server.
 */
fun main() {
	val server = ServerBuilder.forPort(PORT)
		.addService(AuthService)
		.intercept(SERVER_TRACER)
		.intercept(TOKEN_INTERCEPTOR)
		.build()
		.start()

	LOG.info("Started on port{{}}", PORT)

	server.awaitTermination()
}
