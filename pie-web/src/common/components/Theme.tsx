import { Container, createMuiTheme, CssBaseline } from "@material-ui/core";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { ThemeProvider } from "styled-components";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

type DarkProps = {
  children: React.ReactNode;
};
export const Dark = ({ children }: DarkProps) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">{children}</Container>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);
