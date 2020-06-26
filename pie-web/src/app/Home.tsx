import { Container, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { i18nContext } from "../common/context";
import ExploreWidget from "../widget/ExploreWidget";
import MarketWidget from "../widget/MarketWidget";
import ProjectsWidget from "../widget/ProjectsWidget";

const Home = () => {
  const { tagline } = useContext(i18nContext);

  return (
    <Container maxWidth="xl">
      <Grid container direction="column" spacing={8}>
        <Grid item>
          <Typography variant="h3">{tagline}</Typography>
        </Grid>
        <Grid item>
          <ProjectsWidget />
        </Grid>
        <Grid item>
          <ExploreWidget />
        </Grid>
        <Grid item>
          <MarketWidget />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
