import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

export default (unauthenticatedRoute) => (ComposedComponent) => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        hashHistory.push(unauthenticatedRoute);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        hashHistory.push(unauthenticatedRoute);
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props} />
      );
    }
  }

  RequireAuth.propTypes = {
    isAuthenticated: React.PropTypes.bool,
  };

  function mapStateToProps({ auth: { isAuthenticated } }) {
    return {
      isAuthenticated,
    };
  }

  return connect(mapStateToProps)(RequireAuth);
}
