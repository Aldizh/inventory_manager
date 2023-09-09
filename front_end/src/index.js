import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"

import store from "./store"
import Router from "./Router"
import NavBar from "./NavBar"
import Footer from "./Footer"
import {
  app,
  isLoggedIn,
  loginAnonymous,
  loginWithKey,
  logoutUser,
} from "./Realm"
import Login from "./Login"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

export const history = createBrowserHistory()

class MyApp extends React.Component {
  state = { data: [] }

  render() {
    return isLoggedIn() ? (
      <>
        <NavBar />
        <br />
        <Router
          history={history}
          handleLogout={() => logoutUser(app.currentUser)}
        />
        <Footer />
      </>
    ) : (
      <>
        <NavBar />
        <br />
        <Login loginAnonymous={loginAnonymous} loginWithKey={loginWithKey} />
        <Footer />
      </>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  rootElement,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
