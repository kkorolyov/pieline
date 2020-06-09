import gql from "graphql-tag";
import { userFields } from "./fragments";

export const fullUser = gql`
  query fullUser($id: Input_common_Uuid) {
    user(id: $id) {
      ...userFields
    }
  }
  ${userFields}
`;
export const fullUsers = gql`
  query fullUsers($ids: Input_common_UuidList) {
    users(ids: $ids) {
      ...userFields
    }
  }
  ${userFields}
`;
