import { MenuItem } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import Menu from "component/common/control/Menu";
import { ThemeConfigContext } from "context";
import { I18n_Locale } from "generated/graphql";
import React, { useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";

const Anchor = styled(Language)`
  cursor: pointer;
`;

/**
 * Theme locale selection.
 */
const LocaleSelector = () => {
  const { setLocale } = useContext(ThemeConfigContext);

  return (
    <Menu anchor={<Anchor />}>
      <MenuItem onClick={() => setLocale(I18n_Locale.EnUs)}>
        <ReactCountryFlag countryCode="US" svg />
      </MenuItem>
      <MenuItem onClick={() => setLocale(I18n_Locale.Ru)}>
        <ReactCountryFlag countryCode="RU" svg />
      </MenuItem>
    </Menu>
  );
};
export default LocaleSelector;
