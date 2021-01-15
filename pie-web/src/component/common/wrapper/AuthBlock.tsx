import AuthBar from "component/nav/AuthBar";
import { AuthContext } from "context";
import { useContext } from "react";

export type AuthBlockProps = {
  /**	Children to block behind auth */
  children: React.ReactNode;
};
/**
 * Displays `children` if current user is authenticated, else requests authentication.
 */
const AuthBlock = ({ children }: AuthBlockProps) => {
  const { id } = useContext(AuthContext);

  return <>{id ? children : <AuthBar />}</>;
};
export default AuthBlock;
