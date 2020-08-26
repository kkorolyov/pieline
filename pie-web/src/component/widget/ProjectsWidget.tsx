import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { i18nContext, UserContext } from "../../context";
import Widget from "./Widget";

const ProjectsWidget = () => {
  const { projects } = useContext(i18nContext);
  const { id } = useContext(UserContext);

  return (
    <Widget title={projects} location={id ? `/${id}/projects` : undefined}>
      <Typography variant="h4">Projects widget placeholder</Typography>
    </Widget>
  );
};
export default ProjectsWidget;
