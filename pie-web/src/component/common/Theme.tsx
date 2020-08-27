import { createMuiTheme, CssBaseline } from "@material-ui/core";
import {
  StylesProvider,
  Theme as MuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { ThemeProvider } from "styled-components";

const light = createMuiTheme({
  palette: {
    type: "light",
  },
});
const dark = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export type ThemeProps = {
  /**
   * Material-UI theme to apply
   */
  theme: MuiTheme;
  /**
   * Child nodes
   */
  children: React.ReactNode;
};
/**
 * Pluggable application theme wrapper component.
 */
const Theme = ({ theme, children }: ThemeProps) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

/**
 * Light application theme.
 */
export const Light = ({ children }: Omit<ThemeProps, "theme">) => (
  <Theme theme={light}>{children}</Theme>
);
/**
 * Dark application theme.
 */
export const Dark = ({ children }: Omit<ThemeProps, "theme">) => (
  <Theme theme={dark}>{children}</Theme>
);
