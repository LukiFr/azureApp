import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  position: absolute;
  font-weight: bold;
`;

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <StyledButton onClick={() => handleLogin(instance)}>Sign in</StyledButton>
  );
};
