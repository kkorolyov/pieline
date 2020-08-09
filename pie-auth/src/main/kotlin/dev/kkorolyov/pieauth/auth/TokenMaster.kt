package dev.kkorolyov.pieauth.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.time.Duration
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
	fun generate(id: UUID, vararg roles: String): String {
		val now = Instant.now()

		return JWT.create()
			.withIssuer("pie-auth")

			.withIssuedAt(Date.from(now))
			.withNotBefore(Date.from(now.plusSeconds(1)))
			.withExpiresAt(Date.from(now.plus(Duration.ofMinutes(15))))

			.withClaim("id", id.toString())
			.withArrayClaim("role", roles)

			.sign(algorithm)
	}
}
