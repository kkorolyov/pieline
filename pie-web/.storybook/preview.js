import { addDecorator } from "@storybook/react";
import React from "react";
import { Dark } from "../src/common/components";

addDecorator(storyFn => <Dark>{storyFn()}</Dark>);
