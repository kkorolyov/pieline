package dev.kkorolyov.piegate.util

import io.grpc.ClientInterceptor
import io.grpc.ServerInterceptor
import io.jaegertracing.Configuration
import io.opentracing.Tracer
import io.opentracing.contrib.grpc.TracingClientInterceptor
import io.opentracing.contrib.grpc.TracingServerInterceptor
import io.opentracing.util.GlobalTracer

/**
 * Application tracer.
 */
val TRACER: Tracer = Configuration.fromEnv("pie-gate").tracer.also {
	GlobalTracer.registerIfAbsent(it)
}

/**
 * Application gRPC client interceptor.
 */
val CLIENT_TRACER: ClientInterceptor = TracingClientInterceptor.newBuilder()
	.withTracer(TRACER)
	.withStreaming()
	.withVerbosity()
	.build()

/**
 * Application gRPC server interceptor.
 */
val SERVER_TRACER: ServerInterceptor = TracingServerInterceptor.newBuilder()
	.withTracer(TRACER)
	.withStreaming()
	.withVerbosity()
	.build()
