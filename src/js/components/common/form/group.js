import React, { PropTypes } from 'react';
import { conditionalRender } from '../../../utils';

/**
 * Wrap content in a generic form group.
 * @param {Object} props
 * @param {Element} props.children
 * @param {String} [props.label]
 * @return {Element}
 */
const FormGroup = ({ className='', children, label }) => {
  const hasLabel = !!label;
  const alignment = hasLabel ? 'col_2' : 'col_1';
  const labelEl = conditionalRender(hasLabel, (
    <div
      className={className}
      data-form-group-label>
      <label>{label}:</label>
    </div>
  ));

  return (
    <section
      className={`${className} form-group col_group`}
      data-form-group>
      {labelEl}
      <div
        className={alignment}
        data-form-group-content>
        {children}
      </div>
    </section>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  label: PropTypes.string,
};

export default FormGroup;
