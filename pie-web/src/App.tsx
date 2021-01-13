import * as api from "api";
import Root from "component/app/Root";
import { ApiContext } from "context";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Application entry.
 */
const App = () => {
  return (
    <ApiContext.Provider value={api}>
      <Router>
        <Root />
      </Router>
    </ApiContext.Provider>
  );
};
export default App;
