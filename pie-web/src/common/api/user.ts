import { User_Details } from "../../generated/graphql";
import { client, wrapId } from "./graphql/client";
import { setUser } from "./graphql/mutations";
import { fullUser } from "./graphql/queries";

/**
 * Authenticates a given `(userName, password)` combination.
 * @returns authenticated user ID
 */
export const authenticate = async (
  userName: string,
  password: string
): Promise<string> => "bogoId";

/**
 * Retrieves a profile for a given user ID.
 * @param id user ID
 * @returns associated profile state
 */
export const getProfile = async (id: string): Promise<User_Details> => {
  const {
    data: {
      user: { details },
    },
  } = await client.query({
    query: fullUser,
    variables: { id: wrapId(id) },
  });

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
    mutation: setUser,
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
