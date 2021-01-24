import {
  AppBar,
  Button,
  Paper,
  Tab,
  Theme,
  Typography,
  withTheme,
} from "@material-ui/core";
import { Settings as IconSettings } from "@material-ui/icons";
import Link from "component/common/control/Link";
import RoutingTabs from "component/common/control/RoutingTabs";
import Errable from "component/common/wrapper/Errable";
import Waitable from "component/common/wrapper/Waitable";
import { ApiContext, I18nContext } from "context";
import { useArgs, useExecutor } from "hooks";
import { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import About from "./content/About";
import Assets from "./content/Assets";
import Members from "./content/Members";
import Settings from "./content/Settings";

const Layout = withTheme(styled(Paper)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title settings"
    "content content";
  gap: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;
  justify-items: space-between;
  align-items: center;

  padding: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.palette.primary.dark};
`);
const LayoutTitle = styled(Typography)`
  grid-area: title;
`;
const LayoutSettings = styled(Link)`
  grid-area: settings;
`;
const LayoutContent = styled(Paper)`
  grid-area: content;
`;

type ProjectProps = {
  /**
   * ID of project to display
   */
  id: string;
};
/**
 * Main project content router.
 */
const Project = ({ id }: ProjectProps) => {
  const { path, url } = useRouteMatch();

  const i18n = useContext(I18nContext);

  const { getProject } = useContext(ApiContext);
  const getExecutor = useExecutor(getProject);

  // TODO Get from API
  const configurable = true;

  useArgs(getExecutor, id);

  return (
    <Waitable waiting={getExecutor.waiting}>
      <Errable error={getExecutor.error}>
        <Layout>
          <LayoutTitle variant="h4">{getExecutor.result?.title}</LayoutTitle>
          {configurable && (
            <LayoutSettings to="settings">
              <Button title={i18n.helpSettings}>
                <IconSettings fontSize="large" />
              </Button>
            </LayoutSettings>
          )}

          <LayoutContent>
            <AppBar position="static">
              <RoutingTabs>
                <Tab label={i18n.projectAbout} value={`${url}/about`} />
                <Tab label={i18n.projectAssets} value={`${url}/assets`} />
                <Tab label={i18n.projectMembers} value={`${url}/members`} />
              </RoutingTabs>
            </AppBar>

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
          </LayoutContent>
        </Layout>
      </Errable>
    </Waitable>
  );
};
export default Project;
