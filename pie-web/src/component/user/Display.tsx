import { Grid, Typography } from "@material-ui/core";
import { User_Details } from "generated/graphql";
import React from "react";

export type DisplayProps = User_Details;
const Display = ({ displayName, email }: DisplayProps) => (
  <Grid container direction="column">
    <Typography variant="h4">{displayName}</Typography>
    <Typography variant="h5">{email}</Typography>
  </Grid>
);
export default Display;
