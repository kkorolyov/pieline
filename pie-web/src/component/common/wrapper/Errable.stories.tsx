import { Story } from "@storybook/react";
import Errable, { ErrableProps } from "./Errable";

export default {
  title: "Common/Wrapper/Errable",
  component: Errable,
};

const Template: Story<ErrableProps> = (args) => (
  <Errable {...args}>
    <h3>Real stuff</h3>
    <p>Goes here</p>
  </Errable>
);

export const DefaultText = Template.bind({});

export const CustomText = Template.bind({});
CustomText.args = { text: "custom error message" };
