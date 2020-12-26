import { createContext } from "react";

export const i18nDefault = [
  "title",
  "tagline",
  "explore",
  "market",
  "more",
  "projects",
  "profile",

  "edit",
  "settings",

  "username",
  "password",
  "register",
  "logIn",
  "logOut",

  "projectAbout",
  "projectAssets",
  "projectMembers",

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

  edit?: string;
  settings?: string;

  username?: string;
  password?: string;
  register?: string;
  logIn?: string;
  logOut?: string;

  projectAbout?: string;
  projectAssets?: string;
  projectMembers?: string;

  errorRegister?: string;
  errorLogIn?: string;
};
export default createContext(i18nDefault as I18nContextProps);
