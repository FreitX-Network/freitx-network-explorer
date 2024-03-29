// @flow

import Component from 'inferno-component';
import Helmet from 'inferno-helmet';
import isBrowser from 'is-browser';
import window from 'global';
import {CommonMargin} from '../common/common-margin';
import type {TWallet} from '../../entities/wallet-types';
import {t} from '../../lib/iso-i18n';
import type {TAddressDetails} from '../../entities/explorer-types';
import {fetchAddressId} from '../address/address-actions';
import {AccountSection} from './account-section';
import {Transfer} from './transfer/transfer';
import {Vote} from './vote/vote';
import {DeployPreloadHeader} from './contract/deploy';
import {UnlockWallet} from './unlock-wallet';
import {Deploy} from './contract/deploy'
import {Interact} from './contract/interact';

const TRANSFER = 0;
const VOTE = 1;
const INTERACT = 2;
const DEPLOY = 3;

export class Wallet extends Component {
  props: {
    fetchAddressId: fetchAddressId,
    address: TAddressDetails,
    serverUrl: string,
    chainId: number,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      wallet: null,
      selectedTab: TRANSFER,
      createNew: false,
      fetchAddressIntervalId: 0,
    };

    (this: any).setWallet = this.setWallet.bind(this);
    (this: any).tabs = this.tabs.bind(this);
    (this: any).updateWalletInfo = this.updateWalletInfo.bind(this);
  }

  componentWillMount() {
    const {wallet} = this.state;

    if (isBrowser) {
      if (wallet) {
        this.props.fetchAddressId({id: wallet.rawAddress});
      }
    }
  }

  componentDidMount() {
    if (isBrowser) {
      // Fetch address every 1 seconds
      const fetchAddressIntervalId = window.setInterval(() => this.updateWalletInfo(), 500);
      this.setState({fetchAddressIntervalId});
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchAddressIntervalId);
  }

  setWallet(wallet: TWallet) {
    if (wallet) {
      this.props.fetchAddressId({id: wallet.rawAddress});
    }
    this.setState({wallet, createNew: false});
  }

  tabs() {
    const {serverUrl, chainId} = this.props;
    const {selectedTab, wallet, createNew} = this.state;
    const tabs = (
      <div className='tabs'>
        <ul style={{marginLeft: '0em'}}>
          <li className={`${selectedTab === TRANSFER ? 'is-active' : ''}`}
            onClick={() => this.setState({selectedTab: TRANSFER})}
          >
            <a>{t('wallet.tab.transfer', {token: t('account.testnet.token')})}</a>
          </li>
          {chainId === 1 && (
            <li className={`${selectedTab === VOTE ? 'is-active' : ''}`}
              onClick={() => this.setState({selectedTab: VOTE})}>
              <a>{t('wallet.tab.vote')}</a>
            </li>
          )}
          <li className={`${selectedTab === INTERACT ? 'is-active' : ''}`}
            onClick={() => this.setState({selectedTab: INTERACT})}>
            <a>{t('wallet.tab.interact')}</a>
          </li>
          <li className={`${selectedTab === DEPLOY ? 'is-active' : ''}`}
            onClick={() => this.setState({selectedTab: DEPLOY})}>
            <a>{t('wallet.tab.deploy')}</a>
          </li>
        </ul>
      </div>
    );
    let tab = null;
    switch (selectedTab) {
    case VOTE: {
      tab = <Vote wallet={wallet} address={this.props.address} updateWalletInfo={this.updateWalletInfo}/>;
      break;
    }
    case INTERACT: {
      tab = <Interact wallet={wallet} address={this.props.address} updateWalletInfo={this.updateWalletInfo}/>;
      break;
    }
    case DEPLOY: {
      tab = <Deploy wallet={wallet} address={this.props.address} updateWalletInfo={this.updateWalletInfo}/>;
      break;
    }
    default: {
      tab = <Transfer chainId={chainId} wallet={wallet} address={this.props.address} updateWalletInfo={this.updateWalletInfo}/>;
      break;
    }
    }
    return (
      <div>
        <div className='columns'>
          <div className='column is-three-quarters'>
            {
              wallet ? (
                [tabs, tab]
              ) : (
                <UnlockWallet
                  wallet={wallet}
                  setWallet={this.setWallet}
                  updateWalletInfo={this.updateWalletInfo}
                  createNew={this.state.createNew}
                  setCreateNew={() => this.setState({createNew: true})}
                  chainId={chainId}
                />
              )
            }

          </div>
          <div className='column'>
            <AccountSection createNew={createNew} wallet={wallet} setWallet={this.setWallet}
              address={this.props.address}/>
          </div>
        </div>
      </div>
    );
  }

  updateWalletInfo() {
    if (this.state.wallet) {
      this.props.fetchAddressId({id: this.state.wallet.rawAddress});
    }
  }

  render() {

    return (
      <div className='column container rtr'>
        <div style={{margin: '48px'}}/>
        <Helmet
          title={`${t('wallet.title.wallet')} - FreitX Network Blockchain`}
        />
        <DeployPreloadHeader/>
        <div className='column container'>
          {this.tabs()}
        </div>
        <CommonMargin/>
      </div>
    );
  }
}
