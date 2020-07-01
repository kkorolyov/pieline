package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.pieline.proto.i18n.Internationalization.Locale
import dev.kkorolyov.pieline.proto.i18n.Internationalization.PackRequest
import dev.kkorolyov.pieline.proto.i18n.Internationalization.i18nPack
import dev.kkorolyov.pieline.proto.i18n.i18nGrpcKt.i18nCoroutineStub
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `i18n` module of the GraphQL schema.
 */
object i18nSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(i18nSchema::class.java)

	@Query("i18n")
	fun i18n(@Arg("locale") locale: Locale, i18nStub: i18nCoroutineStub): ListenableFuture<i18nPack> {
		return runBlocking {
			future {
				i18nStub.get(PackRequest.newBuilder().setValue(locale).build()).also {
					log.info("get i18n for locale{{}} = {}", locale, it)
				}
			}
		}
	}
}
