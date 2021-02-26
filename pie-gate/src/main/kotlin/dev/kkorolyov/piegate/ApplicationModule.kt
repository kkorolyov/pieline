package dev.kkorolyov.piegate

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.google.inject.AbstractModule
import com.google.inject.Inject
import com.google.inject.Key
import graphql.ExecutionInput
import graphql.GraphQL
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.Authentication
import io.ktor.auth.jwt.JWTPrincipal
import io.ktor.auth.jwt.jwt
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.jackson
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing

/**
 * Binds server configurations.
 */
class ApplicationModule(private val application: Application) : AbstractModule() {
	override fun configure() {
		bind(Application::class.java).toInstance(application)
		bind(Install::class.java).asEagerSingleton()
		bind(Routes::class.java).asEagerSingleton()
	}
}

/**
 * Configures installed server modules.
 */
class Install @Inject constructor(application: Application) {
	init {
		application.apply {
			install(CallLogging)
			install(ContentNegotiation) {
				jackson {}
			}
			install(CORS) {
				allowNonSimpleContentTypes = true
				header("Authorization")
				anyHost()
			}
			install(Authentication) {
				jwt {
					realm = PROPS["JWT_REALM"]

					val issuer = PROPS["JWT_ISSUER"]
					val secret = PROPS["JWT_SECRET"]

					verifier(
						JWT.require(Algorithm.HMAC256(secret))
							.withIssuer(issuer)
							.build()
					)
					validate { credential -> JWTPrincipal(credential.payload) }
				}
			}
		}
	}
}

/**
 * Configures server routes.
 */
class Routes @Inject constructor(application: Application) {
	init {
		application.apply {
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

					call.respond(
						call.getInstance(Key.get(GraphQL::class.java))
							.execute(executionInput)
							.toSpecification()
					)
				}

				get("/health") {
					call.respond("I'm alive")
				}
			}
		}
	}
}
