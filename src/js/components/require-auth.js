import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';
import { isAuthenticated } from '../reducers';

export default (unauthenticatedRoute) => (ComposedComponent) => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.router.push(unauthenticatedRoute);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.router.push(unauthenticatedRoute);
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props} />
      );
    }
  }

  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool,
    router: routerShape.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: isAuthenticated(state),
    };
  }

  return withRouter(connect(mapStateToProps)(RequireAuth));
}
