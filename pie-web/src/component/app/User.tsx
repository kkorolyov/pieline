import { Container } from "@material-ui/core";
import Profile from "component/user/Profile";
import { UserContext } from "context";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

const User = () => {
  const { id } = useContext(UserContext);

  return (
    <Container maxWidth="xl">
      {id ? <Profile id={id} /> : <Redirect to="/" />}
    </Container>
  );
};
export default User;
