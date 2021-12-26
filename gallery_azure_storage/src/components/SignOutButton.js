import React from "react";
import { useMsal } from "@azure/msal-react";
import styled from "styled-components";

function handleLogout(instance) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  font-weight: bold;
`;

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <StyledButton onClick={() => handleLogout(instance)}>Sign out</StyledButton>
  );
};
