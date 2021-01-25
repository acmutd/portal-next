import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { auth, jwt } from "../../api/state";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Welcome = () => {
  const history = useHistory();
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
  } = useAuth0();
  const auth_status = useRecoilValue(auth);
  const setToken = useSetRecoilState(jwt);

  const signin = async () => {
    if (isAuthenticated) {
      console.log(await getAccessTokenSilently());
    } else {
      loginWithRedirect({
        redirectUri: "http://localhost:3000",
      });
    }
  };

  const start = () => {
    history.push("/testing1");
  };

  useEffect(() => {
      console.log(auth_status);
  }, [auth_status])

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated) {
        setToken(await getAccessTokenSilently());
      }
    };
    fn();
  }, [isLoading, isAuthenticated]);

  return (
    <WelcomeComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">Welcome to ACM!</h1>
        <button className="retry-button" onClick={signin}>
          Log Helpful Information
        </button>
        <button className="retry-button" onClick={() => logout()}>
          Logout
        </button>
        <button className="retry-button" onClick={start}>
          Access Protected Page
        </button>
      </div>
    </WelcomeComponent>
  );
};

const WelcomeComponent = styled.div`
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

export default Welcome;
