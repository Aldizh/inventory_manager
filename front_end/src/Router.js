import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./App";
import NavBar from './NavBar'
import Create from "./Create";

const Router = props => (
  <BrowserRouter>
    <NavBar />
    <br/>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Route exact path="/create" render={innerProps => <Create {...innerProps} />} />
      <Route
        path="/dashboard"
        render={() => (
          <React.Fragment>
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={innerProps => <Dashboard handleLogout={props.handleLogout} {...innerProps} />}
              />
            </Switch>
          </React.Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
