import { addDecorator } from "@storybook/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Dark } from "../src/common/components";
import { i18nContext } from "../src/common/context";
import {en} from "../src/common/api"

addDecorator((storyFn) => (
  <Router>
    <i18nContext.Provider value={en}>
      <Dark>{storyFn()}</Dark>
    </i18nContext.Provider>
  </Router>
));
