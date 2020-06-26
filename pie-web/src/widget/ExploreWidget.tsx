import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { i18nContext } from "../common/context";
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
