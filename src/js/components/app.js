import React, { PropTypes } from 'react';
import Header from './header';

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
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
