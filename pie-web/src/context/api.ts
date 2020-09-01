import { createContext } from "react";
import { User_Details, I18n_Locale } from "generated/graphql";

type UserApi = {
  /**
   * Registers a given `(user, pass)` combination.
   * @param user user name
   * @param pass user password
   * @returns registered user token
   */
  register: (user: string, pass: string) => Promise<string>;
  /**
   * Authenticates a given `(user, pass)` combination.
   * @param user user name
   * @param pass user password
   * @returns authenticated user token
   */
  authenticate: (user: string, pass: string) => Promise<string>;

  /**
   * Retrieves a profile for a given user ID.
   * @param id user ID
   * @returns associated profile state
   */
  getProfile: (id: string) => Promise<User_Details>;
  /**
   * Persists user profile state.
   * @param id user ID
   * @param state profile state to persist
   * @returns persisted profile state
   */
  saveProfile: (id: string, details: User_Details) => Promise<User_Details>;
};
type I18nApi = {
  /**
   * Retrieves i18n for given locale.
   * @param locale locale to get i18n pack for
   * @returns associated i18n pack
   */
  getI18n: (locale: I18n_Locale) => Promise<{ [key: string]: string }>;
};

export type ApiContextProps = UserApi & I18nApi;

export default createContext({} as ApiContextProps);
