import { Container, Grid, Typography } from "@material-ui/core";
import { GATE, getToken } from "api/info";
import Waitable from "component/common/wrapper/Waitable";
import { AuthContext } from "context";
import { useArgs, useExecutor } from "hooks";
import React, { useContext } from "react";

const getJwt = async (id?: string): Promise<string | undefined> =>
  id &&
  (await (
    await fetch(`${GATE}/jwt`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "text/plain",
      },
    })
  ).text());
const JwtTest = () => {
  const { id } = useContext(AuthContext);

  const jwtExecutor = useExecutor(getJwt);
  const { result, waiting } = jwtExecutor;
  useArgs(jwtExecutor, id);

  return (
    <Waitable waiting={waiting}>
      <Typography
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {result || "Authenticate to get JWT information"}
      </Typography>
    </Waitable>
  );
};

const Debug = () => (
  <Container maxWidth="xl">
    <Grid container>
      <JwtTest />
    </Grid>
  </Container>
);
export default Debug;
