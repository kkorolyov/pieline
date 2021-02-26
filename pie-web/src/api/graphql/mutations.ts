import gql from "graphql-tag";
import { projectFields, userFields } from "./fragments";

/**
 * Register a new user given `user: String, pass: String`.
 */
export const register = gql`
  mutation register($user: String, $pass: String) {
    auth {
      register(user: $user, pass: $pass) {
        id {
          value
        }
        token
      }
    }
  }
`;

/**
 * Sets user state.
 */
export const setUser = gql`
  mutation setUser($user: Input_user_User) {
    users {
      set(user: $user) {
        ...userFields
      }
    }
  }
  ${userFields}
`;

/**
 * Sets project state.
 */
export const setProject = gql`
  mutation setProject($project: Input_project_Project) {
    projects {
      set(project: $project) {
        ...projectFields
      }
    }
  }
  ${projectFields}
`;
