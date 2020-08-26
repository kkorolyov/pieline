import { Container } from "@material-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context";
import Profile from "../user/Profile";

const User = () => {
  const { id } = useContext(UserContext);

  return (
    <Container maxWidth="xl">
      {id ? <Profile id={id} /> : <Redirect to="/" />}
    </Container>
  );
};
export default User;
