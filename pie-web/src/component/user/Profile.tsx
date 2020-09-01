import { Button, Grid } from "@material-ui/core";
import Waitable from "component/common/wrapper/Waitable";
import { ApiContext } from "context";
import { User_Details } from "generated/graphql";
import { useArgs, useExecutor, useResult } from "hooks";
import React, { useContext, useState } from "react";
import Display from "./Display";
import Editor from "./Editor";

export type ProfileProps = {
  id: string;
};
const Profile = ({ id }: ProfileProps) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setEditing] = useState(false);

  const { getProfile, saveProfile } = useContext(ApiContext);

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
      <Waitable waiting={getExecutor.waiting}>
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
      </Waitable>
    </Grid>
  );
};
export default Profile;
