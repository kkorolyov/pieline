import * as api from "api";
import Main from "component/app/Main";
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
        <Main />
      </Router>
    </ApiContext.Provider>
  );
};
export default App;
