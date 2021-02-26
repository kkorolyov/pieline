package dev.kkorolyov.piegate

import com.google.inject.AbstractModule
import io.grpc.Metadata
import io.grpc.Metadata.Key
import io.ktor.application.ApplicationCall
import io.ktor.request.authorization

/**
 * Configures injected metadata.
 */
class MetadataModule(private val call: ApplicationCall) : AbstractModule() {
	override fun configure() {
		bind(Metadata::class.java).toInstance(
			Metadata().apply {
				call.request.authorization()?.let {
					put(Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER), it)
				}
			}
		)
	}
}
