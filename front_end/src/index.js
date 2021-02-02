import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios'
import Router from './Router';
import NavBar from './NavBar';
import Footer from './Footer';
import {
  app, isLoggedIn, loginAnonymous, loginWithKey, logoutUser,
} from './Stitch';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import './index.css';

export const history = createBrowserHistory();

class MyApp extends React.Component {
  state = { data: [] }

  async componentWillReceiveProps(nextProps) {
    const res = await axios.get('/api/datas')
    this.setState({ data: res.data })
  }

  render() {
    return isLoggedIn() ? (
      <>
        <NavBar />
        <br />
        <Router history={history} data={this.state.data} handleLogout={() => logoutUser(app.currentUser)} />
        <Footer />
      </>
    ) : (
      <>
        <NavBar />
        <br />
        <Login loginAnonymous={loginAnonymous} loginWithKey={loginWithKey} />
        <Footer />
      </>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
