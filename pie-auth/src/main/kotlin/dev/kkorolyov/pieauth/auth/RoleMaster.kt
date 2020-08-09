package dev.kkorolyov.pieauth.auth

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
	fun get(id: UUID): Array<String> = STUB_ROLES
}
