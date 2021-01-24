import { Project_Details } from "gql";
import { client, wrapId } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

export const getProjects

/**
 * Gets project details by ID.
 * @param id project ID
 */
export const getProject = async (id: string): Promise<Project_Details> => {
  const {
    project: { details },
  } = await client.request(queries.fullProject);

  return details;
};

/**
 * Persists project state.
 * @param details project details to persist
 * @param id? ID of project to update; if not set, creates a new project with given `details`
 * @returns updated project state
 */
export const saveProject = async (
  details: Project_Details,
  id?: string
): Promise<{ id: string; details: Project_Details }> => {
  const {
    setProject: { id: resultId, details: resultDetails },
  } = await client.request(mutations.setProject, {
    project: {
      id: id && wrapId(id),
      details,
    },
  });
  return {
    id: resultId.value,
    details: resultDetails,
  };
};
