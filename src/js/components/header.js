import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestLogout } from '../actions';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  }

  _handleLogout() {
    this.props.requestLogout();
  }

  renderItems() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return [
        <li className="nav__navbar__item" key={1}>
          <button className="nav__navbar__item__link" onClick={this._handleLogout}>
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
        <ul className="nav__navbar">
          {this.renderItems()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  requestLogout: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool,
};

function mapStateToProps({ auth: { isAuthenticated } }) {
  return {
    isAuthenticated,
  };
}

export default connect(mapStateToProps, { requestLogout })(Header);
