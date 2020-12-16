package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import com.google.inject.Provides
import dev.kkorolyov.piegate.util.clientInterceptor
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.i18n.i18nGrpcKt.i18nCoroutineStub
import dev.kkorolyov.pieline.proto.project.ProjectsGrpcKt.ProjectsCoroutineStub
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import dev.kkorolyov.pieline.util.Address
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
		get(Address.forEnv("ADDR_AUTH"), headers, ::AuthCoroutineStub)

	@Provides
	private fun getUsers(headers: Metadata): UsersCoroutineStub =
		get(Address.forEnv("ADDR_USERS"), headers, ::UsersCoroutineStub)

	@Provides
	private fun getProjects(headers: Metadata): ProjectsCoroutineStub =
		get(Address.forEnv("ADDR_PROJECTS"), headers, ::ProjectsCoroutineStub)

	@Provides
	private fun getI18n(headers: Metadata): i18nCoroutineStub =
		get(Address.forEnv("ADDR_I18N"), headers, ::i18nCoroutineStub)

	private fun <T : AbstractCoroutineStub<T>> get(
		address: Address,
		headers: Metadata,
		initializer: (ManagedChannel, CallOptions) -> T
	): T = address.let { (host, port) ->
		// TODO Remove usePlaintext
		initializer(
			ManagedChannelBuilder.forAddress(host, port)
				.intercept(MetadataUtils.newAttachHeadersInterceptor(headers))
				.intercept(clientInterceptor)
				.usePlaintext().build(), CallOptions.DEFAULT
		)
	}
}
