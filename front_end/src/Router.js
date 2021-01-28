import * as React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Dashboard from './App';
import Create from './Create';
import Shumice from './Shumice';
import Pakice from './Pakice';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Route
        exact
        path="/create"
        render={(innerProps) => (
          <Create {...innerProps} />
        )}
      />
      <Route
        exact
        path="/shumice"
        render={(innerProps) => (
          <Shumice {...innerProps} />
        )}
      />
      <Route
        exact
        path="/pakice"
        render={(innerProps) => (
          <Pakice {...innerProps} />
        )}
      />
      <Route
        path="/dashboard"
        render={() => (
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={(innerProps) => <Dashboard handleLogout={props.handleLogout} {...innerProps} />}
            />
          </Switch>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
