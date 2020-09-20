import { Palette } from "component/common/Theme";
import { I18n_Locale } from "gql";
import { createContext } from "react";

export type ThemeConfigContextProps = {
  /** Current color palette */
  palette?: Palette;
  /** Color palette setter */
  setPalette: (palette: Palette) => void;

  /** Current locale */
  locale?: I18n_Locale;
  /** Locale setter */
  setLocale: (locale: I18n_Locale) => void;
};
/**
 * Theme configuration.
 */
export default createContext({
  setPalette: () => {},
  setLocale: () => {},
} as ThemeConfigContextProps);
