import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { generateDealReference } from '../../utils';
import { submitTrade } from '../../actions';
import TicketForm from '../../components/ticket/form';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(direction) {
    const { size } = this.state;
    const { selectedMarket } = this.props;
    const data = {
      dealReference: generateDealReference(),
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
    } = this.props;

    return (
      <TicketForm
        minDealSize={minDealSize}
        strike={strike}
        onSubmit={this.onSubmit}
        onSizeChange={(size) => this.setState({ size })}
      />
    );
  }
}

Ticket.propTypes = {
  selectedMarket: PropTypes.object.isRequired,
  submitTrade: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { submitTrade })(Ticket);
