import { i18nPack, Lang } from "../../../src/common/i18n";

export const en = {
  title: "PieLine",
  explore: "Explore",
  market: "Market",
};

export const geti18n = async (lang: Lang): Promise<i18nPack> => en;
