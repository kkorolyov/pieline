import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Link from "component/common/control/Link";
import { I18nContext, AuthContext } from "context";
import React, { useContext } from "react";
import styled from "styled-components";
import AuthBar from "./AuthBar";
import LocaleSelector from "./LocaleSelector";
import PaletteSelector from "./PaletteSelector";
import UserMenu from "./UserMenu";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
const Links = styled.span`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    > *:not(:first-child) {
      margin-left: ${theme.spacing(4)}px
    }
  `}
`;
const Options = styled.span`
  ${({ theme }) => `
    display: inline-flex;
    align-items: center;
    > *:not(:first-child) {
      margin-left: ${theme.spacing()}px
    }
  `}
`;

/**
 * Main navigation bar.
 */
const Nav = () => {
  const { id } = useContext(AuthContext);
  const { title, explore, market } = useContext(I18nContext);

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
        <Options>
          <PaletteSelector />
          <LocaleSelector />
          {id ? <UserMenu /> : <AuthBar />}
        </Options>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
