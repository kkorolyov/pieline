import gql from "graphql-tag";
import { projectFields, userFields } from "./fragments";

/**
 * Sets user state.
 */
export const setUser = gql`
  mutation setUser($user: Input_user_User) {
    setUser(user: $user) {
      ...userFields
    }
  }
  ${userFields}
`;

/**
 * Sets project state.
 */
export const setProject = gql`
  mutation setProject($project: Input_project_Project) {
    setProject(project: $project) {
      ...projectFields
    }
  }
  ${projectFields}
`;

/**
 * Register a new user given `user: String, pass: String`.
 */
export const register = gql`
  mutation register($user: String, $pass: String) {
    register(user: $user, pass: $pass) {
      token
      id {
        value
      }
    }
  }
`;
