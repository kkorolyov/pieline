package dev.kkorolyov.pieauth.cred

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.time.Instant
import java.util.Date
import java.util.UUID

/**
 * Generates access tokens
 */
object TokenMaster {
	private val algorithm: Algorithm = Algorithm.HMAC256("pie-auth-secret")

	/**
	 * Generates an access token for a given user [id] and set of [roles].
	 */
	fun generate(id: UUID, vararg roles: String): String = JWT.create()
		.withIssuer("pie-auth")
		.withIssuedAt(Date.from(Instant.now()))
		.withClaim("id", id.toString())
		.withArrayClaim("role", roles)
		.sign(algorithm)
}
