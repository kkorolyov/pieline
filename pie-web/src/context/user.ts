import { createContext } from "react";

type UserContextProps = {
  // Current user token
  token?: string;
  // User token setter
  setToken: (token?: string) => void;

  // Current user display name
  displayName?: string;
};
export default createContext({
  setToken: () => {},
} as UserContextProps);
