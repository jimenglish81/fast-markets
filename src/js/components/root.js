import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import routes from '../routes';
import App from './app';

// try and use browserHistory
const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>
  );
};

export default Root;
