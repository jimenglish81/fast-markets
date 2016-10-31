import React, { PropTypes } from 'react';

/**
 * Positions for app.
 * @param {Object} props
 * @return {Element}
 */
const Positions = ({ children }) => {

  return (
    <section className="positions">
      <section className="positions__header">
        <div className="positions-row">
          <div className="positions-cell positions-cell__market-name">
            Market
          </div>
          <div className="positions-cell positions-cell__direction">
            Direction
          </div>
          <div className="positions-cell positions-cell__expiry">
            Expiry
          </div>
          <div className="positions-cell positions-cell__strike">
            Strike
          </div>
          <div className="positions-cell positions-cell__latest">
            Latest
          </div>
          <div className="positions-cell positions-cell__stake">
            Stake
          </div>
          <div className="positions-cell positions-cell__payout">
            Payout
          </div>
        </div>
      </section>
      <section className="positions__body">
        {children.length ?
          children :
          <small className="positions__empty-msg">
            You currently have no positions.
          </small>
        }
      </section>
    </section>
  );
};

Positions.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Positions;
