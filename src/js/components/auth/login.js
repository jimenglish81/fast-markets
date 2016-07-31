import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestLogin } from '../../actions';
//{identifier.touched && identifier.error && <span>{identifier.error}</span>}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
    };
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const { identifier, password } = this.state;
    this.props.requestLogin(identifier, password);
  }

  onInputChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  _renderErrorMsg() {
    if (this.props.errorMsg) {
      return (
        <div>
          <strong>{this.props.errorMsg}</strong>
        </div>
      );
    }
  }

  render() {
    const { identifier, password } = this.state;

    return (
      <div className="login-form">
        <form onSubmit={this._handleFormSubmit}>
          <div className="field-group">
            <label>Username:</label>
            <input
              placeholder="Username"
              className="form-control"
              onChange={(evt) => this.onInputChange('identifier', evt.target.value)}
              value={identifier}
            />
          </div>
          <div className="field-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(evt) => this.onInputChange('password', evt.target.value)}
              value={password}
            />
          </div>
          {this._renderErrorMsg()}
          <button action="submit" className="btn">Sign in</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  requestLogin: React.PropTypes.func.isRequired,
  errorMsg: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    errorMsg: state.auth.error,
  };
}

export default connect(mapStateToProps, { requestLogin })(Login);
