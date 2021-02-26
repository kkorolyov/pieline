package dev.kkorolyov.piegate

import com.google.api.graphql.rejoiner.SchemaProviderModule
import com.google.inject.AbstractModule
import com.google.inject.Guice
import com.google.inject.Injector
import com.google.inject.Key
import dev.kkorolyov.piegate.client.ClientModule
import dev.kkorolyov.piegate.schema.SchemaModule
import dev.kkorolyov.piegate.util.TRACER
import dev.kkorolyov.pieline.props.Props
import dev.kkorolyov.pieline.trace.span
import io.grpc.Metadata
import io.ktor.application.ApplicationCall
import io.ktor.application.ApplicationCallPipeline
import io.ktor.application.call
import io.ktor.request.authorization
import io.ktor.request.httpMethod
import io.ktor.request.uri
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.util.AttributeKey
import io.opentracing.tag.Tags
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

/**
 * Global server properties.
 */
val PROPS: Props = Class.forName("dev.kkorolyov.piegate.PieGateKt").getResourceAsStream("/server.properties").use {
	Props(it)
}

/**
 * Starts pie-gate server.
 */
fun main() {
	embeddedServer(Netty, port = PROPS["PORT"].toInt()) {
		val injector = Guice.createInjector(
			ApplicationModule(this)
		)

		intercept(ApplicationCallPipeline.Features) {
			call.injector = injector.createChildInjector(
				// Capture and inject headers
				MetadataModule(call),
				ClientModule,
				SchemaModule,
				GqlModule,
				SchemaProviderModule()
			)
		}
		intercept(ApplicationCallPipeline.Monitoring) {
			launch {
				TRACER.span("ktor-${call.request.uri}").use {
					it.setTag(Tags.HTTP_URL, call.request.uri)
					it.setTag(Tags.HTTP_METHOD, call.request.httpMethod.value)

					runBlocking { proceed() }

					it.setTag(Tags.HTTP_STATUS, call.response.status()?.value)
				}
			}
		}
	}.start(true)
}

/**
 * Returns the call-scoped instance bound to [key].
 */
fun <T> ApplicationCall.getInstance(key: Key<T>): T = injector.getInstance(key)

private val injectorKey = AttributeKey<Injector>("injector")
private var ApplicationCall.injector: Injector
	get() = attributes[injectorKey]
	set(injector) {
		attributes.put(injectorKey, injector)
	}

/**
 * Configures injected metadata.
 */
class MetadataModule(private val call: ApplicationCall) : AbstractModule() {
	override fun configure() {
		bind(Metadata::class.java).toInstance(
			Metadata().apply {
				call.request.authorization()?.let {
					put(Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER), it)
				}
			}
		)
	}
}
