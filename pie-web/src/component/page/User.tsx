import { Container } from "@material-ui/core";
import AuthBlock from "component/common/wrapper/AuthBlock";
import Profile from "component/user/Profile";
import { AuthContext } from "context";
import React, { useContext } from "react";

const User = () => {
  const { id } = useContext(AuthContext);

  return (
    <Container maxWidth="xl">
      <AuthBlock>
        <Profile id={id!!} />
      </AuthBlock>
    </Container>
  );
};
export default User;
