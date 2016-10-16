import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  fetchPositions
} from '../../actions';
import { findMarketByEpic } from '../../reducers/markets';
import PositionsGrid from '../../components/positions';
import PositionsRow from '../../components/positions/row';
import { isWinningBet } from '../../reducers/positions';


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
      const market = findMarketByEpic(position.epic, markets);
      const isWinning = isWinningBet(market.strike, position.strikeLevel, position.direction);
      return (
        <PositionsRow
          isWinning={isWinning}
          position={position}
          market={market}
          key={position.dealId}
        />
      );
    });
  };

  render() {
    const {
      positions,
    } = this.props;

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
