import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from "grpc";
import { i18nService, Ii18nServer } from "./proto/i18n_grpc_pb";
import { i18nPack, PackRequest } from "./proto/i18n_pb";
import en_us from "./resources/en_us.json";

class i18nServer implements Ii18nServer {
  get(call: ServerUnaryCall<PackRequest>, callback: sendUnaryData<i18nPack>) {
    const result = new i18nPack();

    for (const [key, val] of Object.entries(en_us)) {
      result.getValueMap()[key] = val;
    }
    callback(null, result);
  }
}

const server = new Server();
server.addService(i18nService, new i18nServer());
server.bind("0.0.0.0:50052", ServerCredentials.createInsecure());
server.start();
