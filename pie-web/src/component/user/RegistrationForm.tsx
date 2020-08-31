import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { register } from "api";
import Form from "component/common/control/Form";
import Submit from "component/common/control/Submit";
import TextField from "component/common/control/TextField";
import { i18nContext } from "context";
import { useExecutor } from "hooks";
import React, { useContext, useState } from "react";

/**
 * Form which registers given user information and applies returned token to user context.
 */
const RegistrationForm = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const i18n = useContext(i18nContext);

  const registerExecutor = useExecutor(register);

  return (
    <Form onSubmit={() => registerExecutor.execute(user, pass)}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        {registerExecutor.error && <Alert>{registerExecutor.error}</Alert>}
        <Grid container direction="column" item xs={2}>
          <TextField
            variant="outlined"
            required
            label={i18n.username}
            value={user}
            onChange={setUser}
          />
          <TextField
            variant="outlined"
            required
            type="password"
            label={i18n.password}
            value={pass}
            onChange={setPass}
          />
        </Grid>

        <Grid item>
          <Submit waiting={registerExecutor.waiting}>{i18n.register}</Submit>
        </Grid>
      </Grid>
    </Form>
  );
};
export default RegistrationForm;
