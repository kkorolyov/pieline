import { Alert } from "@material-ui/lab";

export type ErrableProps = {
  /**
   * Encountered error.
   */
  error: any;
  /**
   * Error text to display - defaults to `error` content.
   */
  text?: string;
  /**
   * Control children.
   */
  children: React.ReactNode;
};
/**
 * Renders error feedback if `error`, otherwise renders `childern`.
 */
const Errable = ({ error, text, children }: ErrableProps) =>
  error ? (
    <Alert severity="error">{text || JSON.stringify(error)}</Alert>
  ) : (
    <>{children}</>
  );
export default Errable;
