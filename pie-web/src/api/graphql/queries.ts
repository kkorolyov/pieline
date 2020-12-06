import gql from "graphql-tag";
import { i18nPackFields, userFields } from "./fragments";

/**
 * Authenticates using given `user: String, pass: String`.
 */
export const auth = gql`
  query auth($user: String, $pass: String) {
    authenticate(user: $user, pass: $pass) {
      token
      id {
        value
      }
    }
  }
`;

export const fullUser = gql`
  query fullUser($id: String) {
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
