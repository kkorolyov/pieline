import ApolloClient from "apollo-boost";
import { Common_Uuid, Common_UuidList } from "../../../generated/graphql";

const HOST = "http://localhost:8080";

/**
 * GQL client.
 */
export const client = new ApolloClient({
  uri: HOST,
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
