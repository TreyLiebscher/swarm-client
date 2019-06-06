import React from 'react';
import { Route, Switch } from 'react-router';

// Module root components
import HomePage from './pages/home-page';
import SignupPage from './pages/signup-page';
import LogInPage from './pages/login-page';
import NotFoundPage from './pages/notfound-page';



export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/search/:searchString" component={HomePage} /> */}
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/login" component={LogInPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);