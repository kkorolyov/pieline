import { CircularProgress } from "@material-ui/core";
import React from "react";

export type WaitableProps = {
  /**
   * Whether component is inactive and waiting.
   */
  waiting?: boolean;
  /**
   * Control children.
   */
  children: React.ReactNode;
};
/**
 * Renders a waiting indicator while waiting, otherwise renders `childern`.
 */
const Waitable = ({ waiting = false, children }: WaitableProps) => (
  <>{waiting ? <CircularProgress /> : children}</>
);
export default Waitable;
