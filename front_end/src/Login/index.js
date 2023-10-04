import React from "react"
import { Button, Container, Form } from "reactstrap"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import "./styles.scss"

const LoginForm = ({ loginAnonymous, loginWithKey, t }) => {
  const handleLogin = () => {
    loginAnonymous().then(() => {
      window.location.reload()
    })
  }

  const handleLoginWithKey = () => {
    loginWithKey().then(() => {
      window.location.reload()
    })
  }

  return (
    <Form className="login">
      <Container className="loginBtns">
        <Button size="sm" className="loginBtn" onClick={handleLogin}>{t("anonymous")}</Button>
        <Button size="sm" className="loginBtn" onClick={handleLoginWithKey}>{t("authenticated")}</Button>
      </Container>
    </Form>
  )
}

LoginForm.propTypes = {
  loginAnonymous: PropTypes.any,
}

export default withTranslation()(LoginForm)
