package dev.kkorolyov.piegate.client

import com.google.inject.AbstractModule

/**
 * Bundles all injectable client modules.
 */
object ClientModule : AbstractModule() {
	override fun configure() {
		install(UsersClient)
	}
}
