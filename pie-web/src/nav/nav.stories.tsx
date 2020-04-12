import React from "react";
import Nav from "./Nav";
import { UserContext } from "../common/context";

export default { title: "Navigation" };

export const unauthenticated = () => <Nav title="NavStory" />;
export const authenticated = () => (
  <UserContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <Nav title="NavStory" />
  </UserContext.Provider>
);
