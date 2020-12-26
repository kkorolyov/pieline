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

export const projectFields = gql`
  fragment projectFields on project_Project {
    id {
      value
    }
    details {
      title
      description
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
