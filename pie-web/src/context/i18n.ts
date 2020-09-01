import { createContext } from "react";

export const i18nDefault = [
  "title",
  "tagline",
  "explore",
  "market",
  "more",
  "projects",

  "username",
  "password",
  "register",
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

  username?: string;
  password?: string;
  register?: string;
};
export default createContext(i18nDefault as I18nContextProps);
