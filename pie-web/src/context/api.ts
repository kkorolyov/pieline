import { I18n_Locale, Project_Details, User_Details } from "gql";
import { createContext } from "react";

type AuthApi = {
  /**
   * Registers a given `(user, pass)` combination.
   * @param user user name
   * @param pass user password
   * @returns registered user id
   */
  register: (user: string, pass: string) => Promise<string>;
  /**
   * Authenticates a given `(user, pass)` combination.
   * @param user user name
   * @param pass user password
   * @returns authenticated user id
   */
  authenticate: (user: string, pass: string) => Promise<string>;
};

type UserApi = {
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

type ProjectApi = {
  /**
   * Gets project details by ID.
   * @param id project ID
   * @returns associated project details
   */
  getProject: (id: string) => Promise<Project_Details>;
  /**
   * Persists project state.
   * @param details project details to persist
   * @param id? ID of project to update; if not set, creates a new project with given `details`
   * @returns updated project state
   */
  saveProject: (
    details: Project_Details,
    id?: string
  ) => Promise<{ id: string; details: Project_Details }>;
};

type I18nApi = {
  /**
   * Retrieves i18n for given locale.
   * @param locale locale to get i18n pack for
   * @returns associated i18n pack
   */
  getI18n: (locale: I18n_Locale) => Promise<{ [key: string]: string }>;
};

export type ApiContextProps = AuthApi & UserApi & ProjectApi & I18nApi;

export default createContext({} as ApiContextProps);
