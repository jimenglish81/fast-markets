import React, { PropTypes } from 'react';

const Header = (props) => {
  return (
    <nav className="nav">
      <svg
        fill="#1997c6"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
      <h2 className="nav__logo">
        FastMarkets
      </h2>
      {props.children}
    </nav>
  );
}

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
