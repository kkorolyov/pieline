import { Story } from "@storybook/react";
import React from "react";
import Submit, { SubmitProps } from "./Submit";

export default {
  title: "Common/Control/Submit",
  component: Submit,
};

const Template: Story<SubmitProps> = (args) => <Submit {...args} >Submit Me</Submit>;

export const Ready = Template.bind({});
Ready.args = { waiting: false };

export const Waiting = Template.bind({});
Waiting.args = { waiting: true };
