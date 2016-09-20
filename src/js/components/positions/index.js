import React, { PropTypes } from 'react';

/**
 * Positions for app.
 * @param {Object} props
 * @return {Element}
 */
const Positions = (props) => {

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
        <div className="positions__row">
          <div className="positions__cell positions__cell__market-name">
            EUR/GBP
          </div>
          <div className="positions__cell positions__cell__direction">
            Above
          </div>
          <div className="positions__cell positions__cell__expiry">
            10/09/1982
          </div>
          <div className="positions__cell positions__cell__strike">
            120
          </div>
          <div className="positions__cell positions__cell__latest">
            101
          </div>
          <div className="positions__cell positions__cell__stake">
            10
          </div>
          <div className="positions__cell positions__cell__payout">
            300
          </div>
        </div>
      </section>
    </section>
  );
};

export default Positions;
