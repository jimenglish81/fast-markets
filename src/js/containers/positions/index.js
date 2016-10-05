import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  fetchPositions
} from '../../actions';
import PositionsGrid from '../../components/positions';
import PositionsRow from '../../components/positions/row';

class Positions extends Component {
  componentWillMount() {
    // TODO - move to fast-markets?
    this.props.fetchPositions();
  }

  renderRows() {
    const {
      positions,
      markets,
    } = this.props;
    if (!positions) {
      return null;
    }

    return positions.map((position) => {
      // TODO - move to util.
      const market = markets.find((m) => m.epic === position.epic);
      return (
        <PositionsRow position={position} market={market} key={position.dealId} />
      );
    });
  };

  render() {
    const {
      positions,
    } = this.props;

    // TODO - use children here and render rows to pass latest price
    return (
      <PositionsGrid>
        {this.renderRows()}
      </PositionsGrid>
    );
  }
}

Positions.propTypes = {
  fetchPositions: PropTypes.func.isRequired,
  positions: PropTypes.arrayOf(PropTypes.object),
  markets: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  const {
    positions,
    markets: {
      markets,
    },
  } = state;

  return {
    positions,
    markets,
  };
}

export default connect(mapStateToProps, { fetchPositions })(Positions);
