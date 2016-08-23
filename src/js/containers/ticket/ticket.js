import React, { Component } from 'react';
import TicketForm from '../../components/ticket/form';

const markets = [
  {
    epic: 'W.IP',
    status: 'dealable',
    name: 'FTSE',
  },
  {
    epic: 'V.IP',
    status: 'undealable',
    name: 'Google',
  }
];

class Ticket extends Component {
  constructor(props) {
    super(props);
    // TODO - move this.
    this.state = {
      markets,
      selectedMarket: markets[0],
    };
  }
  // move to a relect
  _calculatePayout() {
    const payout = props.premium / props.odds;
    return isNaN(payout) ? null : payout;
  }

  render() {
    return (
      <TicketForm
        markets={this.state.markets}
        selectedMarket={this.state.selectedMarket}
        onSelectMarket={(selectedMarket) => this.setState({ selectedMarket })}
      />
    );
  }
}

export default Ticket;
