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

export const i18nPackFields = gql`
  fragment i18nPackFields on i18n_i18nPack {
    value {
      key
      value
    }
  }
`;
