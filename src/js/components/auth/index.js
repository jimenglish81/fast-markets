import React, { PropTypes } from 'react';
import { FormError, FormGroup } from '../common/form';

/**
 * Authentication form for app.
 * @param {Object} props
 * @param {String} [props.identifier]
 * @param {String} [props.password]
 * @param {String} [props.error]
 * @param {Function} props.onFormSubmit
 * @param {Function} props.oonInputChange
 * @return {Element}
 */
const AuthForm = (props) => {
  const inputChange = (key) => ({ target }) => {
    props.onInputChange(key, target.value);
  };

  return (
    <div className="login-form">
      <form onSubmit={props.onFormSubmit}>
        <FormGroup>
          <input
            autoFocus
            placeholder="Username"
            onChange={inputChange('identifier')}
            value={props.identifier}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            placeholder="Password"
            onChange={inputChange('password')}
            value={props.password}
          />
        </FormGroup>
        <FormGroup>
          <button
            action="submit"
            className="btn btn--primary">
            Sign in
          </button>
        </FormGroup>
        <FormGroup>
          <FormError
            className={'login-form__error login-form__error--shake'}
            error={props.error}
          />
        </FormGroup>
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
