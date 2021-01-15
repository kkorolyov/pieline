import { AuthContext } from "context";
import { useContext } from "react";
import AuthBlock from "./AuthBlock";

export default { title: "Common/Wrapper/AuthBlock", component: AuthBlock };

const Content = () => {
  const { id } = useContext(AuthContext);
  return (
    <AuthBlock>
      <p>Authenticated as [{id}]</p>
    </AuthBlock>
  );
};

export const Authenticated = () => (
  <AuthContext.Provider value={{ id: "authId", setId: () => {} }}>
    <Content />
  </AuthContext.Provider>
);
export const Unauthenticated = () => <Content />;
