import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

export type SubmitProps = {
  /**
   * Whether submission result is still pending and no new submissions are currently accepted.
   */
  waiting?: boolean;
  /**
   * Control children.
   */
  children: React.ReactNode;
};
/**
 * A submission control that is disabled while waiting.
 */
const Submit = ({ waiting = false, children }: SubmitProps) => (
  <>
    {waiting ? (
      <CircularProgress />
    ) : (
      <Button type="submit" variant="contained">
        {children}
      </Button>
    )}
  </>
);
export default Submit;
