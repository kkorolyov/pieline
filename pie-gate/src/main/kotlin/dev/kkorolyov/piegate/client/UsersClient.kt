package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import io.grpc.ManagedChannelBuilder

private const val HOST = "localhost"
private const val PORT = 50051

/**
 * Guice users client binding.
 */
object UsersClient : AbstractModule() {
	override fun configure() {
		val channel = ManagedChannelBuilder.forAddress(
			HOST,
			PORT
		).usePlaintext().build()
		bind(UsersCoroutineStub::class.java).toInstance(UsersCoroutineStub(channel))
	}
}
