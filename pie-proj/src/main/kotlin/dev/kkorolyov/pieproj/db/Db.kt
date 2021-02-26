package dev.kkorolyov.pieproj.db

import dev.kkorolyov.pieproj.PROPS
import org.h2.jdbcx.JdbcDataSource
import org.jetbrains.exposed.sql.Database
import org.slf4j.LoggerFactory
import javax.sql.DataSource

private val URL = PROPS["DB_URL"]
private val LOG = LoggerFactory.getLogger("db")

/** Global database handle */
val DB: Database by lazy {
	LOG.info("connecting to DB at {{}}", URL)
	Database.connect(ds).also {
		LOG.info("connected to DB at {{}}", URL)
	}
}
private val ds: DataSource = JdbcDataSource().apply {
	setUrl(URL)
}
