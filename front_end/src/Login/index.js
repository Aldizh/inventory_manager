import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import { Card, CardBody, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import PropTypes from "prop-types";

const LoginLayout = styled.div`
  display: grid;
  grid-template-areas:
    "banner banner banner"
    "search list detail";
  grid-template-rows: 140px 1fr;
  grid-template-columns: 3fr 2fr 2fr;
  width: 100vw;
  min-height: 100vh;
  background: #5e9668;
`;

const LoginCard = styled(Card)`
  background-color: #383a3f !important;
  background-color: #3e4348 !important;
  background-color: #1f2124 !important;
  background-color: #011627 !important;
`;

const LoginContent = styled.div`
  grid-area: content;
  position: absolute;
  top: 150px;
`;

export default function LoginAnon(props) {
  return (
    <ErrorBoundary>
      <LoginLayout>
        <LoginContent>
          <LoginForm {...props} />
        </LoginContent>
      </LoginLayout>
    </ErrorBoundary>
  );
}

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export function LoginForm({ loginAnonymous, loginWithKey }) {
  const handleLogin = () => {
    loginAnonymous().then(() => {
      window.location.reload();
    });
  };

  const handleLoginWithKey = () => {
    loginWithKey().then(() => {
      window.location.reload();
    });
  };

  return (
    <LoginCard inverse color="dark">
      <CardBody>
        <Form>
          <ButtonRow>
            <Button onClick={handleLogin}>Log in as Anonymous</Button>
            <Button onClick={handleLoginWithKey}>Log in using API key</Button>
          </ButtonRow>
        </Form>
      </CardBody>
    </LoginCard>
  );
}

LoginForm.propTypes = {
  loginAnonymous: PropTypes.any
};
