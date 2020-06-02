package dev.kkorolyov.piegate

import com.google.api.graphql.execution.GuavaListenableFutureSupport
import com.google.api.graphql.rejoiner.Schema
import com.google.api.graphql.rejoiner.SchemaProviderModule
import com.google.inject.Guice
import com.google.inject.Key
import dev.kkorolyov.piegate.client.ClientModule
import dev.kkorolyov.piegate.schema.SchemaModule
import graphql.ExecutionInput
import graphql.GraphQL
import graphql.execution.instrumentation.ChainedInstrumentation
import graphql.execution.instrumentation.tracing.TracingInstrumentation
import graphql.schema.GraphQLSchema
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.jackson
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing

private val schema: GraphQLSchema = Guice.createInjector(
	SchemaProviderModule(),
	ClientModule,
	SchemaModule
).getInstance(Key.get(GraphQLSchema::class.java, Schema::class.java))
private val instrumentation = ChainedInstrumentation(
	listOf(
		GuavaListenableFutureSupport.listenableFutureInstrumentation(),
		TracingInstrumentation()
	)
)

/**
 * `pie-gate` GraphQL executor.
 */
val gql: GraphQL = GraphQL.newGraphQL(schema).instrumentation(
	instrumentation
).build()

/**
 * PieGate application configuration.
 */
fun Application.main() {
	install(CallLogging)
	install(ContentNegotiation) {
		jackson {}
	}

	routing {
		post("/") {
			val json = call.receive<Map<String, Any>>()
			val query = json["query"]

			if (query == null || query !is String) {
				call.respond(HttpStatusCode.BadRequest, emptyMap<String, Any>())
			}

			val operationName = json["operationName"] as String?

			val executionInput = ExecutionInput
				.newExecutionInput()
				.query(query as String?)
				.operationName(operationName)
				.build()

			val executionResult = gql.execute(executionInput)

			call.respond(executionResult.toSpecification())
		}

		get("/health") {
			call.respond("I'm alive")
		}
	}
}
