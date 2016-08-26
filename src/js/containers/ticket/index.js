import React, { Component } from 'react';
import TicketForm from '../../components/ticket/form';

class Ticket extends Component {
  // move to a relect
  _calculatePayout() {
    const payout = props.premium / props.odds;
    return isNaN(payout) ? null : payout;
  }

  render() {
    return (
      <TicketForm />
    );
  }
}

export default Ticket;
