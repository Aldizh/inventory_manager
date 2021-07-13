import * as React from 'react'
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom'
import Dashboard from './App'
import Create from './CreateSale'
import Show from './ShowSale'
import Sales from './Components/Sales'

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
          <Sales {...innerProps} category={'big'} />
        )}
      />
      <Route
        exact
        path="/pakice"
        render={(innerProps) => (
          <Sales {...innerProps} category={'small'} />
        )}
      />
      <Route path="/sales/:saleId" component={Show} />
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
)

export default Router
