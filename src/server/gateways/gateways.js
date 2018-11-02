import {logger} from '../../lib/integrated-gateways/logger';
import {FreitxCoreExplorer} from './freitx-core';
import {WalletCore} from './wallet-core/wallet-core';

export function setGateways(server) {
  server.gateways = server.gateways || {};
  server.gateways.iotexCore = new FreitxCoreExplorer(server.config.gateways.iotexCore);
  server.gateways.walletCore = new WalletCore(server.config.gateways.walletCore);

  server.gateways.iotexCore.init()
    .catch(e => logger.error('failed to init gateways', {err: e}));
}
