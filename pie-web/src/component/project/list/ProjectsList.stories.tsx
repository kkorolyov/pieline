import { Story } from "@storybook/react";
import ProjectsList, { ProjectsListProps } from "./ProjectsList";

export default {
  title: "Project/List",
  component: ProjectsList,
  args: {
    value: [],
    onCreate: () => {},
    onFilter: () => {},
  },
};

const Template: Story<ProjectsListProps> = (props) => (
  <ProjectsList {...props} />
);

export const Smol = Template.bind({});
Smol.args = {
  limit: 5,
};

export const BigBoi = Template.bind({});
BigBoi.args = {
  limit: 50,
};
