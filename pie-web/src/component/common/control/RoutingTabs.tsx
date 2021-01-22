import { TabProps, Tabs } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory, useLocation } from "react-router-dom";

type RoutingTabsProps = {
  /**
   * Tabs with values expected to be target URLs
   */
  children?: ReactElement<TabProps> | ReactElement<TabProps>[];
};
/**
 * Tabs hooked into React Router.
 */
const RoutingTabs = ({ children }: RoutingTabsProps) => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <Tabs
      value={pathname}
      onChange={(_, value) => {
        history.push(value);
      }}
    >
      {children}
    </Tabs>
  );
};
export default RoutingTabs;
