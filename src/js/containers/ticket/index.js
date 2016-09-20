import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { generateDealReference } from '../../utils';
import {
  submitTrade,
  sizeUpdate
} from '../../actions';
import TicketForm from '../../components/ticket';

const calculatePayout = createSelector(
  (state) => state.ticket.size,
  (state) => state.markets.selectedMarket.odds,
  (size, odds) => {
    const payout = parseFloat(size) / parseFloat(odds);
    return isNan(payout) ? null : payout;
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
    } = this.props;
    const data = {
      dealReference: generateDealReference(accountId),
      direction,
      epic: selectedMarket.epic,
      expiryPeriod: 'TWO_MINUTES',
      size,
    };
    this.props.submitTrade(data);
  }

  render() {
    const {
      selectedMarket: {
        minDealSize,
        strike,
      },
      size,
    } = this.props;

    return (
      <TicketForm
        minDealSize={minDealSize}
        strike={strike}
        size={size}
        onSubmit={this.onSubmit}
        onSizeChange={(size) => this.props.sizeUpdate(size)}
      />
    );
  }
}

Ticket.propTypes = {
  accountId: PropTypes.string.isRequired,
  selectedMarket: PropTypes.object.isRequired,
  size: PropTypes.number,
  submitTrade: PropTypes.func.isRequired,
  sizeUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    ticket: {
      size,
    },
    markets: {
      selectedMarket,
    },
    auth: {
      accountId,
    },
  } = state;

  return {
    accountId,
    payout: calculatePayout(state),
    selectedMarket,
    size,
  };
}

export default connect(mapStateToProps, { submitTrade, sizeUpdate })(Ticket);
