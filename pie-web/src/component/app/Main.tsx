import { CircularProgress } from "@material-ui/core";
import Nav from "component/nav/Nav";
import { ApiContext, I18nContext, UserContext } from "context";
import { i18nDefault } from "context/i18n";
import { I18n_Locale } from "generated/graphql";
import { useArgs, useExecutor, useResult } from "hooks";
import React, { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Explore from "./Explore";
import Home from "./Home";
import Market from "./Market";
import User from "./User";

/**
 * Main application component.
 */
const Main = () => {
  const [id, setId] = useState<string | null>(null);
  // TODO Add lang selector
  const [locale, setLocale] = useState<I18n_Locale>(I18n_Locale.EnUs);
  const [i18nPack, setI18nPack] = useState(i18nDefault);

  const { getI18n } = useContext(ApiContext);
  const i18nGetter = useExecutor(getI18n);
  useResult(i18nGetter, setI18nPack);
  useArgs(i18nGetter, locale);

  return (
    <I18nContext.Provider value={i18nPack}>
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
    </I18nContext.Provider>
  );
};
export default Main;
