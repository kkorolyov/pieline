import { User_Details } from "gql";
import { client, wrapId } from "./graphql/client";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

export const getProfile = async (id: string): Promise<User_Details> => {
  const {
    users: {
      get: { details },
    },
  } = await client.request(queries.getUser, { id: wrapId(id) });

  return details;
};
export const saveProfile = async (
  id: string,
  details: User_Details
): Promise<User_Details> => {
  const {
    users: {
      set: { details: resultDetails },
    },
  } = await client.request(mutations.setUser, {
    user: {
      id: wrapId(id),
      details,
    },
  });

  return resultDetails;
};
