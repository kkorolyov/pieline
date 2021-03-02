import { Theme } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import TextField from "component/common/control/TextField";
import { I18nContext } from "context";
import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  margin: 0 ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;

  display: grid;
  grid-template-areas: "icon filters";
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;
  align-items: center;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing(1)}px;
`;
const AreaIcon = styled(FilterList)`
  grid-area: icon;
`;
const AreaFilters = styled.div`
  grid-area: filters;
`;

export type FiltersProps = {
  /**
   * Invoked with value on filter change.
   */
  onChange: (value: { titlePattern: string }) => void;
};
/**
 * Filters projects.
 */
const Filters = ({ onChange }: FiltersProps) => {
  const i18n = useContext(I18nContext);

  const [titlePattern, setTitlePattern] = useState("");
  const value = useMemo(
    () => ({
      titlePattern,
    }),
    [titlePattern]
  );

  useEffect(() => {
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Layout>
      <AreaIcon titleAccess={i18n.helpFilterProjects} />
      <AreaFilters>
        <TextField
          value={titlePattern}
          onChange={setTitlePattern}
          label={i18n.filterTitle}
        />
      </AreaFilters>
    </Layout>
  );
};
export default Filters;
