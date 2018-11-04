// @flow

import Component from 'inferno-component';
import {styled} from 'styletron-inferno';
import serialize from 'form-serialize';
import window from 'global/window';
import isBrowser from 'is-browser';
import {assetURL} from '../../../lib/asset-url';
import {t} from '../../../lib/iso-i18n';
import {BLOCKS, SITE_URL, EXECUTIONS, TRANSFERS, VOTES, WALLET} from '../site-url';
import {fetchConsensusMetrics} from '../../consensus-metrics/consensus-metrics-actions';
import type {TCoinStatistic, TConsensusMetrics} from '../../../entities/explorer-types';
import {Navboard} from './navboard';
import {OnexExplorerTitle} from '../onex-explorer-title';



type PropsType = {
  statistic: TCoinStatistic,
};

export class Nav extends Component {
  props: {
    fetchConsensusMetrics: fetchConsensusMetrics,
    statistic: TCoinStatistic,
    votes: number,
    consensus: {
      metrics: TConsensusMetrics,
    },
  };
  _form: any;

  constructor(props: any) {
    super(props);
    this.state = {
      displayDropdownMenu: false,
      fetchCoinStatistic: 0,
      fetchConsensusMetricsId: 0,
      height: 0,
    };

    (this: any).toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  }

  toggleDropdownMenu() {
    this.setState({
      displayDropdownMenu: !this.state.displayDropdownMenu,
    });
  }

  componentWillMount() {
    if (isBrowser) {
      this.props.fetchConsensusMetrics();
      this.props.fetchCoinStatistic();
    }
  }

  componentWillReceiveProps(nextProps: PropsType, nextContext: any) {
    if (nextProps.statistic && this.state.height !== nextProps.statistic.height) {
      this.setState(state => {
        state.height = nextProps.statistic.height;
      }, () => {

      });
    }
  }

  componentDidMount() {
    if (isBrowser) {
      const fetchConsensusMetricsId = window.setInterval(() => this.props.fetchConsensusMetrics(),5000,);
      const fetchCoinStatistic = window.setInterval(() => this.props.fetchCoinStatistic(), 30000);
      this.setState({fetchCoinStatistic, fetchConsensusMetricsId});
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchConsensusMetricsId);
    window.clearInterval(this.state.fetchCoinStatistic);
  }

  handleSubmit(e: {preventDefault: any}) {
    e.preventDefault();
    const formData = serialize(this._form, {hash: true});
    switch (formData.option) {
    case 'Address': {
      window.location = `/address/${formData.search}`;
      break;
    }
    case 'Execution': {
      window.location = `/executions/${formData.search}`;
      break;
    }
    case 'Transfer': {
      window.location = `/transfers/${formData.search}`;
      break;
    }
    case 'Block': {
      window.location = `/blocks/${formData.search}`;
      break;
    }
    case 'Vote': {
      window.location = `/votes/${formData.search}`;
      break;
    }
    default: {
      window.location = SITE_URL;
      break;
    }
    }
  }

  render() {
    const stats = this.props.statistic;
    const consensusMetrics = this.props.consensus && this.props.consensus.metrics || {};
    const votesData = Number(stats ? stats.votes || 0 : 0).toLocaleString();

    return (
      <div>
        <div className='navbar is-fixed-top' role='navigation'>
          <NavWrapper>
            <nav className='navbar is-black'>
              <div className='container'>
                <div className='navbar-brand'>
                  <div
                    className={`navbar-burger burger ${this.state.displayDropdownMenu ? 'is-active' : ''}`}
                    data-target='navMenuColordark-example'
                    onClick={() => this.toggleDropdownMenu()}
                  >
                    <span aria-hidden='true'/>
                    <span aria-hidden='true'/>
                    <span aria-hidden='true'/>
                  </div>
                </div>
                <div id='navMenuColordark-example' className={`navbar-menu ${this.state.displayDropdownMenu ? 'is-active' : ''}`}>
                  <div className='navbar-end'>
                    <div className='navbar-item'>
                    <Navboard
                    blocks={Number(stats ? (stats.height || 0) + 1 : 0).toLocaleString()}
                    executions={Number(stats ? stats.executions || 0 : 0).toLocaleString()}
                    transfers={Number(stats ? stats.transfers || 0 : 0).toLocaleString()}
                    votes={Number(stats ? stats.votes || 0 : 0).toLocaleString()}
                    bbh={stats ? stats.bh || 0 : 0}
                      />

                    </div>
                    <div className='navbar-item'>
                      <form onSubmit={e => this.handleSubmit(e)} ref={r => (this._form = r)}>
                        <div className='field has-addons'>
                          <NavWrapper className='control'>
                            <input name='search' className='input' type='text' placeholder='Search'/>
                          </NavWrapper>
                          <NavWrapper className='control'>
                            <div className='select is-fullwidth'>
                              <select name='option'>
                                <option value='Address'>{t('meta.address')}</option>
                                <option value='Execution'>{t('meta.execution')}</option>
                                <option value='Transfer'>{t('meta.transfer')}</option>
                                <option value='Block'>{t('meta.block')}</option>
                                <option value='Vote'>{t('meta.vote')}</option>
                              </select>
                            </div>
                          </NavWrapper>
                          <div className='control'>
                            <button className='button'>
                              <i className='fas fa-search'/>
                            </button>
                            <OnexExplorerTitle
                              status={this.props.status}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>


                  <div className='min_wd navbar-menu_global' style={{paddingTop: '0px', borderTop: '0px'}}>
                    <a className='navbar-item' href={SITE_URL}>{t('meta.dashboard')}</a>
                    <a className='navbar-item' href={BLOCKS.INDEX}>{t('meta.blocks')}</a>
                    <a className='navbar-item' href={TRANSFERS.INDEX}>{t('meta.transfers')}</a>
                    <a className='navbar-item' href={VOTES.INDEX}>{t('meta.votes')}</a>
                    <a className='navbar-item' href={EXECUTIONS.INDEX}>{t('meta.executions')}</a>
                    <a className='navbar-item' href={WALLET.INDEX}>{t('meta.account')}</a>

                  </div>





                </div>
              </div>
            </nav>
          </NavWrapper>
        </div>


        <div className="left_menu">
        <a href={SITE_URL}>
          <img
            className="logo"
            src={assetURL('/logo.svg')}
            alt='FreitX Network'
          />
        </a>

          <div className='navbar-menu_global' style={{paddingTop: '0px', borderTop: '0px'}}>
            <a className='navbar-item' href={SITE_URL}>{t('meta.dashboard')}</a>
            <a className='navbar-item' href={BLOCKS.INDEX}>{t('meta.blocks')}</a>
            <a className='navbar-item' href={TRANSFERS.INDEX}>{t('meta.transfers')}</a>
            <a className='navbar-item' href={VOTES.INDEX}>{t('meta.votes')}</a>
            <a className='navbar-item' href={EXECUTIONS.INDEX}>{t('meta.executions')}</a>
            <a className='navbar-item' href={WALLET.INDEX}>{t('meta.account')}</a>

          </div>

        </div>




      </div>
    );
  }
}

const NavWrapper = styled('div', props => ({
  width: '100%',
}));
