package dev.kkorolyov.piegate

import com.google.api.graphql.execution.GuavaListenableFutureSupport
import com.google.api.graphql.rejoiner.Schema
import com.google.inject.AbstractModule
import com.google.inject.Provides
import graphql.GraphQL
import graphql.execution.instrumentation.ChainedInstrumentation
import graphql.schema.GraphQLSchema

private val instrumentation = ChainedInstrumentation(
	listOf(
		GuavaListenableFutureSupport.listenableFutureInstrumentation()
	)
)

/**
 * Provides executable GraphQL object.
 */
object GqlModule : AbstractModule() {
	override fun configure() {}

	/**
	 * Returns executable GraphQL object.
	 */
	@Provides
	fun get(@Schema schema: GraphQLSchema): GraphQL = GraphQL
		.newGraphQL(schema)
		.instrumentation(instrumentation)
		.build()
}
