import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Form, TextField } from "../common/components";
import { User_Details } from "../generated/graphql";

type DisplayProps = User_Details;
export const Display = ({ displayName, email }: DisplayProps) => (
  <Grid container direction="column">
    <Typography variant="h4">{displayName}</Typography>
    <Typography variant="h5">{email}</Typography>
  </Grid>
);

type EditorProps = User_Details & {
  onSubmit: (details: User_Details) => void;
  waiting?: boolean;
};
export const Editor = ({
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
        <Grid container direction="column" item xs={3}>
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

        <Grid item xs={1}>
          {waiting ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Form>
  );
};
