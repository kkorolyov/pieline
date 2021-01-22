import { Tab } from "@material-ui/core";
import { StaticRouter } from "react-router-dom";
import RoutingTabs from "./RoutingTabs";

export default {
  title: "Common/Control/Tabs",
  component: RoutingTabs,
};

export const Basic = () => (
  <StaticRouter>
    <RoutingTabs>
      <Tab label="One tab" value="one" />
      <Tab label="Two tab" value="two" />
      <Tab label="Red tab" value="red" />
      <Tab label="Blue tab" value="blue" />
    </RoutingTabs>
  </StaticRouter>
);
