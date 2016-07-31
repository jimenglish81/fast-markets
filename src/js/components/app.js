import React, { PropTypes } from 'react';
import Header from './header';

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
