// @flow
import idl from './json-rpc.json';
import {barristerHandlerFactory} from './barrister-handler-factory';

export function setJsonRpcRoutes(server: any) {
  server.post(
    'api/json-rpc/',
    'api/json-rpc/',
    barristerHandlerFactory({
      service: server.services.rpc,
      idlJson: idl,
      name: 'JsonRpc',
    })
  );
}
