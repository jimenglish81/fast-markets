import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../../components/auth';
import { authUser } from '../../actions';

const isValid = (identifier, password) => {
  return identifier !== '' && password !== '';
};

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      validationMsg: '',
    };
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentWillReceiveProps({ error }) {
    if (error) {
      this.setState({
        identifier: '',
        password: '',
        validationMsg: error,
      });
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const { identifier, password } = this.state;
    const { isLoading } = this.props;

    if (isLoading) {
      return false;
    }

    if (isValid(identifier, password)) {
      this.props.authUser(identifier, password);
    } else {
      this.setState({
        identifier: '',
        password: '',
        validationMsg: 'You must add a valid username and password',
      });
    }
  }

  _handleInputChange(key, value) {
    this.setState({
      validationMsg: '',
      [key]: value,
    });
  }

  render() {
    const {
      identifier,
      password,
      validationMsg,
    } = this.state;

    return (
      <AuthForm
        identifier={identifier}
        password={password}
        error={validationMsg}
        onFormSubmit={this._handleFormSubmit}
        onInputChange={this._handleInputChange}
      />
    );
  }
}

Auth.propTypes = {
  authUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

function mapStateToProps({ auth: { error, isLoading } }) {
  return {
    error,
    isLoading,
  };
}

export default connect(mapStateToProps, { authUser })(Auth);
