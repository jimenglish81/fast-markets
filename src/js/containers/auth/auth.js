import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../../components/auth/form';
import { requestAuthUser } from '../../actions';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
    };
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const { identifier, password } = this.state;
    this.props.requestAuthUser(identifier, password)
      .then((session) => this.props.onAuth(session));
  }

  _handleInputChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { identifier, password } = this.state;

    return (
      <AuthForm
        identifier={identifier}
        password={password}
        error={this.props.error}
        onFormSubmit={this._handleFormSubmit}
        onInputChange={this._handleInputChange}
      />
    );
  }
}

Auth.propTypes = {
  onAuth: React.PropTypes.func.isRequired,
  requestAuthUser: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

export default connect(mapStateToProps, { requestAuthUser })(Auth);
