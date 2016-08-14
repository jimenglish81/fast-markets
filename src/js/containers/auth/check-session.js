import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestRestoreUser } from '../../actions'
import SessionStore from '../../session-stores/base';

export default (session) => (ComposedComponent) => {
  class CheckSession extends Component {
    componentWillMount() {
      const { cst, xst } = session.restore();

      if (cst && xst) {
        this.props.requestRestoreUser(cst, xst);
      }
    }

    _handleAuth(data) {
      //session.persist({ cst: data.CST, xst: data['X-SECURITY-TOKEN'] });
    }

    render() {
      return (
        <ComposedComponent onAuth={this._handleAuth} { ...this.props} />
      );
    }
  }

  CheckSession.propTypes = {
    requestRestoreUser: PropTypes.func.isRequired,
  };

  return connect(null, { requestRestoreUser })(CheckSession);
}
