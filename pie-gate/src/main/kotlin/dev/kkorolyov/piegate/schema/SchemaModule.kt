package dev.kkorolyov.piegate.schema

import com.google.inject.AbstractModule

/**
 * Bundles all injectable schema modules.
 */
object SchemaModule : AbstractModule() {
	override fun configure() {
		install(AuthSchema)
		install(UsersSchema)
		install(ProjectsSchema)
		install(i18nSchema)
	}
}
