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
