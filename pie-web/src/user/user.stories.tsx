import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import { Display, Editor } from "./Editor";
import Profile from "./Profile";

export default { title: "User" };

export const profileDisplay = () => (
  <Display displayName="Unga Bunga" email="bunga4@unga.goonga" />
);

const ProfileEditor = () => {
  const [saveMessage, setSaveMessage] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);

  return (
    <>
      <Editor
        displayName="Changeme"
        email="Metoo"
        onSubmit={(state) => {
          setSaveMessage(`Saved with state: ${JSON.stringify(state)}`);
          setSaveOpen(true);
        }}
      />
      <Snackbar
        message={saveMessage}
        open={saveOpen}
        autoHideDuration={1000}
        onClose={() => setSaveOpen(false)}
      />
    </>
  );
};
export const profileEditor = () => <ProfileEditor />;

export const profileContainer = () => <Profile id="dumbdumb" />;
