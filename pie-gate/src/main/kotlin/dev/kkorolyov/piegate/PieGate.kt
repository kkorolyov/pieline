package dev.kkorolyov.piegate

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
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
import graphql.schema.GraphQLSchema
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.Authentication
import io.ktor.auth.authenticate
import io.ktor.auth.authentication
import io.ktor.auth.jwt.JWTPrincipal
import io.ktor.auth.jwt.jwt
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.jackson
import io.ktor.request.authorization
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
		GuavaListenableFutureSupport.listenableFutureInstrumentation()
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
	install(CORS) {
		allowNonSimpleContentTypes = true
		anyHost()
	}
	install(Authentication) {
		jwt {
			realm = environment.config.property("jwt.realm").getString()

			val issuer = environment.config.property("jwt.issuer").getString()
			val secret = environment.config.property("jwt.secret").getString()

			verifier(
				JWT.require(Algorithm.HMAC256(secret))
					.withIssuer(issuer)
					.build()
			)
			validate { credential -> JWTPrincipal(credential.payload) }
		}
	}

	routing {
		post("/") {
			val json = call.receive<Map<String, Any>>()
			val query = json["query"]
			if (query == null || query !is String) {
				call.respond(HttpStatusCode.BadRequest, "bad request")
			}
			val operationName = json["operationName"] as String?
			val variables = json["variables"].let {
				when (it) {
					is Map<*, *> -> hashMapOf(*it.map { it.key as String to it.value as Any }.toTypedArray())
					else -> hashMapOf()
				}
			}

			val executionInput = ExecutionInput
				.newExecutionInput()
				.query(query as String?)
				.operationName(operationName)
				.variables(variables)
				.build()

			val executionResult = gql.execute(executionInput)

			call.respond(executionResult.toSpecification())
		}

		get("/health") {
			call.respond("I'm alive")
		}

		authenticate {
			get("/jwt") {
				val claims = call.authentication.principal<JWTPrincipal>()?.payload?.claims?.mapValues { e ->
					e.value.asString() ?: e.value.asArray(String::class.java)?.run { contentToString() } ?: e.value.asDate()
				}
				call.respond(
					claims?.asSequence()
						?.joinToString(
							System.lineSeparator(),
							"Your JWT claims are:${System.lineSeparator()}"
						) { e -> "${e.key}=${e.value}" }
						?: "no claims to show"
				)
			}
		}
	}
}
