import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import Waitable from "component/common/wrapper/Waitable";
import { ApiContext, AuthContext } from "context";
import { useArgs, useExecutor } from "hooks";
import React, { useContext } from "react";

const JwtTest = () => {
  const { id } = useContext(AuthContext);
  const { jwt } = useContext(ApiContext);

  const jwtExecutor = useExecutor(jwt);
  const { result, waiting } = jwtExecutor;

  useArgs(jwtExecutor, id);

  return (
    <Waitable waiting={waiting}>
      {(result && (
        <List>
          {result.claims?.map((claim) => (
            <ListItem key={claim?.key}>
              <ListItemText primary={claim?.key} secondary={claim?.value} />
            </ListItem>
          ))}
        </List>
      )) || (
        <Typography
          style={{
            whiteSpace: "pre-line",
          }}
        >
          Authenticate to get JWT information
        </Typography>
      )}
    </Waitable>
  );
};

const Debug = () => (
  <Container maxWidth="xl">
    <Grid container>
      <JwtTest />
    </Grid>
  </Container>
);
export default Debug;
