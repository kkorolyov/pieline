package dev.kkorolyov.pieauth.auth

import de.mkammerer.argon2.Argon2
import de.mkammerer.argon2.Argon2Factory
import de.mkammerer.argon2.Argon2Factory.Argon2Types.ARGON2id
import dev.kkorolyov.pieauth.trace.TRACER
import dev.kkorolyov.pieline.trace.span

private const val ITERATIONS = 10
private const val MEMORY = 65536
private const val PARALLELISM = 1

/**
 * Hashes and verifies passwords.
 */
object PassMaster {
	private val argon2: Argon2 = Argon2Factory.create(ARGON2id, 128, 128)

	/**
	 * Hashes [pass], wipes it, and returns the hashed value.
	 */
	fun hash(pass: CharArray): String {
		return TRACER.span("pass-hash").use {
			try {
				argon2.hash(
					ITERATIONS,
					MEMORY,
					PARALLELISM,
					pass
				)
			} finally {
				argon2.wipeArray(pass)
			}
		}
	}

	/**
	 * Verifies [pass] against [hash], wipes [pass], and returns whether [pass] matches [hash].
	 */
	fun verify(hash: String, pass: CharArray): Boolean {
		return TRACER.span("pass-verify").use {
			try {
				argon2.verify(hash, pass)
			} finally {
				argon2.wipeArray(pass)
			}
		}
	}
}
