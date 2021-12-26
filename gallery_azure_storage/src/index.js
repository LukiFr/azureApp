import React from "react";
import ReactDOM from "react-dom";
import Gallery from "./components/Gallery";
import UploadFile from "./components/UploadFile";
import ProfileContent from "./components/ProfileContent";
import { SignOutButton } from "./components/SignOutButton";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <UnauthenticatedTemplate>
        <PageLayout />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <SignOutButton />
        <ProfileContent />
        <UploadFile />
        <Gallery />
      </AuthenticatedTemplate>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
