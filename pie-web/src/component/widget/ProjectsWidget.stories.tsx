import { UserContext } from "context";
import React from "react";
import ProjectsWidget from "./ProjectsWidget";

export default { title: "Widget/Projects", component: ProjectsWidget };

export const Unauthenticated = () => <ProjectsWidget />;
export const Authenticated = () => (
  <UserContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <ProjectsWidget />
  </UserContext.Provider>
);
