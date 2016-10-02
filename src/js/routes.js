import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Auth from './containers/auth';
import CheckAuth from './containers/auth/check-auth';
import FastMarkets from './containers/fast-markets';

const AuthenticatedRoute = CheckAuth('login', (isAuth) => !isAuth);
const UnauthenticatedRoute = CheckAuth('trade', (isAuth) => isAuth)(Auth);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UnauthenticatedRoute} />
    <Route path="login" component={UnauthenticatedRoute} />
    <Route path="trade" component={AuthenticatedRoute(FastMarkets)} />
  </Route>
);
