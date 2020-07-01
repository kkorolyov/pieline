package dev.kkorolyov.piegate.schema

import com.google.inject.AbstractModule

/**
 * Bundles all injectable schema modules.
 */
object SchemaModule : AbstractModule() {
	override fun configure() {
		install(UsersSchema)
		install(i18nSchema)
	}
}
