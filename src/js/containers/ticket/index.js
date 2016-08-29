import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TicketForm from '../../components/ticket/form';

class Ticket extends Component {
  render() {
    return (
      <TicketForm
        market={this.props.selectedMarket}
      />
    );
  }
}

Ticket.propTypes = {
  selectedMarket: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const {
    markets: {
      selectedMarket,
    },
  } = state;

  return {
    selectedMarket,
  };
}

export default connect(mapStateToProps)(Ticket);
