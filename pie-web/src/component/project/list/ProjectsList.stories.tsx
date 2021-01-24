import { Story } from "@storybook/react";
import { wrapId } from "api/graphql/client";
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

export const Empty = Template.bind({});

export const Full = Template.bind({});
Full.args = {
  value: [
    {
      id: wrapId("wun"),
      details: {
        title: "Project wun",
        description: "The first",
      },
    },
    {
      id: wrapId("tu"),
      details: {
        title: "Project tu",
        description: "The latter",
      },
    },
    {
      id: wrapId("tree"),
      details: {
        title: "Project tree",
        description: "The final",
      },
    },
  ],
};
