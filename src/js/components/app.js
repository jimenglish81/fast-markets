import React, { PropTypes } from 'react';
import Header from '../containers/header';

const App = (props) => {
  return (
    <div className="minute-markets">
      <Header />
      <div className="minute-markets-body">
        {props.children}
      </div>
      <footer>
        <p>Powered by IG</p>
      </footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
