package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import io.grpc.CallOptions
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import io.grpc.kotlin.AbstractCoroutineStub

/**
 * Guice configurable client binding.
 */
class Client<T : AbstractCoroutineStub<T>>(
	val c: Class<T>,
	val initializer: (ManagedChannel, CallOptions) -> T,
	val host: String,
	val port: Int
) :
	AbstractModule() {
	override fun configure() {
		// TODO Remove usePlaintext
		val channel = ManagedChannelBuilder.forAddress(host, port).usePlaintext().build()
		bind(c).toInstance(initializer(channel, CallOptions.DEFAULT))
	}
}
