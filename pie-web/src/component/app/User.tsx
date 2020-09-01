import { Container } from "@material-ui/core";
import Profile from "component/user/Profile";
import { UserContext } from "context";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

const User = () => {
  const { token } = useContext(UserContext);

  return (
    <Container maxWidth="xl">
      {token ? <Profile id={token} /> : <Redirect to="/" />}
    </Container>
  );
};
export default User;
