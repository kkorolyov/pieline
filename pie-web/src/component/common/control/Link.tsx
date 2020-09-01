import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import styled from "styled-components";

export type LinkProps = RouterLinkProps;
/**
 * Restyled `react-router` `link` component.
 */
const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: inherit;
`;
export default Link;
