import { AuthContext } from "context";
import React from "react";
import Nav from "./Nav";

export default { title: "Navigation/Nav", component: Nav };

export const Unauthenticated = () => <Nav />;
export const Authenticated = () => (
  <AuthContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <Nav />
  </AuthContext.Provider>
);
