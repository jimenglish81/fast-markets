import React from 'react';
import { render } from 'react-dom';
import configureStore from './configure-store';
import Root from './components/root';

const store = configureStore();

render(
  <Root store={store} />
  , document.querySelector('.container'));
