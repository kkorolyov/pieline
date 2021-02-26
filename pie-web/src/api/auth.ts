import { client, setToken } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

/**
 * Authenticates a new user for a given `(user, pass)` combination and returns the user's ID.
 */
export const login = async (user: string, pass: string): Promise<string> => {
  const {
    auth: {
      login: {
        token,
        id: { value },
      },
    },
  } = await client.request(queries.login, {
    user,
    pass,
  });

  setToken(token);

  return value;
};
/**
 * Registers a new user for a given `(user, pass)` combination and returns the user's ID.
 */
export const register = async (user: string, pass: string): Promise<string> => {
  const {
    auth: {
      register: {
        token,
        id: { value },
      },
    },
  } = await client.request(mutations.register, {
    user,
    pass,
  });

  setToken(token);

  return value;
};
