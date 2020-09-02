import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Common_Uuid, Common_UuidList } from "generated/graphql";

declare global {
  interface Window {
    ADDR_GATE: string;
  }
}

/**
 * GQL client.
 */
export const client = new ApolloClient({
  // Get runtime var with fallback to static var
  uri: window.ADDR_GATE || process.env.REACT_APP_ADDR_GATE,
  cache: new InMemoryCache(),
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
