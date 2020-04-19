import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import Router from "./Router";
import { app, isLoggedIn, loginAnonymous, loginWithKey, logoutUser } from "./Stitch";
import * as serviceWorker from "./serviceWorker";
import Login from "./Login";

export const history = createBrowserHistory({ basename: "/dashboard" });

const MyApp = props =>
  isLoggedIn() ? (
    <Router history={history} handleLogout={() => logoutUser(app.currentUser)} />
  ) : (
    <Login loginAnonymous={loginAnonymous} loginWithKey={loginWithKey} />
  );

ReactDOM.render(<MyApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();