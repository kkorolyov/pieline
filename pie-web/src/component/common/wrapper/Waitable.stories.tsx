import { Story } from "@storybook/react";
import React from "react";
import Waitable, { WaitableProps } from "./Waitable";

export default {
  title: "Common/Wrapper/Waitable",
  component: Waitable,
};

const Template: Story<WaitableProps> = (args) => (
  <Waitable {...args}>
    <h3>Real stuff</h3>
    <p>Goes here</p>
  </Waitable>
);

export const Ready = Template.bind({});
Ready.args = { waiting: false };

export const Waiting = Template.bind({});
Waiting.args = { waiting: true };
