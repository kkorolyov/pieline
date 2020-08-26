import gql from "graphql-tag";
import { userFields, i18nPackFields } from "./fragments";

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

export const localeI18n = gql`
  query i18n($locale: i18n_Locale) {
    i18n(locale: $locale) {
      ...i18nPackFields
    }
  }
  ${i18nPackFields}
`;
