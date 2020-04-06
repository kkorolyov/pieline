import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { getProfile, saveProfile } from "../common/api";
import { useExecutor, useInitial, useResult } from "../common/hooks";
import { Display, Editor, State } from "./Editor";

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
  const getExecutor = useExecutor(getProfile);
  const saveExecutor = useExecutor(saveProfile);

  // Apply state on init and update
  useResult(getExecutor, applyState);
  useResult(saveExecutor, (state: State) => {
    applyState(state);
    setEditing(false);
  });

  // Init
  useInitial(getExecutor, id);

  return (
    <Grid container direction="column" spacing={2}>
      {getExecutor.waiting ? (
        <CircularProgress />
      ) : (
        <>
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
                onSubmit={saveExecutor.execute}
                waiting={saveExecutor.waiting}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
export default Profile;
