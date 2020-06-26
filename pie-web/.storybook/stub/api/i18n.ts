import { i18nPack, Lang } from "../../../src/common/i18n";
import en from "../../../src/common/i18n/en.json";

export const geti18n = async (lang: Lang): Promise<i18nPack> => en;
