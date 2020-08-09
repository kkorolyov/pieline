package dev.kkorolyov.pieauth

import dev.kkorolyov.pieauth.service.AuthService
import io.grpc.ServerBuilder
import org.slf4j.LoggerFactory

private const val PORT = 50053

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
		.build()
		.start()

	log.info("Started on port{{}}", PORT)

	server.awaitTermination()
}
