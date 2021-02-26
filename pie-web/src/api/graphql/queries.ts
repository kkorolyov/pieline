import gql from "graphql-tag";
import { i18nPackFields, projectFields, userFields } from "./fragments";

/**
 * Authenticates using given `user: String, pass: String`.
 */
export const login = gql`
  query login($user: String, $pass: String) {
    auth {
      login(user: $user, pass: $pass) {
        token
        id {
          value
        }
      }
    }
  }
`;

export const getUser = gql`
  query getUser($id: String) {
    users {
      get(id: $id) {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const searchProjects = gql`
  query searchProjects($request: Input_project_SearchRequest) {
    projects {
      search(request: $request) {
        result {
          ...projectFields
        }
        token
      }
    }
  }
  ${projectFields}
`;
export const getProject = gql`
  query getProject($id: String) {
    projects {
      get(id: $id) {
        ...projectFields
      }
    }
  }
  ${projectFields}
`;

/**
 * Gets i18n pack for `locale: Locale`.
 */
export const localeI18n = gql`
  query i18n($locale: i18n_Locale) {
    i18n(locale: $locale) {
      ...i18nPackFields
    }
  }
  ${i18nPackFields}
`;

export const jwt = gql`
  query jwt {
    debug {
      jwt {
        claims {
          key
          value
        }
      }
    }
  }
`;
