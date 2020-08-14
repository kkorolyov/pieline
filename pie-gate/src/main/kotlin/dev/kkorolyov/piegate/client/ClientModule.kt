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

private val PORT_AUTH = Integer.parseInt(System.getenv("PORT_AUTH"))
private val PORT_USERS = Integer.parseInt(System.getenv("PORT_USERS"))
private val PORT_I18N = Integer.parseInt(System.getenv("PORT_I18N"))

/**
 * Bundles all injectable client modules.
 */
object ClientModule : AbstractModule() {
	override fun configure() {}

	@Provides
	private fun getAuth(headers: Metadata): AuthCoroutineStub =
		get("localhost", PORT_AUTH, headers, ::AuthCoroutineStub)

	@Provides
	private fun getUsers(headers: Metadata): UsersCoroutineStub =
		get("localhost", PORT_USERS, headers, ::UsersCoroutineStub)

	@Provides
	private fun getI18n(headers: Metadata): i18nCoroutineStub =
		get("localhost", PORT_I18N, headers, ::i18nCoroutineStub)

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
