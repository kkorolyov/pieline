package dev.kkorolyov.pieauth.db

import org.h2.jdbcx.JdbcDataSource
import org.jetbrains.exposed.sql.Database
import org.slf4j.LoggerFactory
import javax.sql.DataSource

private val URL = System.getenv("DB_URL")

/**
 * Global database configuration.
 */
object DbConfig {
	private val log = LoggerFactory.getLogger(DbConfig::class.java)

	/** Global database handle */
	val db: Database by lazy {
		log.info("connecting to DB at {{}}", URL)
		Database.connect(ds).also {
			log.info("connected to DB at {{}}", URL)
		}
	}
	private val ds: DataSource = JdbcDataSource().apply {
		setUrl(URL)
	}
}
