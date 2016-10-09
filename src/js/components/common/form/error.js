import React, { PropTypes } from 'react';
import { conditionalRender } from '../../../utils';

/**
 * Display a form error.
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.error]
 * @return {Element}
 */
const FormError = ({ className, error }) => {
  return (
    conditionalRender(error, (
      <div data-form-error className={className} >
        <strong>{error}</strong>
      </div>
    ))
  );
};

FormError.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default FormError;
