import { themes } from "@storybook/theming";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Dark, Light } from "../src/component/common/Theme";
import { ApiContext } from "../src/context";
import * as api from "./stub/api";

const appThemes = {
  light: Light,
  dark: Dark,
};
export const decorators = [
  (Story, { globals: { theme } }) => {
    const Theme = appThemes[theme];

    return (
      <Router>
        <Theme>
          <ApiContext.Provider value={api}>
            <Story />
          </ApiContext.Provider>
        </Theme>
      </Router>
    );
  },
];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Component theme",
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
