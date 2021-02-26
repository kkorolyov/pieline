import { Avatar, MenuItem } from "@material-ui/core";
import { setToken } from "api/graphql/client";
import Link from "component/common/control/Link";
import Menu from "component/common/control/Menu";
import { AuthContext, I18nContext } from "context";
import React, { useContext } from "react";
import styled from "styled-components";

const ProfileIcon = styled(Avatar)`
  cursor: pointer;
`;

/**
 * Toggled menu for actions pertaining to the current user.
 */
const UserMenu = () => {
  const { displayName, setId } = useContext(AuthContext);
  const i18n = useContext(I18nContext);

  return (
    <Menu anchor={<ProfileIcon title={displayName} />}>
      <MenuItem component={Link} to="user">
        {i18n.profile}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setId();
          setToken();
        }}
      >
        {i18n.logOut}
      </MenuItem>
    </Menu>
  );
};
export default UserMenu;
