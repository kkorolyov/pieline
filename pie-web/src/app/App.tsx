import { ApolloProvider } from "@apollo/react-hooks";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { client } from "../common/api/graphql/client";
import { Dark } from "../common/components";
import { UserContext } from "../common/context";
import Nav from "../nav/Nav";
import Home from "./Home";
import User from "./User";

function App() {
  const [id, setId] = useState<string | null>(null);

  return (
    <Router>
      <Dark>
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ id, setId }}>
            <Nav title="PieLine" />

            <Switch>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </UserContext.Provider>
        </ApolloProvider>
      </Dark>
    </Router>
  );
}

export default App;
