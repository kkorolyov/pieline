import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dark } from "../common/components";
import Nav from "../nav/Nav";
import Home from "./Home";
import User from "./User";
import { UserContext } from "../common/context";

function App() {
  const [id, setId] = useState<string | null>(null);

  return (
    <Router>
      <Dark>
        <UserContext.Provider value={{ id, setId }}>
          <Nav title="PieLine" />
        </UserContext.Provider>

        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Dark>
    </Router>
  );
}

export default App;
