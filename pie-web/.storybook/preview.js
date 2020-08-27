import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Dark, Light } from "../src/component/common";

const themes = {
  light: Light,
  dark: Dark,
};
export const decorators = [
  (Story, { globals: { theme } }) => {
    const Theme = themes[theme];

    return (
      <Router>
        <Theme>
          <Story />
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
};
