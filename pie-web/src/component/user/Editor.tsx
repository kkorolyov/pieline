import { Button, Grid } from "@material-ui/core";
import Form from "component/common/control/Form";
import TextField from "component/common/control/TextField";
import Waitable from "component/common/wrapper/Waitable";
import { User_Details } from "gql";
import React, { useState } from "react";

export type EditorProps = User_Details & {
  onSubmit: (details: User_Details) => void;
  waiting?: boolean;
};
const Editor = ({
  displayName: initDisplayName,
  email: initEmail,
  onSubmit,
  waiting = false,
}: EditorProps) => {
  const [displayName, setDisplayName] = useState(initDisplayName);
  const [email, setEmail] = useState(initEmail);

  return (
    <Form
      onSubmit={() => {
        onSubmit({ displayName, email });
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid container direction="column" item xs={2}>
          <TextField
            required
            variant="outlined"
            label="Display Name"
            value={displayName}
            onChange={setDisplayName}
          />
          <TextField
            required
            variant="outlined"
            label="Email"
            value={email}
            onChange={setEmail}
          />
        </Grid>

        <Grid item>
          <Waitable waiting={waiting}>
            <Button type="submit" variant="contained">Save</Button>
          </Waitable>
        </Grid>
      </Grid>
    </Form>
  );
};
export default Editor;
