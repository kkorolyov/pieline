import { Button, Grid, GridProps } from "@material-ui/core";
import { Story } from "@storybook/react";
import React, { ReactNode } from "react";
import Form, { FormProps } from "./Form";
import TextField from "./TextField";

export default { title: "Common/Control/Form", component: Form };

const Wrapper = ({ children }: { children: ReactNode }) => (
  <>
    {React.Children.map(children, (child) => (
      <Grid item xs={1}>
        {child}
      </Grid>
    ))}
  </>
);

const Template: Story<FormProps & GridProps> = ({ direction, ...props }) => (
  <Form {...props}>
    <Grid container spacing={2} direction={direction}>
      <Wrapper>
        <TextField onChange={() => {}} label="First Field" />
        <TextField onChange={() => {}} label="Second Field" />
        <Button type="submit">Submit</Button>
      </Wrapper>
    </Grid>
  </Form>
);

export const Row = Template.bind({});
Row.args = {
  direction: "row",
};

export const Column = Template.bind({});
Column.args = {
  direction: "column",
};
