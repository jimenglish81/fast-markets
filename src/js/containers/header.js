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
        <ul className="nav__navbar">
          <li className="nav__navbar__item" key={1}>
            <div className="nav__navbar__item__header">available</div>
            <span>{formatCurrency(availableCash, currency)}</span>
          </li>
          <li className="nav__navbar__item" key={2}>
            <div className="nav__navbar__item__header">profit/loss</div>
            <span>{formatCurrency(profitLoss, currency)}</span>
          </li>
          <li className="nav__navbar__item" key={3}>
            <button className="btn btn--slim btn--secondary" onClick={this._handleLogout}>
              Sign out
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
      session={},
    },
  } = state;
  const {
     availableCash,
     profitLoss,
     currency,
  } = session;

  return {
    availableCash,
    currency,
    isAuthenticated: isAuthenticated(state),
    profitLoss,
  };
}

export default connect(mapStateToProps, { unauthUser })(Header);
