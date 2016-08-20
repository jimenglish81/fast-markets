import React, { PropTypes } from 'react';
import { FormError, FormGroup } from '../common/form';

const AuthForm = (props) => {
  const inputChange = (key) => ({ target }) => {
    props.onInputChange(key, target.value);
  };

  return (
    <div className="login-form">
      <form onSubmit={props.onFormSubmit}>
        <FormGroup>
          <input
            placeholder="Username"
            className="form-control"
            onChange={inputChange('identifier')}
            value={props.identifier}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            onChange={inputChange('password')}
            value={props.password}
          />
        </FormGroup>
        <FormError error={props.error} />
        <button
          action="submit"
          className="btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  identifier: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AuthForm;
