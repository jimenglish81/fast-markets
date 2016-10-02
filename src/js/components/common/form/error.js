import React, { PropTypes } from 'react';
import { conditionalRender } from '../../../utils';

/**
 * Display a form error.
 * @param {Object} props
 * @param {String} [props.error]
 * @return {Element}
 */
const FormError = (props) => {
  return (
    conditionalRender(props.error, (
      <div data-form-error>
        <strong>{props.error}</strong>
      </div>
    ))
  );
};

FormError.propTypes = {
  error: PropTypes.string,
};

export default FormError;
