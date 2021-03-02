import { Story } from "@storybook/react";
import Filters, { FiltersProps } from "./Filters";

export default {
  title: "project/Filters",
  component: Filters,
};

export const Basic: Story<FiltersProps> = (props) => <Filters {...props} />;
