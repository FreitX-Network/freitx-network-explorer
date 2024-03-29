// @flow

import Component from 'inferno-component';
import Helmet from 'inferno-helmet';
import {CommonMargin} from '../../common/common-margin';
import type {TWallet} from '../../../entities/wallet-types';
import {t} from '../../../lib/iso-i18n';
import type {TAddressDetails} from '../../../entities/explorer-types';
import {TransferInput} from './transfer-input';

export class Transfer extends Component {
  props: {
    wallet: TWallet,
    address: TAddressDetails,
    updateWalletInfo: any,
    chainId: number,
  };

  setWallet(wallet: TWallet) {
    this.setState({wallet});
  }

  render() {
    const {wallet, address, chainId} = this.props;

    if (!wallet) {
      return null;
    }

    return (
      <div className='column'>
        <Helmet
          title={`${t('wallet.transfer.title')} - FreitX Network Blockchain`}
        />
        <div>
          <TransferInput chainId={chainId} wallet={wallet} address={address} updateWalletInfo={this.props.updateWalletInfo}/>
        </div>
        <CommonMargin/>
      </div>
    );
  }
}
