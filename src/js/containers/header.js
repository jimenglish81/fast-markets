import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { unauthUser} from '../actions';
import FastMarketHeader from '../components/header';
import { formatCurrency } from '../utils';
import { isAuthenticated } from '../reducers';

class Header extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  }

  _handleLogout() {
    this.props.unauthUser();
  }

  renderItems() {
    const {
      availableCash,
      isAuthenticated,
      profitLoss,
      currency,
    } = this.props;

    if (isAuthenticated) {
      return (
        <ul className="nav__nav-bar">
          <li className="nav__nav-bar-item" key={1}>
            <div className="nav__nav-bar-item-header">available</div>
            <span>{formatCurrency(availableCash, currency)}</span>
          </li>
          <li className="nav__nav-bar-item" key={2}>
            <div className="nav__nav-bar-item-header">profit/loss</div>
            <span>{formatCurrency(profitLoss, currency)}</span>
          </li>
          <li className="nav__nav-bar-item" key={3}>
            <button className="btn btn--slim btn--secondary" onClick={this._handleLogout}>
              <span className="nav__signout--small">
                <svg fill="#f0f0f0" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                  />
                  <path
                    d="M0 0h24v24H0z"
                    fill="none"
                  />
                </svg>
              </span>
              <span className="nav__signout--large">Sign out</span>
            </button>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <FastMarketHeader>
        {this.renderItems()}
      </FastMarketHeader>
    );
  }
}

Header.propTypes = {
  availableCash: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  currency: PropTypes.string,
  unauthUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  profitLoss: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

function mapStateToProps(state) {
  const {
    auth: {
      session,
    },
  } = state;

  const {
     availableCash,
     profitLoss,
     currency,
  } = (session || {});

  return {
    availableCash,
    currency,
    isAuthenticated: isAuthenticated(state),
    profitLoss,
  };
}

export default connect(mapStateToProps, { unauthUser })(Header);
