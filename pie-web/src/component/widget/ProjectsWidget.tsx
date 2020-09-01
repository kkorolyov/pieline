import { Typography } from "@material-ui/core";
import { I18nContext, UserContext } from "context";
import React, { useContext } from "react";
import Widget from "./Widget";

const ProjectsWidget = () => {
  const { projects } = useContext(I18nContext);
  const { token: id } = useContext(UserContext);

  return (
    <Widget title={projects} location={id ? `/${id}/projects` : undefined}>
      <Typography variant="h4">Projects widget placeholder</Typography>
    </Widget>
  );
};
export default ProjectsWidget;
