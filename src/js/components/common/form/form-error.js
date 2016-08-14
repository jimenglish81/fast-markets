import React, { PropTypes } from 'react';
import { conditionalRender } from '../../../utils';

const FormError = (props) => {
  return (
    conditionalRender(props.error, (
      <div>
        <strong>{props.error}</strong>
      </div>
    ))
  );
};

FormError.propTypes = {
  error: PropTypes.string,
};

export default FormError;
