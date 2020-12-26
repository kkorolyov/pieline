import { Paper } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import About from "./content/About";
import Assets from "./content/Assets";
import Members from "./content/Members";
import Settings from "./content/Settings";
import ProjectHeader from "./ProjectHeader";
import ProjectTabs from "./ProjectTabs";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Main project content router.
 */
const Project = () => {
  const { path } = useRouteMatch();

  // TODO api for Project

  return (
    <Layout>
      <ProjectHeader title="testo" />
      <ProjectTabs />

      <Paper>
        <Switch>
          <Route path={`${path}/about`}>
            <About />
          </Route>
          <Route path={`${path}/assets`}>
            <Assets />
          </Route>
          <Route path={`${path}/members`}>
            <Members />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
        </Switch>
      </Paper>
    </Layout>
  );
};
export default Project;
