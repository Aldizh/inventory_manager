import React from "react"
import { Button, Form } from "reactstrap"
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
    <Form>
      <div className="loginBtns">
        <Button size="sm" className="loginBtn" onClick={handleLogin}>{t("anonymous")}</Button>
        <Button size="sm" className="loginBtn" onClick={handleLoginWithKey}>{t("authenticated")}</Button>
      </div>
    </Form>
  )
}

LoginForm.propTypes = {
  loginAnonymous: PropTypes.any,
}

export default withTranslation()(LoginForm)
