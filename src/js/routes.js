import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Login from './components/auth/login';
import Sprints from './components/sprints';
import RequireAuth from './components/require-auth';
const WrappedRequireAuth = RequireAuth('login');

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="sprints" component={WrappedRequireAuth(Sprints)} />
  </Route>
);
