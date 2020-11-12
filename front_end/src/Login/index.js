import React from "react";
import styled from "@emotion/styled";
import { Button, Form } from "reactstrap";
import PropTypes from "prop-types";

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function LoginAnon(props) {
  return (
    <div style={{ margin: 'auto', textAlign: 'center', width: '20%' }}>
      <LoginForm {...props} />
    </div>
  );
}

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
    <Form>
      <ButtonRow>
        <Button onClick={handleLogin}> Hyr si Anonim </Button>
        <Button onClick={handleLoginWithKey}>Hyr me celes</Button>
      </ButtonRow>
    </Form>
  );
}

LoginForm.propTypes = {
  loginAnonymous: PropTypes.any
};
