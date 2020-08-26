import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { geti18n } from "../../api";
import { Dark } from "../common";
import { i18nContext, i18nDefault, UserContext } from "../../context";
import { useArgs, useExecutor, useResult } from "../../hooks";
import { I18n_Locale } from "../../generated/graphql";
import Nav from "../nav/Nav";
import Explore from "./Explore";
import Home from "./Home";
import Market from "./Market";
import User from "./User";

/**
 * Root application component.
 */
function App() {
  const [id, setId] = useState<string | null>(null);
  // TODO Add lang selector
  const [locale, setLocale] = useState<I18n_Locale>(I18n_Locale.EnUs);
  const [i18nPack, seti18nPack] = useState(i18nDefault);

  const i18nGetter = useExecutor(geti18n);
  useResult(i18nGetter, seti18nPack);
  useArgs(i18nGetter, locale);

  return (
    <Router>
      <Dark>
        <i18nContext.Provider value={i18nPack}>
          <UserContext.Provider value={{ id, setId }}>
            {i18nGetter.waiting ? (
              <CircularProgress />
            ) : (
              <>
                <Nav />

                <Switch>
                  <Route path="/explore">
                    <Explore />
                  </Route>
                  <Route path="/market">
                    <Market />
                  </Route>
                  <Route path="/user">
                    <User />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </>
            )}
          </UserContext.Provider>
        </i18nContext.Provider>
      </Dark>
    </Router>
  );
}

export default App;
