import { addDecorator } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Dark } from "../src/common/components";

addDecorator((storyFn) => (
  <Router>
    <Dark>{storyFn()}</Dark>
  </Router>
));
