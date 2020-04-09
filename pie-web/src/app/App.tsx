import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dark } from "../common/components";
import Nav from "../nav/Nav";
import Home from "./Home";
import User from "./User";

function App() {
  return (
    <Router>
      <Dark>
        <Nav title="PieLine" />

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
