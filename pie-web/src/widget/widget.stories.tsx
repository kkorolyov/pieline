import { Typography } from "@material-ui/core";
import React from "react";
import ExploreWidget from "./ExploreWidget";
import MarketWidget from "./MarketWidget";
import Widget from "./Widget";

export default { title: "Widget" };

export const container = () => (
  <Widget title="title" location="/more">
    <Typography variant="h4">Widget content</Typography>
  </Widget>
);

export const explore = () => <ExploreWidget />;
export const market = () => <MarketWidget />;
