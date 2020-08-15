import { sendUnaryData, ServerUnaryCall, status } from "grpc";
import { Tags } from "opentracing";
import { Ii18nServer } from "../generated/proto/internationalization_grpc_pb";
import {
  i18nPack,
  Locale,
  PackRequest,
} from "../generated/proto/internationalization_pb";
import en_us from "../resources/en_us.json";
import { startSpan } from "../tracing";

const packs = {
  [Locale.EN_US]: en_us,
  [Locale.RU]: null,
};

class i18nServer implements Ii18nServer {
  get(call: ServerUnaryCall<PackRequest>, callback: sendUnaryData<i18nPack>) {
    const span = startSpan("get-i18n");
    try {
      const locale = call.request.getValue();
      span.setTag("locale", locale);

      const pack = packs[locale];
      if (pack) {
        const result = new i18nPack();
        for (const [key, val] of Object.entries(pack)) {
          result.getValueMap().set(key, val);
        }
        span.log({ event: "execute" });
        callback(null, result);
      } else {
        span.setTag(Tags.ERROR, true);
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
    } finally {
      span.finish();
    }
  }
}
export default i18nServer;
