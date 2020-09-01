import * as api from "api";
import Main from "component/app/Main";
import { Dark } from "component/common/Theme";
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
        <Dark>
          <Main />
        </Dark>
      </Router>
    </ApiContext.Provider>
  );
};
export default App;
