package dev.kkorolyov.pieauth.util

import dev.kkorolyov.pieline.trace.makeClientInterceptor
import dev.kkorolyov.pieline.trace.makeServerInterceptor
import dev.kkorolyov.pieline.trace.makeTracer
import io.grpc.ClientInterceptor
import io.grpc.ServerInterceptor
import io.opentracing.Tracer

/**
 * Application tracer.
 */
val tracer: Tracer by lazy {
	makeTracer("pie-auth")
}

/**
 * Application gRPC client interceptor.
 */
val clientInterceptor: ClientInterceptor by lazy {
	makeClientInterceptor(tracer)
}

/**
 * Application gRPC server interceptor.
 */
val serverInterceptor: ServerInterceptor by lazy {
	makeServerInterceptor(tracer)
}
