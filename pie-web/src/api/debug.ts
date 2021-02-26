import { Debug_Jwt } from "gql";
import { client } from "./graphql/client";
import * as queries from "./graphql/queries";

/**
 * Gets JWT information for the current header configuration.
 */
export const jwt = async (): Promise<Debug_Jwt> => {
  const {
    debug: { jwt },
  } = await client.request(queries.jwt);
  return jwt;
};
