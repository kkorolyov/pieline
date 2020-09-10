import {
  createMuiTheme,
  CssBaseline,
  StylesProvider,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core";
import { enUS, ruRU } from "@material-ui/core/locale";
import { I18n_Locale } from "gql";
import React from "react";
import { ThemeProvider } from "styled-components";

/**
 * Defines a theme color palette.
 */
export enum Palette {
  LIGHT,
  DARK,
}

const palettes: { [key: number]: ThemeOptions } = {
  [Palette.LIGHT]: {
    palette: {
      type: "light",
    },
  },
  [Palette.DARK]: {
    palette: {
      type: "dark",
    },
  },
};
const locales = {
  [I18n_Locale.EnUs]: enUS,
  [I18n_Locale.Ru]: ruRU,
};

export type ThemeProps = {
  /**
   * Selected color palette
   */
  palette?: Palette;
  /**
   * Selected locale
   */
  locale?: I18n_Locale;
  /**
   * Child nodes
   */
  children: React.ReactNode;
};
/**
 * Pluggable application theme wrapper component.
 */
const Theme = ({
  palette = Palette.LIGHT,
  locale = I18n_Locale.EnUs,
  children,
}: ThemeProps) => {
  const theme = createMuiTheme(palettes[palette], locales[locale]);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};
export default Theme;
