import { Button, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Link from "component/common/control/Link";
import Waitable from "component/common/wrapper/Waitable";
import { ApiContext, I18nContext } from "context";
import { useExecutor, useResult } from "hooks";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Filters from "./Filters";

const Layout = styled(Paper)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "filters actions"
    "results results";
`;
const AreaFilters = styled(Filters)`
  grid-area: filters;
`;
const AreaActions = styled.span`
  grid-area: actions;
`;
const AreaResults = styled(List)`
  grid-area: results;
  overflow: auto;
  max-height: 500px;
`;

export type ProjectsListProps = {
  /**
   * Number of projects to load per page.
   */
  limit: number;
};
/**
 * Searchable projects list.
 */
const ProjectsList = ({ limit }: ProjectsListProps) => {
  const i18n = useContext(I18nContext);
  const { searchProjects } = useContext(ApiContext);
  const searchExecutor = useExecutor(searchProjects);

  const history = useHistory();

  const [token, setToken] = useState<string | null>();

  useResult(searchExecutor, ({ token: resToken }) => {
    setToken(resToken);
  });

  return (
    <Layout>
      <AreaFilters
        onChange={({ titlePattern }) => {
          searchExecutor.execute({
            titlePattern,
            chunk: {
              token,
              size: limit,
            },
          });
        }}
      />
      <AreaActions>
        <Button
          title={i18n.helpCreateProject}
          onClick={() => history.push("/projects/new")}
        >
          <Add />
        </Button>
      </AreaActions>

      <AreaResults>
        <Waitable waiting={searchExecutor.waiting}>
          {searchExecutor.result?.result?.map((project) => (
            <ListItem
              key={project?.id?.value}
              button
              component={Link}
              to={`/projects/${project?.id?.value}`}
            >
              <ListItemText
                primary={project?.details?.title}
                secondary={project?.details?.description}
              />
            </ListItem>
          ))}
        </Waitable>
      </AreaResults>
    </Layout>
  );
};
export default ProjectsList;
