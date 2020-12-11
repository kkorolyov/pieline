package dev.kkorolyov.pieauth.auth

import dev.kkorolyov.pieauth.trace.TRACER
import dev.kkorolyov.pieline.trace.span
import java.util.UUID

// TODO Defer to a role service
private val STUB_ROLES = arrayOf("basic")

/**
 * Retrieves user roles.
 */
object RoleMaster {
	/**
	 * Gets all roles of a given user [id].
	 */
	fun get(id: UUID): Array<String> = TRACER.span("roles-get").use {
		it.setTag("id", id.toString())

		STUB_ROLES
	}
}
