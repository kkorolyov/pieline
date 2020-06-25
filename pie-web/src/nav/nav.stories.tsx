import React from "react";
import Nav from "./Nav";
import { UserContext } from "../common/context";
import AuthBar from "./AuthBar";

export default { title: "Navigation" };

export const authBar = () => <AuthBar />;

export const unauthenticated = () => <Nav />;
export const authenticated = () => (
  <UserContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <Nav />
  </UserContext.Provider>
);
