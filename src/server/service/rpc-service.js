// @flow
import {logger} from '../../lib/integrated-gateways/logger';

class ServiceError extends Error {
  code: any;
  message: string;

  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export class RpcService {
  server: any;
  freitxCore: any;
  walletCore: any;

  constructor(server: any) {
    this.server = server;
    this.freitxCore = this.server.gateways.freitxCore;
    this.walletCore = this.server.gateways.walletCore;
  }

  async getAddressId(req: any) {
    return await this.freitxCore.getAddressDetails(req.id);
  }

  async signContractAbi(req: any) {
    const address = await this.freitxCore.getAddressDetails(req.wallet.rawAddress);
    if (req.rawTransaction.nonce <= address.nonce) {
      throw new ServiceError(-32600, 'NONCE_TOO_LOW');
    }
    try {
      const signedTransaction = await this.walletCore.signSmartContract(req.wallet, req.rawTransaction);
      return {
        signedTransaction,
      };
    } catch (error) {
      logger.error('FAIL_SIGN_ABI', error);
      throw new ServiceError(-32600, 'FAIL_SIGN_ABI');
    }
  }

  async sendTransaction(req: any) {
    const {signedTransaction, type} = req;
    try {
      let result;
      if (type === 'transfer') {
        result = await this.freitxCore.sendTransfer(signedTransaction);
      } else if (type === 'vote') {
        result = await this.freitxCore.sendVote(signedTransaction);
      } else {
        result = await this.freitxCore.sendSmartContract(signedTransaction);
      }
      return {
        hash: result.hash,
      };
    } catch (error) {
      logger.error('FAIL_SEND_TRANSACTION', error);
      throw new ServiceError(-32600, 'FAIL_SEND_TRANSACTION');
    }
  }

  async getReceiptByExecutionId(req: any) {
    try {
      return await this.freitxCore.getReceiptByExecutionId(req);
    } catch (error) {
      logger.error('FAIL_GET_RECEIPT', error);
      throw new ServiceError(-32600, 'FAIL_GET_RECEIPT');
    }
  }

  async readExecutionState(req: any) {
    try {
      return await this.freitxCore.readExecutionState(req);
    } catch (error) {
      logger.error('FAIL_READ_EXECUTION_STATE', error);
      throw new ServiceError(-32600, 'FAIL_READ_EXECUTION_STATE');
    }
  }
}
