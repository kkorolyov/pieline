import { Button } from "@material-ui/core";
import { Story } from "@storybook/react";
import React from "react";
import { Form, FormProps, TextField } from "./Wrapper";

export default { title: "Wrapper/Form", component: Form };

export const Basic: Story<FormProps> = (args) => (
  <Form {...args}>
    <TextField onChange={() => {}} label="First Field" />
    <TextField onChange={() => {}} label="Second Field" />
    <Button type="submit">Submit</Button>
  </Form>
);
