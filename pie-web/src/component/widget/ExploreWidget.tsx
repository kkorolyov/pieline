import { Typography } from "@material-ui/core";
import { I18nContext } from "context";
import React, { useContext } from "react";
import Widget from "./Widget";

const ExploreWidget = () => {
  const { explore } = useContext(I18nContext);

  return (
    <Widget title={explore} location="/explore">
      <Typography variant="h4">Explore widget placeholder</Typography>
    </Widget>
  );
};
export default ExploreWidget;
