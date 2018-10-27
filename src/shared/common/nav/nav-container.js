import {connect} from 'inferno-redux';

import {Nav} from './nav';
import * as actions from './nav-actions';
import {fetchConsensusMetrics} from '../../consensus-metrics/consensus-metrics-actions';


export const NavContainer = connect(
  function mapStateToProps(state) {
    return {
      statistic: state.nav.statistic,
      price: state.nav.price,
      fetching: state.nav.fetching,
      error: state.nav.error,
      consensus: state.consensus,
    };
  },
  dispatch => ({
    fetchCoinStatistic: () => dispatch(actions.fetchCoinStatistic()),
    fetchCoinPrice: () => dispatch(actions.fetchCoinPrice()),
    fetchConsensusMetrics: () => dispatch(fetchConsensusMetrics()),

  }),
)(Nav);
