import React from "react"
import { Button, Form } from "reactstrap"
import { withTranslation } from "react-i18next"
import styled from "@emotion/styled"
import PropTypes from "prop-types"

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

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
      <ButtonRow>
        <Button onClick={handleLogin}>{t("anonymous")}</Button>
        <Button onClick={handleLoginWithKey}>{t("authenticated")}</Button>
      </ButtonRow>
    </Form>
  )
}

LoginForm.propTypes = {
  loginAnonymous: PropTypes.any,
}

export default withTranslation()(LoginForm)
