import { User_Details } from "gql";
import { client, wrapId } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

export const register = async (user: string, pass: string): Promise<string> => {
  const {
    register: { token },
  } = await client.request(mutations.register, {
    user,
    pass,
  });

  return token;
};
export const authenticate = async (
  user: string,
  pass: string
): Promise<string> => {
  const {
    authenticate: { token },
  } = await client.request(queries.auth, {
    user,
    pass,
  });

  return token;
};

export const getProfile = async (id: string): Promise<User_Details> => {
  const {
    user: { details },
  } = await client.request(queries.fullUser, { id: wrapId(id) });

  return details;
};
export const saveProfile = async (
  id: string,
  details: User_Details
): Promise<User_Details> => {
  const {
    setUser: { details: resultDetails },
  } = await client.request(mutations.setUser, {
    user: {
      id: wrapId(id),
      details,
    },
  });

  return resultDetails;
};
