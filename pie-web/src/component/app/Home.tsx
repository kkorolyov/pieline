import { Container, Grid, Typography } from "@material-ui/core";
import ExploreWidget from "component/widget/ExploreWidget";
import MarketWidget from "component/widget/MarketWidget";
import ProjectsWidget from "component/widget/ProjectsWidget";
import { i18nContext } from "context";
import React, { useContext } from "react";

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
