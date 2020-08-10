package dev.kkorolyov.pieauth

import io.grpc.Context
import io.grpc.Metadata

private val tokenKey by lazy { Context.key<String>("token") }

/**
 * Returns a new context with access [token].
 */
fun Context.withToken(token: String?): Context = token?.let {
	withValue(tokenKey, it)
} ?: this

/**
 * Returns this context's access token.
 */
fun Context.getToken(): String? = tokenKey.get(this)

/**
 * Returns `Authorization` header's access token.
 */
fun Metadata.getToken(): String? =
	get(Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER))?.removePrefix("Bearer ")
