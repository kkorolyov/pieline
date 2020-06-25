import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "../common/components";
import AuthBar from "./AuthBar";
import UserMenu from "./UserMenu";
import { UserContext, i18nContext } from "../common/context";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
const Links = styled.span`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    > ${Link}:not(:first-child) {
      margin-left: ${theme.spacing(4)}px
    }
  `}
`;

/**
 * Main navigation bar.
 */
const Nav = () => {
  const { id } = useContext(UserContext);
  const { title, explore, market } = useContext(i18nContext);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Links>
          <Link to="/">
            <Typography variant="h3">{title}</Typography>
          </Link>
          <Link to="/explore">
            <Typography variant="h4">{explore}</Typography>
          </Link>
          <Link to="/market">
            <Typography variant="h4">{market}</Typography>
          </Link>
        </Links>
        {id ? <UserMenu /> : <AuthBar />}
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
