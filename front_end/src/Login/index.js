import React from "react"
import { Redirect } from "react-router"
import axios from 'axios'
import { Button, Container, Form } from "reactstrap"
import { withTranslation } from "react-i18next"
import { loginAnonymous, loginWithKey, isLoggedIn  } from "../Realm"

import "./styles.scss"

const LoginForm = ({ t }) => {
  const handleGoogleLogin = () => {
    axios.get("/api/login").then(res => {
      // hits the google servers, once authenticated it will redirect to
      // the uri provided (api/auth_callback)
      window.location.href = res.data.authUrl // hit the google servers
    }).catch(err => console.log('error logging in', err))
  }

  const handleAnonymousLogin = () => {
    loginAnonymous().then(() => {
      window.location.reload()
    }).catch(err => console.log('error logging in', err))
  }

  const handleApiKeylogin = () => {
    loginWithKey().then(() => {
      window.location.reload()
    }).catch(err => console.log('error logging in', err))
  }

  return isLoggedIn() ?
    <Redirect to='/dashboard'/> :
    <Form className="login">
      <Container className="loginBtns">
        <Button size="sm" className="loginBtn" onClick={handleGoogleLogin}>{t("google")}</Button>
        <Button size="sm" className="loginBtn" onClick={handleAnonymousLogin}>{t("anonymous")}</Button>
        <Button size="sm" className="loginBtn" onClick={handleApiKeylogin}>{t("apiKey")}</Button>
      </Container>
    </Form>
}

export default withTranslation()(LoginForm)


