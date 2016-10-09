import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { generateDealReference } from '../../utils';
import { findMarketByEpic } from '../../reducers/markets';
import { calculatePayout } from '../../reducers/ticket';

import {
  submitTrade,
  stakeUpdate,
  expiryUpdate
} from '../../actions';
import TicketForm from '../../components/ticket';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(direction) {
    const {
      accountId,
      selectedMarket,
      stake: size,
      expiry,
    } = this.props;

    if (!size) {
      // TODO - validaation and higlight field.
      return;
    }
    const data = {
      dealReference: generateDealReference(accountId),
      direction,
      epic: selectedMarket.epic,
      expiryPeriod: expiry,
      size,
    };
    this.props.submitTrade(data);
  }

  render() {
    const {
      selectedMarket: {
        currency,
        minDealSize,
        strike,
        minExpiry,
        maxExpiry,
      },
      payout,
      stake,
      expiry,
    } = this.props;

    return (
      <TicketForm
        currency={currency}
        minDealSize={minDealSize}
        strike={strike}
        minExpiry={minExpiry}
        maxExpiry={maxExpiry}
        stake={stake}
        expiry={expiry}
        payout={payout}
        onSubmit={this.onSubmit}
        onExpiryChange={(expiry) => this.props.expiryUpdate(expiry)}
        onStakeChange={(stake) => this.props.stakeUpdate(stake)}
      />
    );
  }
}

Ticket.propTypes = {
  accountId: PropTypes.string.isRequired,
  payout: PropTypes.number,
  selectedMarket: PropTypes.object.isRequired,
  stake: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expiry: PropTypes.string,
  submitTrade: PropTypes.func.isRequired,
  stakeUpdate: PropTypes.func.isRequired,
  expiryUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    ticket: {
      expiry,
      stake,
    },
    markets: {
      markets,
      selectedEpic,
    },
    auth: {
      session: {
        accountId,
      },
    },
  } = state;

  return {
    accountId,
    expiry,
    payout: calculatePayout(state),
    selectedMarket: findMarketByEpic(selectedEpic, markets),
    stake,
  };
}

export default connect(mapStateToProps, { submitTrade, stakeUpdate, expiryUpdate })(Ticket);
