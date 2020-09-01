import { createContext } from "react";

export const i18nDefault = [
  "title",
  "tagline",
  "explore",
  "market",
  "more",
  "projects",
  "profile",

  "username",
  "password",
  "register",
  "logIn",
  "logOut",

  "errorRegister",
  "errorLogIn",
].reduce((result: { [key: string]: string }, val) => {
  result[val] = val;
  return result;
}, {});

export type I18nContextProps = {
  title?: string;
  tagline?: string;
  explore?: string;
  market?: string;
  more?: string;
  projects?: string;
  profile?: string;

  username?: string;
  password?: string;
  register?: string;
  logIn?: string;
  logOut?: string;

  errorRegister?: string;
  errorLogIn?: string;
};
export default createContext(i18nDefault as I18nContextProps);
