import { Route, StaticRouter } from "react-router-dom";
import Project from "./Project";

export default {
  title: "Project/Project",
  component: Project,
};

const Base = ({ page }: { page: string }) => (
  <StaticRouter location={`/base/${page}`}>
    <Route path="/base">
      <Project id="bogoProjo" />
    </Route>
  </StaticRouter>
);
export const About = () => <Base page="about" />;
export const Assets = () => <Base page="assets" />;
export const Members = () => <Base page="members" />;
export const Settings = () => <Base page="settings" />;
