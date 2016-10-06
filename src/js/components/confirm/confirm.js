import React, { PropTypes } from 'react';
import Success from './success';
import Failure from './failure';

const Confirm = ({ isSuccess, message }) => {
  const icon = (isSuccess ? <Success /> : <Failure />);

  return (
    <div className="confirm confirm--jiggle">
      {icon}
      <p className="confirm__text">{message}</p>
    </div>
  )
}

Confirm.propTypes = {
  isSuccess: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

export default Confirm;
