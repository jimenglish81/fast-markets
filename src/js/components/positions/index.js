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
        <div className="positions__row">
          <div className="positions__cell positions__cell__market-name">
            Market
          </div>
          <div className="positions__cell positions__cell__direction">
            Direction
          </div>
          <div className="positions__cell positions__cell__expiry">
            Expiry
          </div>
          <div className="positions__cell positions__cell__strike">
            Strike
          </div>
          <div className="positions__cell positions__cell__latest">
            Latest
          </div>
          <div className="positions__cell positions__cell__stake">
            Stake
          </div>
          <div className="positions__cell positions__cell__payout">
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
