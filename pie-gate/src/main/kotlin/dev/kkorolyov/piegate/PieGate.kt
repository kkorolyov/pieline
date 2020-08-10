package dev.kkorolyov.piegate

import com.google.api.graphql.rejoiner.SchemaProviderModule
import com.google.inject.AbstractModule
import com.google.inject.Guice
import com.google.inject.Injector
import com.google.inject.Key
import dev.kkorolyov.piegate.client.ClientModule
import dev.kkorolyov.piegate.schema.SchemaModule
import io.grpc.Metadata
import io.ktor.application.Application
import io.ktor.application.ApplicationCall
import io.ktor.application.ApplicationCallPipeline
import io.ktor.application.call
import io.ktor.request.authorization
import io.ktor.util.AttributeKey

/**
 * PieGate application configuration.
 */
fun Application.main() {
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
}

/**
 * Returns the call-scoped instance bound to [key].
 */
fun <T> ApplicationCall.getInstance(key: Key<T>): T = injector.getInstance(key)

private val injectorKey = AttributeKey<Injector>("injector")
private var ApplicationCall.injector: Injector
	get() = attributes[injectorKey]
	set(injector: Injector) {
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
