import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"

import store from "./store"
import Router from "./Router"
import NavBar from "./NavBar"
import Footer from "./Footer"
import {
  isLoggedIn,
  loginWithGoogle,
  logoutUser,
} from "./Realm"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

export const history = createBrowserHistory()

class MyApp extends React.Component {
  state = { data: [] }

  render() {
    return (<>
      <NavBar
        handleLogout={logoutUser}
        isLoggedIn={isLoggedIn}
        loginWithGoogle={loginWithGoogle}
        history={history}
      /><br />
      <Router history={history}/>
      <Footer />
    </>)
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
// serviceWorker.register()
