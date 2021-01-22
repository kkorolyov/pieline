import { Button, ButtonGroup, Grid, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Form from "component/common/control/Form";
import TextField from "component/common/control/TextField";
import Errable from "component/common/wrapper/Errable";
import Waitable from "component/common/wrapper/Waitable";
import { ApiContext, AuthContext, I18nContext } from "context";
import { useExecutor, useResult } from "hooks";
import { useContext, useState } from "react";

type BaseBarProps = {
  action: (user: string, pass: string) => Promise<string>;
  submitLabel?: string;
  errorLabel?: string;
  onBack: () => void;
};
const BaseBar = ({ action, submitLabel, errorLabel, onBack }: BaseBarProps) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { setId } = useContext(AuthContext);
  const i18n = useContext(I18nContext);

  const executor = useExecutor(action);

  useResult(executor, setId);

  return (
    <Form
      onSubmit={() => {
        executor.execute(user, pass);
      }}
    >
      <Grid container spacing={1} alignItems="center" wrap="nowrap">
        <IconButton onClick={() => onBack()}>
          <ArrowBack />
        </IconButton>
        <Errable error={executor.error} text={errorLabel} />
        <Grid item>
          <TextField
            variant="filled"
            size="small"
            label={i18n.username}
            required
            value={user}
            onChange={setUser}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="filled"
            size="small"
            label={i18n.password}
            type="password"
            required
            value={pass}
            onChange={setPass}
          />
        </Grid>

        <Grid item>
          <Waitable waiting={executor.waiting}>
            <Button type="submit" variant="contained">
              {submitLabel}
            </Button>
          </Waitable>
        </Grid>
      </Grid>
    </Form>
  );
};

/**
 * Medium for user authentication or preliminary registration.
 */
const AuthBar = () => {
  const [option, setOption] = useState<JSX.Element>();

  const { authenticate, register } = useContext(ApiContext);
  const i18n = useContext(I18nContext);

  return (
    option || (
      <ButtonGroup variant="contained">
        <Button
          onClick={() => {
            setOption(
              <BaseBar
                action={authenticate}
                submitLabel={i18n.logIn}
                errorLabel={i18n.errorLogIn}
                onBack={() => setOption(undefined)}
              />
            );
          }}
        >
          {i18n.logIn}
        </Button>
        <Button
          onClick={() => {
            setOption(
              <BaseBar
                action={register}
                submitLabel={i18n.register}
                errorLabel={i18n.errorRegister}
                onBack={() => setOption(undefined)}
              />
            );
          }}
        >
          {i18n.register}
        </Button>
      </ButtonGroup>
    )
  );
};
export default AuthBar;
