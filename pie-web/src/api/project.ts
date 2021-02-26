import {
  Project_Project_Details,
  Project_SearchRequest,
  Project_SearchResponse,
} from "gql";
import { client, wrapId } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

/**
 * Searches for projects.
 * @param request search request
 * @returns matching result
 */
export const searchProjects = async (
  request: Project_SearchRequest
): Promise<Project_SearchResponse> => {
  const {
    projects: {
      search: { result },
    },
  } = await client.request(queries.searchProjects, {
    request,
  });
  return result;
};

/**
 * Gets project details by ID.
 * @param id project ID
 * @returns matching project
 */
export const getProject = async (
  id: string
): Promise<Project_Project_Details> => {
  const {
    projects: {
      get: { details },
    },
  } = await client.request(queries.getProject);

  return details;
};

/**
 * Persists project state.
 * @param details project details to persist
 * @param id? ID of project to update; if not set, creates a new project with given `details`
 * @returns updated project state
 */
export const saveProject = async (
  details: Project_Project_Details,
  id?: string
): Promise<{ id: string; details: Project_Project_Details }> => {
  const {
    projects: {
      set: { id: resultId, details: resultDetails },
    },
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
