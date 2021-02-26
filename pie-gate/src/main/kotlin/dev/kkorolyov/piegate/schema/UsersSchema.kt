package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Namespace
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.piegate.util.uuid
import dev.kkorolyov.pieline.proto.common.Common.UuidList
import dev.kkorolyov.pieline.proto.user.UserOuterClass.User
import dev.kkorolyov.pieline.proto.user.UsersGrpcKt.UsersCoroutineStub
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `users` module of the GraphQL schema.
 */
@Namespace("users")
object UsersSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(UsersSchema::class.java)

	/**
	 * Gets user for [id], if any.
	 */
	@Query("get")
	fun get(@Arg("id") id: String, usersStub: UsersCoroutineStub): ListenableFuture<User?> = runBlocking {
		future {
			usersStub.get(flowOf(uuid(id))).firstOrNull().also {
				log.info("get user for id{{}} = {}", id, it)
			}
		}
	}

	/**
	 * Upserts [user].
	 */
	@Mutation("set")
	fun set(@Arg("user") user: User, usersStub: UsersCoroutineStub): ListenableFuture<User> = runBlocking {
		future {
			usersStub.upsert(flowOf(user)).first().also {
				log.info("set user{{}} = {}", user, it)
			}
		}
	}

	/**
	 * Deletes all users matching [ids] and returns their former representations.
	 */
	@Mutation("delete")
	fun delete(@Arg("ids") ids: UuidList, usersStub: UsersCoroutineStub): ListenableFuture<List<User>> = runBlocking {
		future {
			usersStub.delete(ids.idsList.asFlow()).toList().also {
				log.info("delete users for ids{{}} = {}", ids, it)
			}
		}
	}
}
