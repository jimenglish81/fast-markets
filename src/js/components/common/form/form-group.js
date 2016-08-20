import React, { PropTypes } from 'react';
import { conditionalRender } from '../../../utils';

const FormGroup = ({ children, label }) => {
  const hasLabel = !!label;
  const className = hasLabel ? 'col_2' : 'col_1';
  const labelEl = conditionalRender(hasLabel, (
    <div className={className}>
      <label>{label}:</label>
    </div>
  ));

  return (
    <section className="form-group col_group">
      {labelEl}
      <div className={className}>
        {children}
      </div>
    </section>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default FormGroup;
