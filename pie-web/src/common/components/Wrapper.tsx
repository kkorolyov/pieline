import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    textfield: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

export const TextField = (props: TextFieldProps) => (
  <MuiTextField {...props} className={useStyles().textfield} />
);
