import React, { useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { jwt } from "../../api/state";
import { useRecoilState } from "recoil";

const Auth0Authorize = () => {
  const [token, setToken] = useRecoilState(jwt);
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
      }
    })();
  }, [isLoading, isAuthenticated, token, setToken, getAccessTokenSilently]);

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    (async (): Promise<void> => {
      await loginWithRedirect({
        redirectUri: `${window.location.origin}/authorize`,
      });
    })();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isAuthenticated) {
    let userPath = sessionStorage.getItem("og-path");
    userPath = userPath === null ? "/" : userPath;
    return <Redirect to={userPath} />; // use Redirect in place of history.push() to keep from updating during existing state transition
  }

  return (
    <AuthorizeComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">Authorization in Progress... </h1>
      </div>
    </AuthorizeComponent>
  );
};

const AuthorizeComponent = styled.div`
  .container {
    display: flex;
    background-color: black;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .acm-logo {
    width: 20%;
  }
  .text {
    color: white;
    margin: 30px;
    font-family: ;
  }
  .retry-button {
    outline: none;
    border: 1px solid transparent;
    margin: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
    padding: 8px 18px;
    min-height: 48px;
    background-color: rgb(243, 126, 3);
    color: rgb(255, 255, 255);
    border-radius: 4px;
    font-size: 20px;
  }
  .retry-button:hover {
    background-color: rgb(247, 152, 52);
  }
`;

export default Auth0Authorize;
