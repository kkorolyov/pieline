import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Dark } from "../src/component/common";

export const decorators = [
  (Story) => (
    <Router>
      <Dark>
        <Story />
      </Dark>
    </Router>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
