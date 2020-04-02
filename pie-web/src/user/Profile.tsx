import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { TextField } from "../common/components";
import { useExecutor, useInitializer } from "../common/hooks";
import { getProfile, saveProfile } from "../common/api";

type State = {
  displayName: string;
  email: string;
};

type DisplayProps = State;
const Display = ({ displayName, email }: DisplayProps) => (
  <Grid container direction="column">
    <Typography variant="h4">{displayName}</Typography>
    <Typography variant="h5">{email}</Typography>
  </Grid>
);

type EditorProps = State & {
  onSubmit: (arg0: State) => void;
  waiting: boolean;
};
const Editor = ({
  displayName: initDisplayName,
  email: initEmail,
  onSubmit,
  waiting
}: EditorProps) => {
  const [displayName, setDisplayName] = useState(initDisplayName);
  const [email, setEmail] = useState(initEmail);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ displayName, email });
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid container direction="column" item xs={3}>
          <TextField
            variant="outlined"
            label="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

type ProfileProps = {
  id: string;
};
const Profile = ({ id }: ProfileProps) => {
  const [displayName, setDisplayName] = useState("none");
  const [email, setEmail] = useState("none");

  const [isEditing, setEditing] = useState(false);

  const applyState = ({ displayName, email }: State) => {
    setDisplayName(displayName);
    setEmail(email);
  };
  const [waitingInit] = useInitializer(() => getProfile(id), applyState);
  const [saveExecutor, waitingSave, errorSave] = useExecutor(
    saveProfile,
    (state: State) => {
      applyState(state);
      setEditing(false);
    }
  );

  return waitingInit ? (
    <CircularProgress />
  ) : (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Display displayName={displayName} email={email} />
      </Grid>

      {!isEditing ? (
        <Grid item xs={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </Button>
        </Grid>
      ) : (
        <Grid item>
          <Editor
            displayName={displayName}
            email={email}
            onSubmit={saveExecutor}
            waiting={waitingSave}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default Profile;
