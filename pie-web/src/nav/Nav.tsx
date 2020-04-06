import {
  AppBar,
  Avatar,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Menu } from "../common/components";

const ProfileIcon = styled(Avatar)`
  cursor: pointer;
`;

type NavProps = {
  /**
   * Navbar title
   */
  title: string;
};
const Nav = ({ title }: NavProps) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h3">{title}</Typography>
        <Menu anchor={<ProfileIcon />}>
          <MenuItem>Profile</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
