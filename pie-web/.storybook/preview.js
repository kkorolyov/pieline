import { themes } from "@storybook/theming";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Theme, { Palette } from "../src/component/common/Theme";
import { ApiContext } from "../src/context";
import * as api from "./stub/api";

const palettes = {
  light: Palette.LIGHT,
  dark: Palette.DARK,
};
export const decorators = [
  (Story, { globals: { palette } }) => {
    return (
      <Router>
        <ApiContext.Provider value={api}>
          <Theme palette={palettes[palette]}>
            <Story />
          </Theme>
        </ApiContext.Provider>
      </Router>
    );
  },
];

export const globalTypes = {
  palette: {
    name: "Palette",
    description: "Component color palette",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: ["light", "dark"],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true, hideNoControlsWarning: true },
  backgrounds: { disable: true },
  docs: {
    theme: themes.dark,
  },
};
