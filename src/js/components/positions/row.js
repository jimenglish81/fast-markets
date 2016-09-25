import React, { PropTypes } from 'react';

/**
 * Positions for app.
 * @param {Object} props
 * @return {Element}
 */
const Row = (props) => {

  return (
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
  )
};

export default Row;
