import { Theme, Typography, withTheme } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import Link from "component/common/control/Link";
import { I18nContext } from "context";
import { useContext } from "react";
import styled from "styled-components";

const Header = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.palette.primary.dark};
`);

export type ProjectHeaderProps = {
  /** Project's title */
  title: string;
  /** Whether to display settings options */
  configurable?: boolean;
};
/**
 * Project header with title and settings.
 */
const ProjectHeader = ({ title, configurable }: ProjectHeaderProps) => {
  const i18n = useContext(I18nContext);

  return (
    <Header>
      <Typography variant="h4">{title}</Typography>
      {configurable && (
        <Link to="settings">
          <Settings titleAccess={i18n.settings} fontSize="large" />
        </Link>
      )}
    </Header>
  );
};
export default ProjectHeader;
