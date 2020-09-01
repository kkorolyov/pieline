import { Typography } from "@material-ui/core";
import { I18nContext } from "context";
import React, { useContext } from "react";
import Widget from "./Widget";

const MarketWidget = () => {
  const { market } = useContext(I18nContext);

  return (
    <Widget title={market} location="/market">
      <Typography variant="h4">Marketplace widget placeholder</Typography>
    </Widget>
  );
};
export default MarketWidget;
