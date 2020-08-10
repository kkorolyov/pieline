package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import com.google.inject.Provides
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.i18n.i18nGrpcKt.i18nCoroutineStub
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import io.grpc.CallOptions
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import io.grpc.Metadata
import io.grpc.kotlin.AbstractCoroutineStub
import io.grpc.stub.MetadataUtils

/**
 * Bundles all injectable client modules.
 */
object ClientModule : AbstractModule() {
	override fun configure() {}

	@Provides
	private fun getAuth(headers: Metadata): AuthCoroutineStub =
		get("localhost", 50053, headers, ::AuthCoroutineStub)

	@Provides
	private fun getUsers(headers: Metadata): UsersCoroutineStub =
		get("localhost", 50051, headers, ::UsersCoroutineStub)

	@Provides
	private fun getI18n(headers: Metadata): i18nCoroutineStub =
		get("localhost", 50051, headers, ::i18nCoroutineStub)

	// TODO Remove usePlaintext
	private fun <T : AbstractCoroutineStub<T>> get(
		host: String,
		port: Int,
		headers: Metadata,
		initializer: (ManagedChannel, CallOptions) -> T
	): T = initializer(
		ManagedChannelBuilder.forAddress(host, port).intercept(
			MetadataUtils.newAttachHeadersInterceptor(headers)
		).usePlaintext().build(), CallOptions.DEFAULT
	)
}
