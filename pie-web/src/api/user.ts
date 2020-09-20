import { User_Details } from "gql";
import { client, wrapId } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

export const register = async (user: string, pass: string): Promise<string> => {
  const { data } = await client.mutate({
    mutation: mutations.register,
    variables: {
      user,
      pass,
    },
  });
  const {
    register: { token },
  } = data;

  return token;
};
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
  const {
    authenticate: { token },
  } = data;

  return token;
};

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
