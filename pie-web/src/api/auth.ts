import { client } from "./graphql/client";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

const setToken = (token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
};

/**
 * Registers a new user for a given `(user, pass)` combination and returns the user's ID.
 */
export const register = async (user: string, pass: string): Promise<string> => {
  const {
    register: {
      token,
      id: { value },
    },
  } = await client.request(mutations.register, {
    user,
    pass,
  });

  setToken(token);

  return value;
};
/**
 * Authenticates a new user for a given `(user, pass)` combination and returns the user's ID.
 */
export const authenticate = async (
  user: string,
  pass: string
): Promise<string> => {
  const {
    authenticate: {
      token,
      id: { value },
    },
  } = await client.request(queries.auth, {
    user,
    pass,
  });

  setToken(token);

  return value;
};
