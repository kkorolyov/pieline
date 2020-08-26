import { Typography } from "@material-ui/core";
import React from "react";
import ExploreWidget from "./ExploreWidget";
import MarketWidget from "./MarketWidget";
import Widget from "./Widget";
import ProjectsWidget from "./ProjectsWidget";
import { UserContext } from "../../context";

export default { title: "Widget" };

export const container = () => (
  <Widget title="title">
    <Typography variant="h4">Widget content</Typography>
  </Widget>
);
export const moreContainer = () => (
  <Widget title="title" location="/more">
    <Typography variant="h4">Widget content with more</Typography>
  </Widget>
);

export const explore = () => <ExploreWidget />;
export const market = () => <MarketWidget />;

export const projectsUnauthenticated = () => <ProjectsWidget />;
export const projectsAuthenticated = () => (
  <UserContext.Provider value={{ id: "bogoId", setId: () => {} }}>
    <ProjectsWidget />
  </UserContext.Provider>
);
