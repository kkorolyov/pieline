import { createContext } from "react";

type AuthContextProps = {
  /** Current user ID */
  id?: string;
  /** User ID setter */
  setId: (id?: string) => void;

  /** Current user display name */
  displayName?: string;
};
/**
 * Authenticated user state.
 */
export default createContext({
  setId: () => {}
} as AuthContextProps);
