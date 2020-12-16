package dev.kkorolyov.pieproj.db

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import java.util.UUID

/**
 * Projects table.
 */
object Projects : Table() {
	/** Project ID */
	val id: Column<UUID> = uuid("id").uniqueIndex()
	override val primaryKey: PrimaryKey = PrimaryKey(id)

	/** Project title */
	val title: Column<String> = varchar("title", 64)

	/** Project description */
	val description: Column<String> = text("description");
}
