package dev.kkorolyov.pieproj

import dev.kkorolyov.pieline.token.TOKEN_INTERCEPTOR
import dev.kkorolyov.pieproj.service.ProjectService
import dev.kkorolyov.pieproj.trace.SERVER_TRACER
import io.grpc.ServerBuilder
import org.slf4j.LoggerFactory

private val PORT = Integer.parseInt(System.getenv("PORT"))

private val LOG = LoggerFactory.getLogger("main").apply {
	Thread.setDefaultUncaughtExceptionHandler { _, e ->
		error("unhandled exception", e)
	}
}

/**
 * Starts pie-proj server.
 */
fun main() {
	val server = ServerBuilder.forPort(PORT)
		.intercept(SERVER_TRACER)
		.intercept(TOKEN_INTERCEPTOR)
		.addService(ProjectService)
		.build()
		.start()

	LOG.info("Started on port{{}}", PORT)

	server.awaitTermination()
}
