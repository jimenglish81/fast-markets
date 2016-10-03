import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { generateDealReference } from '../../utils';
import {
  submitTrade,
  sizeUpdate,
  expiryUpdate
} from '../../actions';
import TicketForm from '../../components/ticket';

const calculatePayout = createSelector(
  (state) => state.ticket.size,
  (state) => state.markets.selectedMarket.odds,
  (size, odds) => {
    const payout = parseFloat(size) / parseFloat(odds);
    return isNaN(payout) ? null : payout;
  }
);

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(direction) {
    const {
      accountId,
      selectedMarket,
      size,
      expiry,
    } = this.props;
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
      size,
      expiry,
    } = this.props;

    return (
      <TicketForm
        currency={currency}
        minDealSize={minDealSize}
        strike={strike}
        minExpiry={minExpiry}
        maxExpiry={maxExpiry}
        size={size}
        expiry={expiry}
        payout={payout}
        onSubmit={this.onSubmit}
        onExpiryChange={(expiry) => this.props.expiryUpdate(expiry)}
        onSizeChange={(size) => this.props.sizeUpdate(size)}
      />
    );
  }
}

Ticket.propTypes = {
  accountId: PropTypes.string.isRequired,
  payout: PropTypes.number,
  selectedMarket: PropTypes.object.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  expiry: PropTypes.string,
  submitTrade: PropTypes.func.isRequired,
  sizeUpdate: PropTypes.func.isRequired,
  expiryUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    ticket: {
      expiry,
      size,
    },
    markets: {
      selectedMarket,
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
    selectedMarket,
    size,
  };
}

export default connect(mapStateToProps, { submitTrade, sizeUpdate, expiryUpdate })(Ticket);
