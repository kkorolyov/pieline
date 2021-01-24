import { Button, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { Add, FilterList } from "@material-ui/icons";
import Link from "component/common/control/Link";
import Menu from "component/common/control/Menu";
import { I18nContext } from "context";
import { Project_Project } from "gql";
import { useContext } from "react";
import styled from "styled-components";

const Layout = styled(Paper)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "filters actions"
    "results results";
`;
const Filters = styled.span`
  grid-area: "filters";
`;
const Actions = styled.span`
  grid-area: "actions";
`;
const Results = styled(List)`
  grid-area: "results";
`;

export type ProjectsListProps = {
  /**
   * Projects to display.
   */
  value: Project_Project[];

  /**
   * Callback invoked with requested projects filter.
   */
  // TODO This should be a complex protobuf message
  onFilter: (filter: string) => void;
  /**
   * Callback invoked on request to create new project.
   */
  onCreate: () => void;
};
const ProjectsList = ({ value, onFilter, onCreate }: ProjectsListProps) => {
  const i18n = useContext(I18nContext);

  return (
    <Layout>
      <Filters>
        <Menu
          anchor={
            <Button title={i18n.helpFilterProjects}>
              <FilterList />
            </Button>
          }
        >
          {/* TODO Filters */}
        </Menu>
      </Filters>
      <Actions>
        <Button title={i18n.helpCreateProject} onClick={() => onCreate()}>
          <Add />
        </Button>
      </Actions>

      <Results>
        {value.map(({ id, details }) => (
          <ListItem
            key={id?.value}
            button
            component={Link}
            to={`/projects/${id?.value}`}
          >
            <ListItemText
              primary={details?.title}
              secondary={details?.description}
            />
          </ListItem>
        ))}
      </Results>
    </Layout>
  );
};
export default ProjectsList;
