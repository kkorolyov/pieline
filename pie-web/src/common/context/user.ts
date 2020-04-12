import { createContext } from "react";

type UserContextProps = {
  id?: string;
  setId: (id: string) => void;

  displayName?: string;
};
export const UserContext = createContext({
  setId: (id) => {},
} as UserContextProps);
