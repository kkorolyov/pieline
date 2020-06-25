import { i18nPack, Lang } from "../i18n";

// TODO replace with retrieved pack
export const en = {
  title: "PieLine",
  explore: "Explore",
  market: "Market",
};

/**
 * Retrieves i18n for given language.
 * @param lang language to get i18n pack for
 * @returns associated i18n pack
 */
export const geti18n = async (lang: Lang): Promise<i18nPack> => en;
