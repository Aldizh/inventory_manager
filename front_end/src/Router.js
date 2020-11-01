import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./App";
import NavBar from './NavBar'
import Footer from './Footer'
import Create from "./Create";
import Shumice from "./Shumice";
import Pakice from "./Pakice";

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Route exact path="/create" render={innerProps => (
        <React.Fragment>
          <NavBar />
          <br/>
          <Create {...innerProps} />
          <Footer />
        </React.Fragment>
      )}/>
      <Route exact path="/shumice" render={innerProps => (
        <React.Fragment>
          <NavBar />
          <br/>
          <Shumice {...innerProps} />
          <Footer />
        </React.Fragment>
      )}/>
      <Route exact path="/pakice" render={innerProps => (
        <React.Fragment>
          <NavBar />
          <br/>
          <Pakice {...innerProps} />
          <Footer />
        </React.Fragment>
      )}/>
      <Route
        path="/dashboard"
        render={() => (
          <React.Fragment>
            <NavBar />
            <br/>
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={innerProps => <Dashboard handleLogout={props.handleLogout} {...innerProps} />}
              />
            </Switch>
            <Footer />
          </React.Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
