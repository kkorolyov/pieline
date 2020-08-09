package dev.kkorolyov.piegate.util

import dev.kkorolyov.pieline.proto.auth.AuthOuterClass.AuthRequest
import dev.kkorolyov.pieline.proto.common.Common.Uuid

/**
 * Creates a [Uuid] from a given [value].
 */
fun uuid(value: String): Uuid = Uuid.newBuilder().apply {
	this.value = value
}.build()

/**
 * Creates an [AuthRequest] from a {[user], [pass]} combination.
 */
fun authRequest(user: String, pass: String): AuthRequest = AuthRequest.newBuilder().apply {
	this.user = user
	this.pass = pass
}.build()

