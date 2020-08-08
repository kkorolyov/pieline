package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule
import dev.kkorolyov.pieline.proto.auth.AuthGrpcKt.AuthCoroutineStub
import dev.kkorolyov.pieline.proto.i18n.i18nGrpcKt.i18nCoroutineStub
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub

/**
 * Bundles all injectable client modules.
 */
object ClientModule : AbstractModule() {
	override fun configure() {
		install(
			Client(
				AuthCoroutineStub::class.java,
				::AuthCoroutineStub,
				"localhost",
				50053
			)
		)
		install(
			Client(
				UsersCoroutineStub::class.java,
				::UsersCoroutineStub,
				"localhost",
				50051
			)
		)
		install(
			Client(
				i18nCoroutineStub::class.java,
				::i18nCoroutineStub,
				"localhost",
				50052
			)
		)
	}
}
