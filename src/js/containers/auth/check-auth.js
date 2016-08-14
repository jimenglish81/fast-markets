import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, routerShape } from 'react-router';
import { isAuthenticated } from '../../reducers';

export default (route, checkFn) => (ComposedComponent) => {
  class CheckAuth extends Component {
    componentWillMount() {
      if (checkFn(this.props.isAuthenticated)) {
        this.props.router.push(route);
      }
    }

    componentWillUpdate(nextProps) {
      if (checkFn(nextProps.isAuthenticated)) {
        this.props.router.push(route);
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props} />
      );
    }
  }

  CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool,
    router: routerShape.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: isAuthenticated(state),
    };
  }

  return withRouter(connect(mapStateToProps)(CheckAuth));
}
