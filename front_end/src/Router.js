import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./App";
import GeoData from "./GeoData";

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Route exact path="/geo_data" render={innerProps => <GeoData {...innerProps} />} />
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
              <Route
                path="/dashboard/:announcementId"
                render={subProps => (
                  <React.Fragment>
                    {/* <Switch>
                      <Route
                        exact
                        path="/dashboard/:announcementId"
                        render={(innerProps) => (
                          <Announcement {...innerProps} />
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/:announcementId/edit"
                        render={(innerProps) => (
                          <React.Fragment>
                            <Crumb
                              to={`/dashboard/${
                                subProps.match.params.announcementId
                              }/edit`}
                            >
                              {'Edit Announcement'}
                            </Crumb>
                            <Announcement {...innerProps} />
                          </React.Fragment>
                        )}
                      />
                    </Switch> */}
                  </React.Fragment>
                )}
              />
            </Switch>
          </React.Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
