import { Container, createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

type DarkProps = {
  children: React.ReactNode;
};
export const Dark = ({ children }: DarkProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">{children}</Container>
  </ThemeProvider>
);
