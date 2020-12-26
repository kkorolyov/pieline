import { Story } from "@storybook/react";
import ProjectHeader, { ProjectHeaderProps } from "./ProjectHeader";

export default {
  title: "Project/ProjectHeader",
  component: ProjectHeader,
  args: {
    title: "My Dumb Project",
  },
};

const Template: Story<ProjectHeaderProps> = (props) => (
  <ProjectHeader {...props} />
);

export const Basic = Template.bind({});

export const Configurable = Template.bind({});
Configurable.args = {
  ...Template.args,
  configurable: true,
};
