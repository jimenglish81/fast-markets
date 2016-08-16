import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestUnauthUser} from '../actions';
import { Link } from 'react-router';
import { isAuthenticated } from '../reducers';

class Header extends Component {
  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  }

  _handleLogout() {
    this.props.requestUnauthUser();
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
        <h2 className="logo">F1</h2>
        <ul className="nav__navbar">
          {this.renderItems()}
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  requestUnauthUser: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
  };
}

export default connect(mapStateToProps, { requestUnauthUser })(Header);
