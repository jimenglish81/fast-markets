import React, { PropTypes } from 'react';
const titles = {

};

const MarketName = (props) => {
  const isTradeable = props.status === 'TRADEABLE';
  const status = isTradeable ?
                    'dealable' : 'undealable';
  const className = 'market-name--status';
  const statusClassName = `${className} market-name--status--${status}`;
  const statusTitle = isTradeable ?
                    'Market Open' : 'Market Closed';

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
