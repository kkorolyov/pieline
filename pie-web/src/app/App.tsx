import { ApolloProvider } from "@apollo/react-hooks";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { en, geti18n } from "../common/api";
import { client } from "../common/api/graphql/client";
import { Dark } from "../common/components";
import { i18nContext, UserContext } from "../common/context";
import { useArgs, useExecutor, useResult } from "../common/hooks";
import { Lang } from "../common/i18n";
import Nav from "../nav/Nav";
import Home from "./Home";
import User from "./User";

function App() {
  const [id, setId] = useState<string | null>(null);
  // TODO Add lang selector
  const [lang, setLang] = useState<Lang>(Lang.EN);
  const [i18nPack, seti18nPack] = useState(en);

  const i18nGetter = useExecutor(geti18n);
  useResult(i18nGetter, seti18nPack);
  useArgs(i18nGetter, lang);

  return (
    <Router>
      <Dark>
        <ApolloProvider client={client}>
          <i18nContext.Provider value={i18nPack}>
            <UserContext.Provider value={{ id, setId }}>
              <Nav />

              <Switch>
                <Route path="/user">
                  <User />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </UserContext.Provider>
          </i18nContext.Provider>
        </ApolloProvider>
      </Dark>
    </Router>
  );
}

export default App;
