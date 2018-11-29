// @flow

export const SITE_URL = '/';
export const CONSENSUS_API = '/api/getFreitxChainData';

export class ADDRESS {

  static get INDEX(): string {
    return '/address/:id/';
  }

  static get GET_ADDRESS(): string {
    return '/api/getAddressId';
  }

  static get GET_TRANSFERS(): string {
    return '/api/getAddressTransfersId';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getAddressExecutionsId';
  }

  static get GET_VOTERS(): string {
    return '/api/getAddressVotersId';
  }
}

export class VOTE {

  static get INDEX(): string {
    return '/bonds/:id/';
  }

  static get GET_VOTE(): string {
    return '/api/getVoteId';
  }
}

export class VOTES {

  static get INDEX(): string {
    return '/bonds/';
  }

  static get GET(): string {
    return '/api/getBonds';
  }
}

export class BLOCK {

  static get INDEX(): string {
    return '/blocks/:id/';
  }

  static get GET_BLOCK(): string {
    return '/api/getBlockId';
  }

  static get GET_TRANSFERS(): string {
    return '/api/getBlockTransfersId';
  }

  static get GET_VOTES(): string {
    return '/api/getBlockBondsId';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getBlockExecutionsId';
  }
}

export class BLOCKS {

  static get INDEX(): string {
    return '/blocks/';
  }

  static get GET(): string {
    return '/api/getBlocks';
  }
}

export class EXECUTION {

  static get INDEX(): string {
    return '/contracts/:id/';
  }

  static get GET(): string {
    return '/api/getContractId';
  }

  static get GET_RECEIPT(): string {
    return '/api/getContractReceipt';
  }

  static get GET_EXECUTIONS(): string {
    return '/api/getContractExecutions';
  }
}

export class EXECUTIONS {

  static get INDEX(): string {
    return '/contracts/';
  }

  static get GET(): string {
    return '/api/getContracts';
  }
}

export class TRANSFER {

  static get INDEX(): string {
    return '/transfers/:id/';
  }

  static get GET(): string {
    return '/api/getTransferId';
  }
}

export class TRANSFERS {

  static get INDEX(): string {
    return '/transfers/';
  }

  static get GET(): string {
    return '/api/getTransfers';
  }
}

export class NAV {

  static get STATISTIC(): string {
    return '/api/getStatistic';
  }

  static get PRICE(): string {
    return '/api/getPrice';
  }
}

export class WALLET {

  static get INDEX(): string {
    return '/wallet';
  }

  static get GENERATE_KEY_PAIR(): string {
    return '/api/wallet/generateKeyPair';
  }

  static get UNLOCK_WALLET(): string {
    return '/api/wallet/unlockWallet';
  }

  static get TRANSACTION(): string {
    return '/wallet/transaction';
  }

  static get CONTRACT(): string {
    return '/wallet/transaction';
  }

  static get GENERATE_TRANSFER(): string {
    return `/api${this.TRANSACTION}/generateTransfer`;
  }

  static get GENERATE_VOTE(): string {
    return `/api${this.TRANSACTION}/generateVote`;
  }

  static get SEND_TRANSACTION(): string {
    return `/api${this.TRANSACTION}/sendTransaction`;
  }

  static get CONTINUE_DEPOSIT(): string {
    return `/api${this.TRANSACTION}/continueDeposit`;
  }

  static get SIGN_AND_SETTLE_DEPOSIT(): string {
    return `/api${this.TRANSACTION}/signSettleDeposit`;
  }

  static get SIGN_CONTRACT_ABI(): string {
    return `/api${this.CONTRACT}/signContractAbi`;
  }

  static get GENERATE_EXECUTION(): string {
    return `/api${this.CONTRACT}/generateExecution`;
  }

  static get READ_EXECUTION(): string {
    return `/api${this.CONTRACT}/readExecution`;
  }
}

export class DELEGATES {

  static get INDEX(): string {
    return '/delegates';
  }

  static get GET(): string {
    return '/api/getDelegates';
  }
}
