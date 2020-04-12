import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "../common/components";
import { UserContext } from "../common/context";
import AuthBar from "./AuthBar";
import UserMenu from "./UserMenu";

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
/**
 * Main navigation bar.
 */
const Nav = ({ title }: NavProps) => {
  const { id } = useContext(UserContext);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/">
          <Typography variant="h3">{title}</Typography>
        </Link>
        {id ? <UserMenu /> : <AuthBar />}
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
