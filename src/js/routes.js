import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Auth from './containers/auth/auth';
import CheckAuth from './containers/auth/check-auth';
import Sprints from './containers/sprints';
import Chart from './components/chart';

const AuthenticatedRoute = CheckAuth('login', (isAuth) => !isAuth);
const UnauthenticatedRoute = CheckAuth('sprints', (isAuth) => isAuth)(Auth);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UnauthenticatedRoute} />
    // TODO - temp route while working on chart.
    <Route path="chart" component={Chart} />
    <Route path="login" component={UnauthenticatedRoute} />
    <Route path="sprints" component={AuthenticatedRoute(Sprints)} />
  </Route>
);
