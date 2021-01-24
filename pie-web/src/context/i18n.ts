import { createContext } from "react";

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

  projectAbout?: string;
  projectAssets?: string;
  projectMembers?: string;

  errorRegister?: string;
  errorLogIn?: string;

  helpSettings?: string;
  helpEdit?: string;
  helpFilterProjects?: string;
  helpCreateProject?: string;
};

export const i18nDefault: I18nContextProps = [
  "title",
  "tagline",
  "explore",
  "market",
  "more",
  "projects",
  "profile",

  "edit",

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

  "helpSettings",
  "helpEdit",
  "helpFilterProjects",
  "helpCreateProject",
].reduce((result, val) => {
  result[val] = `_${val}`;
  return result;
}, {} as { [key: string]: string });

export default createContext(i18nDefault as I18nContextProps);
