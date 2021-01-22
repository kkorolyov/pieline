import { Story } from "@storybook/react";
import Waitable, { WaitableProps } from "./Waitable";

export default {
  title: "Common/Wrapper/Waitable",
  component: Waitable,
};

export const Basic: Story<WaitableProps> = (args) => (
  <Waitable {...args}>
    <h3>Real stuff</h3>
    <p>Goes here</p>
  </Waitable>
);
