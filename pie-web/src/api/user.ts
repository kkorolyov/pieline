import { User_Details } from "generated/graphql";
import { client, wrapId } from "./graphql/client";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

/**
 * Registers a given `(user, pass)` combination.
 * @param user user name
 * @param pass user password
 * @returns registered user token
 */
export const register = async (user: string, pass: string): Promise<string> => {
  const { data } = await client.mutate({
    mutation: mutations.register,
    variables: {
      user,
      pass,
    },
  });
  const { token } = data;

  return token;
};
/**
 * Authenticates a given `(user, pass)` combination.
 * @param user user name
 * @param pass user password
 * @returns authenticated user token
 */
export const authenticate = async (
  user: string,
  pass: string
): Promise<string> => {
  const { data } = await client.query({
    query: queries.auth,
    variables: {
      user,
      pass,
    },
  });
  const { token } = data;

  return token;
};

/**
 * Retrieves a profile for a given user ID.
 * @param id user ID
 * @returns associated profile state
 */
export const getProfile = async (id: string): Promise<User_Details> => {
  const { data } = await client.query({
    query: queries.fullUser,
    variables: { id: wrapId(id) },
  });
  const {
    user: { details },
  } = data;

  return details;
};
/**
 * Persists user profile state.
 * @param id user ID
 * @param state profile state to persist
 * @returns persisted profile state
 */
export const saveProfile = async (
  id: string,
  details: User_Details
): Promise<User_Details> => {
  const { data } = await client.mutate({
    mutation: mutations.setUser,
    variables: {
      user: {
        id: wrapId(id),
        details,
      },
    },
  });
  const {
    setUser: { details: resultDetails },
  } = data;

  return resultDetails;
};
