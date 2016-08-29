import React, { PropTypes } from 'react';

const MarketName = (props) => {
  const status = props.status === 'TRADEABLE' ?
                    'dealable' : 'undealable';
  const className = 'market-name--status';
  const statusClassName = `${className} market-name--status--${status}`;
  const statusTitle = 'look up in obj';

  return (
    <div className="market-name">
      <span
        className={statusClassName}
        title={statusTitle}>
      </span>
      <strong
        className="market-name--title"
        title={props.name}>
        {props.name}
      </strong>
    </div>
  );
};

MarketName.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MarketName;
