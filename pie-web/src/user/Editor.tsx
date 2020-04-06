import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "../common/components";

export type State = {
  displayName: string;
  email: string;
};

type DisplayProps = State;
export const Display = ({ displayName, email }: DisplayProps) => (
  <Grid container direction="column">
    <Typography variant="h4">{displayName}</Typography>
    <Typography variant="h5">{email}</Typography>
  </Grid>
);

type EditorProps = State & {
  onSubmit: (state: State) => void;
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </form>
  );
};
