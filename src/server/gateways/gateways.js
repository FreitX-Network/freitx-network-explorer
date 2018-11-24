import {RpcMethods, HttpProvider} from 'iotex-client-js';
import config from 'config';
import {logger} from '../../lib/integrated-gateways/logger';
import {FreitxCoreExplorer} from './freitx-core';
import {WalletCore} from './wallet-core/wallet-core';
import {CrossChain} from './cross-chains';

export function setGateways(server) {
  server.gateways = server.gateways || {};
  server.gateways.freitxCore = new FreitxCoreExplorer(server.config.gateways.freitxCore);
  server.gateways.walletCore = new WalletCore(server.config.gateways.walletCore);
  server.gateways.crossChain = new CrossChain(config.get('chains'));
  server.gateways.onexRpcMethods = new RpcMethods(new HttpProvider(server.config.gateways.freitxCore.serverUrl));

  server.gateways.freitxCore.init()
    .catch(e => logger.error('failed to init gateways', {err: e}));
}
