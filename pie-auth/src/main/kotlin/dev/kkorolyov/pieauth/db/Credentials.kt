package dev.kkorolyov.pieauth.db

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import java.util.UUID

/**
 * Auth table.
 */
object Credentials : Table() {
	/** Unique credentials key */
	val key: Column<String> = varchar("key", 256).index(isUnique = true)

	/** Entry password hash */
	val pass: Column<String> = varchar("pass", 512)

	/** Primary key for external references */
	val id: Column<UUID> = uuid("id")

	override val primaryKey: PrimaryKey = PrimaryKey(id)
}
