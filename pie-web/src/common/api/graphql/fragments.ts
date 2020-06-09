import gql from "graphql-tag";

export const userFields = gql`
  fragment userFields on user_User {
    id {
      value
    }
    details {
      displayName
      email
    }
  }
`;
