import { Typography } from "@material-ui/core";
import { i18nContext } from "context";
import React, { useContext } from "react";
import Widget from "./Widget";

const ExploreWidget = () => {
  const { explore } = useContext(i18nContext);

  return (
    <Widget title={explore} location="/explore">
      <Typography variant="h4">Explore widget placeholder</Typography>
    </Widget>
  );
};
export default ExploreWidget;
