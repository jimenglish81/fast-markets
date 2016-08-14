import React, { PropTypes } from 'react';

const FormGroup = (props) => {
  return (
    <section className="form-group col_group">
      <div className="col_2">
        <label>{props.label}:</label>
      </div>
      <div className="col_2">
        {props.children}
      </div>
    </section>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default FormGroup;
