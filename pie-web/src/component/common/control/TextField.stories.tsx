import { Story } from "@storybook/react";
import React from "react";
import TextField, { TextFieldProps } from "./TextField";

export default { title: "Common/Control/TextField", component: TextField };

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Basic = Template.bind({});

export const Controlled = Template.bind({});
Controlled.args = { value: "Start Text" };

export const Labeled = Template.bind({});
Labeled.args = { label: "Field Label" };
