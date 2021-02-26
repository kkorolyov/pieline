package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import com.google.inject.Provides
import dev.kkorolyov.piegate.PROPS
import dev.kkorolyov.piegate.util.CLIENT_TRACER
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.i18n.i18nGrpcKt.i18nCoroutineStub
import dev.kkorolyov.pieline.proto.project.ProjectsGrpcKt.ProjectsCoroutineStub
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
		get("ADDR_AUTH", headers, ::AuthCoroutineStub)

	@Provides
	private fun getUsers(headers: Metadata): UsersCoroutineStub =
		get("ADDR_USERS", headers, ::UsersCoroutineStub)

	@Provides
	private fun getProjects(headers: Metadata): ProjectsCoroutineStub =
		get("ADDR_PROJECTS", headers, ::ProjectsCoroutineStub)

	@Provides
	private fun getI18n(headers: Metadata): i18nCoroutineStub =
		get("ADDR_I18N", headers, ::i18nCoroutineStub)

	private fun <T : AbstractCoroutineStub<T>> get(
		targetEnv: String,
		headers: Metadata,
		initializer: (ManagedChannel, CallOptions) -> T
	): T =
		// TODO Remove usePlaintext
		initializer(
			ManagedChannelBuilder.forTarget(PROPS[targetEnv])
				.intercept(MetadataUtils.newAttachHeadersInterceptor(headers))
				.intercept(CLIENT_TRACER)
				.usePlaintext().build(), CallOptions.DEFAULT
		)
}
