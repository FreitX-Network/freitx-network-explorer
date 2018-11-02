import {CONSENSUS_API} from '../common/site-url';

export function setConsensusMetricsRoutes(server) {
  const {gateways: {iotexCore}} = server;

  async function getFreitxChainData(ctx, next) {
    try {
      const consensusMetrics = await iotexCore.getFreitxChainData();
      ctx.body = {ok: true, consensusMetrics};
    } catch (error) {
      ctx.body = {ok: false, error: {code: 'FAIL_GET_CONSENSUS', message: 'consensus.error.fail'}};
    }
  }

  server.post('getFreitxChainData', CONSENSUS_API, getFreitxChainData);
}
