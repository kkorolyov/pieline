import { Story } from "@storybook/react";
import React from "react";
import Display, { DisplayProps } from "./Display";

export default { title: "User/Display", component: Display };

export const Basic: Story<DisplayProps> = (args) => (
  <Display displayName="Unga Bunga" email="bunga4@unga.goonga" {...args} />
);
