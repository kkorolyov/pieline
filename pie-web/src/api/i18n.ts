import { I18n_Locale } from "generated/graphql";
import { client } from "./graphql/client";
import { localeI18n } from "./graphql/queries";

/**
 * Retrieves i18n for given locale.
 * @param locale locale to get i18n pack for
 * @returns associated i18n pack
 */
export const getI18n = async (
  locale: I18n_Locale
): Promise<{ [key: string]: string }> => {
  const { data } = await client.query({
    query: localeI18n,
    variables: {
      locale,
    },
  });
  const { i18n } = data;

  return i18n.value.reduce(
    (
      result: { [key: string]: string },
      { key, value }: { key: string; value: string }
    ) => {
      result[key] = value;
      return result;
    },
    {}
  );
};