import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Auth from './containers/auth/auth';
import CheckAuth from './containers/auth/check-auth';
import Sprints from './components/sprints';
//import CookieSessionStore from './session-stores/cookie';
//import CheckSession from './containers/auth/check-session';

const AuthenticatedRoute = CheckAuth('login', (isAuth) => !isAuth);
const UnauthenticatedRoute = CheckAuth('sprints', (isAuth) => isAuth)(Auth);
//const session = new CookieSessionStore();
//const injectSession = (Component) => (<Component session={session} />);
//const InitialRoute = CheckSession(session)(UnauthenticatedRoute);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UnauthenticatedRoute} />
    <Route path="login" component={UnauthenticatedRoute} />
    <Route path="sprints" component={AuthenticatedRoute(Sprints)} />
  </Route>
);
