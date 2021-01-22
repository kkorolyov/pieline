import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Link from "component/common/control/Link";
import AuthBlock from "component/common/wrapper/AuthBlock";
import { I18nContext } from "context";
import React, { useContext } from "react";
import styled from "styled-components";
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
  const { title, projects, explore, market } = useContext(I18nContext);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Links>
          <Link to="/">
            <Typography variant="h3">{title}</Typography>
          </Link>
          <Link to="/projects">
            <Typography variant="h4">{projects}</Typography>
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
          <AuthBlock>
            <UserMenu />
          </AuthBlock>
        </Options>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
