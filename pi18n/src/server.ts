import { Server, ServerCredentials } from "grpc";
import { i18nService } from "./generated/proto/internationalization_grpc_pb";
import i18nServer from "./service/i18nServer";

const server = new Server();
server.addService(i18nService, new i18nServer());
server.bind("0.0.0.0:50052", ServerCredentials.createInsecure());
server.start();
