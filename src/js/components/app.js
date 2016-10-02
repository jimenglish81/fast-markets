import React, { PropTypes } from 'react';
import Header from '../containers/header';

const App = (props) => {
  return (
    <div className="fast-markets">
      <Header />
      <div className="fast-markets-body">
        {props.children}
      </div>
      <footer className="fast-markets-footer">
        <small>Powered by IG</small>
      </footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
