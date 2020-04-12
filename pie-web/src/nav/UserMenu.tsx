import { Avatar, MenuItem } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Link, Menu } from "../common/components";

const ProfileIcon = styled(Avatar)`
  cursor: pointer;
`;

/**
 * Toggled menu for actions pertaining to the current user.
 */
const UserMenu = () => (
  <Menu anchor={<ProfileIcon />}>
    <MenuItem component={Link} to="user">
      Profile
    </MenuItem>
  </Menu>
);
export default UserMenu;
