import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { getProfile, saveProfile } from "../common/api";
import { useExecutor, useArgs, useResult } from "../common/hooks";
import { User_Details } from "../generated/graphql";
import { Display, Editor } from "./Editor";

type ProfileProps = {
  id: string;
};
const Profile = ({ id }: ProfileProps) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setEditing] = useState(false);

  const applyState = ({ displayName, email }: User_Details) => {
    displayName && setDisplayName(displayName);
    email && setEmail(email);
  };
  const getExecutor = useExecutor(getProfile);
  const saveExecutor = useExecutor((details) => saveProfile(id, details));

  // Apply state on init and update
  useResult(getExecutor, applyState);
  useResult(saveExecutor, (state) => {
    applyState(state);
    setEditing(false);
  });

  // Init
  useArgs(getExecutor, id);

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
