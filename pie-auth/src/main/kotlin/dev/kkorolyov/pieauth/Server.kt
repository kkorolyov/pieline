package dev.kkorolyov.pieauth

import dev.kkorolyov.pieauth.service.AuthService
import dev.kkorolyov.pieauth.trace.SERVER_TRACER
import dev.kkorolyov.pieline.props.Props
import dev.kkorolyov.pieline.token.TOKEN_INTERCEPTOR
import io.grpc.ServerBuilder
import org.slf4j.LoggerFactory

/**
 * Global server properties.
 */
val PROPS: Props = Class.forName("dev.kkorolyov.pieauth.ServerKt").getResourceAsStream("/server.properties").use {
	Props(it)
}

private val LOG = LoggerFactory.getLogger("main").apply {
	Thread.setDefaultUncaughtExceptionHandler { _, e ->
		error("unhandled exception", e)
	}
}

/**
 * Starts pie-auth server.
 */
fun main() {
	val port = PROPS["PORT"].toInt()

	val server = ServerBuilder.forPort(port)
		.addService(AuthService)
		.intercept(SERVER_TRACER)
		.intercept(TOKEN_INTERCEPTOR)
		.build()
		.start()

	LOG.info("Started on port{{}}", port)

	server.awaitTermination()
}
