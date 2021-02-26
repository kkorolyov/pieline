package dev.kkorolyov.pieauth.db

import dev.kkorolyov.pieauth.PROPS
import org.h2.jdbcx.JdbcDataSource
import org.jetbrains.exposed.sql.Database
import org.slf4j.LoggerFactory
import javax.sql.DataSource

private val URL = PROPS["DB_URL"]
private val LOG = LoggerFactory.getLogger("db")

/** Global database handle */
val DB: Database by lazy {
	val ds: DataSource = JdbcDataSource().apply {
		setUrl(URL)
	}

	LOG.info("connecting to DB at {{}}", URL)
	Database.connect(ds).also {
		LOG.info("connected to DB at {{}}", URL)
	}
}
