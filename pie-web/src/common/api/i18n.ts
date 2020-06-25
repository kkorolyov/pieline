import { i18nPack, Lang } from "../i18n";
import en from "../i18n/en.json";

/**
 * Retrieves i18n for given language.
 * @param lang language to get i18n pack for
 * @returns associated i18n pack
 */
export const geti18n = async (lang: Lang): Promise<i18nPack> => en;
