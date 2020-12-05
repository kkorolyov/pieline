import { AuthContext } from "context";
import React from "react";
import ProjectsWidget from "./ProjectsWidget";

export default { title: "Widget/Projects", component: ProjectsWidget };

export const Unauthenticated = () => <ProjectsWidget />;
export const Authenticated = () => (
  <AuthContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <ProjectsWidget />
  </AuthContext.Provider>
);
