import { Container } from "@material-ui/core";
import Profile from "component/user/Profile";
import { AuthContext } from "context";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

const User = () => {
  const { id } = useContext(AuthContext);

  return (
    <Container maxWidth="xl">
      {id ? <Profile id={id} /> : <Redirect to="/" />}
    </Container>
  );
};
export default User;
