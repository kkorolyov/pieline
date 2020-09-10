import { Avatar, MenuItem } from "@material-ui/core";
import Link from "component/common/control/Link";
import Menu from "component/common/control/Menu";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext, I18nContext } from "context";

const ProfileIcon = styled(Avatar)`
  cursor: pointer;
`;

/**
 * Toggled menu for actions pertaining to the current user.
 */
const UserMenu = () => {
  const { displayName, setToken } = useContext(UserContext);
  const i18n = useContext(I18nContext);

  return (
    <Menu anchor={<ProfileIcon title={displayName} />}>
      <MenuItem component={Link} to="user">
        {i18n.profile}
      </MenuItem>
      <MenuItem onClick={() => setToken(undefined)}>{i18n.logOut}</MenuItem>
    </Menu>
  );
};
export default UserMenu;