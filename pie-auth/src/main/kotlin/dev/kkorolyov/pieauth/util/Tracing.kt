package dev.kkorolyov.pieauth.util

import io.jaegertracing.Configuration
import io.jaegertracing.Configuration.ReporterConfiguration
import io.jaegertracing.Configuration.SamplerConfiguration
import io.opentracing.Scope
import io.opentracing.Span
import io.opentracing.Tracer
import io.opentracing.contrib.grpc.OpenTracingContextKey
import io.opentracing.tag.Tags
import io.opentracing.util.GlobalTracer
import java.io.PrintWriter
import java.io.StringWriter
import java.lang.Exception

/**
 * Application tracer
 */
val tracer: Tracer by lazy {
	Configuration("pie-auth")
		.withSampler(
			SamplerConfiguration.fromEnv()
				.withType("const")
				.withParam(1)
		)
		.withReporter(
			ReporterConfiguration.fromEnv()
				.withLogSpans(true)
		)
		.tracer.also { GlobalTracer.registerIfAbsent(it) }
}

/**
 * A convenience [Span] wrapper for tracing the execution of a block.
 */
class UsableSpan(private val span: Span, private val scope: Scope) : Span by span, AutoCloseable {
	/**
	 * Traces the execution of a [block] and returns its result.
	 * Closes this span and its scope afterward.
	 * If any exceptions occur within [block], this span tags as `error`, logs the exception stack trace, and re-throws the exception.
	 */
	fun <R> use(block: (UsableSpan) -> R): R =
		try {
			block(this)
		} catch (e: Exception) {
			error(e)
			throw e
		} finally {
			close()
		}

	/**
	 * Tags `this` span as [Tags.ERROR] and logs [e].
	 */
	private fun error(e: Exception) {
		val stringWriter = StringWriter()
		e.printStackTrace(PrintWriter(stringWriter))

		setTag(Tags.ERROR, true)
		log(mapOf("error.object" to stringWriter.toString()))
	}

	override fun close() {
		finish()
		scope.close()
	}
}

/**
 * Starts a new active span with a given [operationName] and [kind].
 */
fun Tracer.span(operationName: String, kind: String = Tags.SPAN_KIND_SERVER): UsableSpan = buildSpan(operationName)
	.withTag(Tags.SPAN_KIND, kind)
	.asChildOf(OpenTracingContextKey.activeSpan())
	.start()
	.let {
		UsableSpan(it, activateSpan(it))
	}
