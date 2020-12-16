package dev.kkorolyov.piegate.schema

import com.google.api.graphql.rejoiner.Arg
import com.google.api.graphql.rejoiner.Mutation
import com.google.api.graphql.rejoiner.Query
import com.google.api.graphql.rejoiner.SchemaModule
import com.google.common.util.concurrent.ListenableFuture
import dev.kkorolyov.piegate.util.uuid
import dev.kkorolyov.pieline.proto.common.Common.UuidList
import dev.kkorolyov.pieline.proto.project.ProjectOuterClass.Project
import dev.kkorolyov.pieline.proto.project.ProjectsGrpcKt.ProjectsCoroutineStub
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.guava.future
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

/**
 * `projects` module of the GraphQL schema.
 */
object ProjectsSchema : SchemaModule() {
	private val log = LoggerFactory.getLogger(ProjectsSchema::class.java)

	/**
	 * Gets project for [id], if any.
	 */
	@Query("project")
	fun project(@Arg("id") id: String, projectsStub: ProjectsCoroutineStub): ListenableFuture<Project?> = runBlocking {
		future {
			projectsStub.get(flowOf(uuid(id))).firstOrNull().also {
				log.info("get project for id{{}} = {}", id, it)
			}
		}
	}

	/**
	 * Gets all projects matching [ids].
	 */
	@Query("projects")
	fun projects(@Arg("ids") ids: UuidList, projectsStub: ProjectsCoroutineStub): ListenableFuture<List<Project>> =
		runBlocking {
			future {
				projectsStub.get(ids.idsList.asFlow()).toList().also {
					log.info("get projects for ids{{}} = {}", ids, it)
				}
			}
		}

	/**
	 * Upserts [project].
	 */
	@Mutation("setProject")
	fun setProject(@Arg("project") project: Project, projectsStub: ProjectsCoroutineStub): ListenableFuture<Project> =
		runBlocking {
			future {
				projectsStub.upsert(flowOf(project)).first().also {
					log.info("set project{{}} = {}", project, it)
				}
			}
		}

	/**
	 * Deletes all projects matching [ids] and returns their former representations.
	 */
	@Mutation("deleteProjects")
	fun delete(@Arg("ids") ids: UuidList, projectsStub: ProjectsCoroutineStub): ListenableFuture<List<Project>> =
		runBlocking {
			future {
				projectsStub.delete(ids.idsList.asFlow()).toList().also {
					log.info("delete projects for ids{{}} = {}", ids, it)
				}
			}
		}
}
