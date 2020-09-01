import { createContext } from "react";

type UserContextProps = {
  id?: string | null;
  setId: (id: string) => void;

  displayName?: string;
};
export default createContext({
  setId: () => {},
} as UserContextProps);
