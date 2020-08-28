import { UserContext } from "context";
import React from "react";
import Nav from "./Nav";

export default { title: "Navigation/Nav", component: Nav };

export const Unauthenticated = () => <Nav />;
export const Authenticated = () => (
  <UserContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <Nav />
  </UserContext.Provider>
);
