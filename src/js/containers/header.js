import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { unauthUser} from '../actions';
import { Link } from 'react-router';
import { isAuthenticated } from '../reducers';

// TODO - extract into component?
class Header extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  }

  _handleLogout() {
    this.props.unauthUser();
  }

  renderItems() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return [
        <li className="nav__navbar__item" key={1}>
          <button className="btn btn-logout" onClick={this._handleLogout}>
            Sign out
          </button>
        </li>
      ];
    } else {

    }
  }

  render() {
    return (
      <nav className="nav">
        <svg fill="yellow" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>
        <h2 className="nav__logo">
          FastMarkets
        </h2>
        <ul className="nav__navbar">
          {this.renderItems()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  unauthUser: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
  };
}

export default connect(mapStateToProps, { unauthUser })(Header);
