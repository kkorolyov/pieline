import Theme, { Palette } from "component/common/Theme";
import Waitable from "component/common/wrapper/Waitable";
import Nav from "component/nav/Nav";
import {
  ApiContext,
  AuthContext,
  I18nContext,
  ThemeConfigContext
} from "context";
import { i18nDefault } from "context/i18n";
import { I18n_Locale } from "gql";
import { useArgs, useExecutor, useResult } from "hooks";
import React, { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Debug from "./Debug";
import Explore from "./Explore";
import Home from "./Home";
import Market from "./Market";
import User from "./User";

/**
 * Main application component.
 */
const Main = () => {
  const [id, setId] = useState<string>();
  const [palette, setPalette] = useState<Palette>(Palette.DARK);
  const [locale, setLocale] = useState<I18n_Locale>(I18n_Locale.EnUs);
  const [i18nPack, setI18nPack] = useState({});

  const { getI18n } = useContext(ApiContext);
  const i18nGetter = useExecutor(getI18n);

  useResult(i18nGetter, setI18nPack);
  useArgs(i18nGetter, locale);

  return (
    <Theme palette={palette} locale={locale}>
      <ThemeConfigContext.Provider
        value={{ palette, setPalette, locale, setLocale }}
      >
        <I18nContext.Provider value={{ ...i18nDefault, ...i18nPack }}>
          <AuthContext.Provider value={{ id, setId }}>
            <Waitable waiting={i18nGetter.waiting}>
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
                {process.env.NODE_ENV === "development" && (
                  <Route path="/debug">
                    <Debug />
                  </Route>
                )}
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Waitable>
          </AuthContext.Provider>
        </I18nContext.Provider>
      </ThemeConfigContext.Provider>
    </Theme>
  );
};
export default Main;
