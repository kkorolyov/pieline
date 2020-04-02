import React from "react";
import styles from "./Project.module.scss";
import Button from "@material-ui/core/Button";

function Project() {
  return (
    <>
      <h1 className={styles.title}>This be a project</h1>
      <Button variant="contained" color="secondary">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </>
  );
}

export default Project;
