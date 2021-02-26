package dev.kkorolyov.pieproj

import dev.kkorolyov.pieline.intercept.ExceptionInterceptor
import dev.kkorolyov.pieline.props.Props
import dev.kkorolyov.pieline.token.TOKEN_INTERCEPTOR
import dev.kkorolyov.pieproj.service.ProjectService
import dev.kkorolyov.pieproj.trace.SERVER_TRACER
import io.grpc.ServerBuilder
import org.slf4j.LoggerFactory

/**
 * Global server properties.
 */
val PROPS: Props = Class.forName("dev.kkorolyov.pieproj.ServerKt").getResourceAsStream("/server.properties").use {
	Props(it)
}

private val LOG = LoggerFactory.getLogger("main")

/**
 * Starts pie-proj server.
 */
fun main() {
	val port = PROPS["PORT"].toInt()

	val server = ServerBuilder.forPort(port)
		.intercept(SERVER_TRACER)
		.intercept(TOKEN_INTERCEPTOR)
		.intercept(ExceptionInterceptor { e -> LOG.error("unhandled exception", e) })
		.addService(ProjectService)
		.build()
		.start()

	LOG.info("Started on port{{}}", port)

	server.awaitTermination()
}
