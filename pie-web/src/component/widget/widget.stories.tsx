import { Typography } from "@material-ui/core";
import { Story } from "@storybook/react";
import React from "react";
import Widget, { WidgetProps } from "./Widget";

export default { title: "Widget/Widget", component: Widget };

const Template: Story<WidgetProps> = (args) => (
  <Widget {...args}>
    <Typography variant="h4">Widget content</Typography>
  </Widget>
);

export const Basic = Template.bind({});
Basic.args = {
  title: "Basic",
};
export const WithMore = Template.bind({});
WithMore.args = {
  title: "With More",
  location: "/more",
};
