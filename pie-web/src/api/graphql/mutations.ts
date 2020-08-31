import gql from "graphql-tag";
import { userFields } from "./fragments";

export const setUser = gql`
  mutation setUser($user: Input_user_User) {
    setUser(user: $user) {
      ...userFields
    }
  }
  ${userFields}
`;

/**
 * Register a new user given `user: String, pass: String`.
 */
export const register = gql`
  mutation register($user: String, $pass: String) {
    register(user: $user, pass: $pass) {
      token
    }
  }
`;
