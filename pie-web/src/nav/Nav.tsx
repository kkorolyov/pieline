import {
  AppBar,
  Avatar,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Link, Menu } from "../common/components";

const ProfileIcon = styled(Avatar)`
  cursor: pointer;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

type NavProps = {
  /**
   * Navbar title
   */
  title: string;
};
const Nav = ({ title }: NavProps) => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/">
          <Typography variant="h3">{title}</Typography>
        </Link>
        <Menu anchor={<ProfileIcon />}>
          <MenuItem component={Link} to="user">
            Profile
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
