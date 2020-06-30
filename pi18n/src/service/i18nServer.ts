import { sendUnaryData, ServerUnaryCall, status } from "grpc";
import { Ii18nServer } from "../generated/proto/internationalization_grpc_pb";
import { i18nPack, Locale, PackRequest } from "../generated/proto/internationalization_pb";
import en_us from "../resources/en_us.json";

const packs = {
  [Locale.EN_US]: en_us,
  [Locale.RU]: null,
};

class i18nServer implements Ii18nServer {
  get(call: ServerUnaryCall<PackRequest>, callback: sendUnaryData<i18nPack>) {
    const locale = call.request.getValue();

    const pack = packs[locale];
    if (pack) {
      const result = new i18nPack();
      for (const [key, val] of Object.entries(pack)) {
        result.getValueMap().set(key, val);
			}
			console.log("result = %O", result.getValueMap().toArray())
      callback(null, result);
    } else {
			console.error(`unsupported local: ${locale}`)
      callback(
        {
          name: "i18nError",
          message: "unsupported locale",
          details: `unsupported locale: ${locale}`,
          code: status.INVALID_ARGUMENT,
        },
        null
      );
    }
  }
}
export default i18nServer;
