import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { unauthUser} from '../actions';
import { Link } from 'react-router';
import { isAuthenticated } from '../reducers';

// TODO - container?
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
        <h2 className="nav__logo">1MinuteMarkets</h2>
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
