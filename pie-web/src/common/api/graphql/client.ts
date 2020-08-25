import ApolloClient from "apollo-boost";
import { Common_Uuid, Common_UuidList } from "../../../generated/graphql";

/**
 * GQL client.
 */
export const client = new ApolloClient({
  uri: process.env.REACT_APP_ADDR_GATE,
});

/**
 * Wraps an ID in the format expected by the GQL server.
 * @param id ID to wrap
 */
export function wrapId(id: string): Common_Uuid {
  return { value: id };
}
/**
 * Wraps IDs in the format expected by the GQL server.
 * @param ids IDs to wrap
 */
export function wrapIds(ids: string[]): Common_UuidList {
  return { ids: ids.map(wrapId) };
}
