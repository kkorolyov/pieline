package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.pieline.proto.common.Common.Uuid
import dev.kkorolyov.pieline.proto.common.Common.UuidList
import dev.kkorolyov.pieline.proto.user.UserOuterClass.User
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `users` module of the GraphQL schema.
 */
object UsersSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(UsersSchema::class.java)

	/**
	 * Gets user for [id], if any.
	 */
	@Query("user")
	fun user(@Arg("id") id: Uuid, usersStub: UsersCoroutineStub): ListenableFuture<User?> {
		return runBlocking {
			future {
				usersStub.get(flowOf(id)).firstOrNull().also {
					log.info("get user for id{{}} = {}", id, it)
				}
			}
		}
	}

	/**
	 * Gets all users optionally constrained by [ids].
	 */
	@Query("users")
	fun users(@Arg("ids") ids: UuidList, usersStub: UsersCoroutineStub): ListenableFuture<List<User>> {
		return runBlocking {
			future {
				usersStub.get(ids.idsList.asFlow()).toList().also {
					log.info("get users for ids{{}} = {}", ids, it)
				}
			}
		}
	}

	/**
	 * Upserts [user].
	 */
	@Mutation("setUser")
	fun setUser(@Arg("user") user: User, usersStub: UsersCoroutineStub): ListenableFuture<User?> {
		return runBlocking {
			future {
				usersStub.upsert(flowOf(user)).firstOrNull().also {
					log.info("set user{{}} = {}", user, it)
				}
			}
		}
	}
}
