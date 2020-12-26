import { AppBar, Tab, Tabs } from "@material-ui/core";
import { I18nContext } from "context";
import React, { useContext } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

/**
 * Switchable project tabs routing to various contents.
 */
const ProjectTabs = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { url } = useRouteMatch();

  const i18n = useContext(I18nContext);

  return (
    <AppBar position="static">
      <Tabs
        value={pathname}
        onChange={(_, value) => {
          history.push(value);
        }}
      >
        <Tab label={i18n.projectAbout} value={`${url}/about`} />
        <Tab label={i18n.projectAssets} value={`${url}/assets`} />
        <Tab label={i18n.projectMembers} value={`${url}/members`} />
      </Tabs>
    </AppBar>
  );
};
export default ProjectTabs;
