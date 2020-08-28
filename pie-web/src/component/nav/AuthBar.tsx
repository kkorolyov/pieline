import { Button, CircularProgress, Grid } from "@material-ui/core";
import { authenticate } from "api";
import Form from "component/common/control/Form";
import TextField from "component/common/control/TextField";
import { UserContext } from "context";
import { useExecutor, useResult } from "hooks";
import React, { useContext, useState } from "react";

/**
 * Medium for user authentication.
 */
const AuthBar = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setId } = useContext(UserContext);

  const authExecutor = useExecutor(authenticate);
  useResult(authExecutor, setId);

  return (
    <Form
      onSubmit={() => {
        authExecutor.execute(userName, password);
      }}
    >
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="center"
        wrap="nowrap"
      >
        <Grid item>
          <TextField
            variant="filled"
            size="small"
            label="Username"
            required
            value={userName}
            onChange={setUserName}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="filled"
            size="small"
            label="Password"
            type="password"
            required
            value={password}
            onChange={setPassword}
          />
        </Grid>

        <Grid item>
          {authExecutor.waiting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button variant="contained" type="submit">
              Log In
            </Button>
          )}
        </Grid>
      </Grid>
    </Form>
  );
};
export default AuthBar;
