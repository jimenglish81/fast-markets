import React, { PropTypes } from 'react';

const MarketName = (props) => {
  const className = 'market-name--status';
  const statusClassName = `${className} market-name--status--${props.status}`;
  const statusTitle = 'look up in obj';

  return (
    <div className="market-name">
      <span
        className={statusClassName}
        title={statusTitle}>
      </span>
      <strong
        className="market-name--title"
        title={props.marketName}>
        {props.marketName}
      </strong>
    </div>
  );
};

MarketName.propTypes = {
  status: PropTypes.string.isRequired,
  statusTitle: PropTypes.string.isRequired,
  marketName: PropTypes.string.isRequired,
};

export default MarketName;
