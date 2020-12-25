import { StaticRouter } from "react-router-dom";
import ProjectTabs from "./ProjectTabs";

export default {
  title: "Project/ProjectTabs",
  component: ProjectTabs,
};

export const Basic = () => (
  <StaticRouter>
    <ProjectTabs />
  </StaticRouter>
);
