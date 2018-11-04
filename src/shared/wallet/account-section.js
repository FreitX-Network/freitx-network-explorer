// @flow

import Component from 'inferno-component';
import type {TWallet} from '../../entities/wallet-types';
import type {TAddressDetails} from '../../entities/explorer-types';
import {assetURL} from '../../lib/asset-url';
import {t} from '../../lib/iso-i18n';

export class AccountSection extends Component {
  props: {
    wallet: TWallet,
    address: TAddressDetails,
    createNew: boolean,
    setWallet: any,
  };

  newWallet() {
    return (
      <div style={{position: 'relative'}}>
        <div className='new-wallet-text'>
          <p><strong>{t('account.why')}</strong></p>
          <p>{t('account.save')}</p>
          <p><strong>{t('account.pay-attention')}</strong></p>
          <p>{t('account.not-hold')}</p>
          <p>{t('account.protect')} <strong>{t('account.responsible')}</strong></p>
        </div>
      </div>
    );
  }

  emptyWallet() {
    return (
      <div className='blur_img_block' style={{position: 'relative'}}>
        <img id='globe'
          className='blur-image'
          style={{maxWidth: '100%'}}
          src={assetURL('/unlock-wallet.png')}/>
        <div className='centered-text'>
          <p>{t('account.empty.unlock')}</p>
        </div>
      </div>
    );
  }

  wallet(wallet: TWallet, address: TAddressDetails, setWallet: any) {
    return (
      <div className='wallet-container'>
        <div>
          <p className='wallet-item'>{t('account.wallet')}</p>
        </div>
        <div style={{alignContent: 'center'}}>
          <p id='balance'>{address ? address.totalBalance : 0}<b className='main-color'>{t('account.testnet.token')}</b></p>
        </div>
        <div>
          <p className='wallet-address'>{t('account.address')}</p>
          <p className='wallet-rawaddress'>{wallet.rawAddress}</p>
          <a className='wallet-options' href={`/address/${wallet.rawAddress}`}>
          {t('account.transaction-history')}</a>
          <a className='wallet-options' onClick={() => setWallet(null)}>{t('account.change')}</a>
        </div>
      </div>
    );
  }

  render() {
    const {wallet, address, createNew, setWallet} = this.props;

    return (
      <div className='wallet'>
        {wallet ? this.wallet(wallet, address, setWallet) : (createNew ? this.newWallet() : this.emptyWallet())}
      </div>
    );
  }
}
