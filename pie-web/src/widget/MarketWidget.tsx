import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import Widget from "./Widget";

const MarketWidget = () => {
  const { market } = useContext(i18nContext);

  return (
    <Widget title={market} location="/market">
      <Typography variant="h4">Marketplace widget placeholder</Typography>
    </Widget>
  );
};
export default MarketWidget;
