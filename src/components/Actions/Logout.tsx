import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { jwt, auth } from "../../api/state";
import { deleteCookie } from "../../acmApi/cookieManager";
import ReactLoading from "react-loading";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const setJwt = useSetRecoilState(jwt);
  const auth_status = useRecoilValue(auth);
  const history = useHistory();

  useEffect(() => {
    if (!auth_status.is_verified) {
      history.push("/");
    }
  }, [auth_status])

  useEffect(() => {
    if (auth_status.is_verified) {
      deleteCookie("CF_Authorization");
      setJwt("");
      axios.get("http://acmutd.cloudflareaccess.com/cdn-cgi/access/logout");
      axios.get(`https://acmutd.auth0.com/v2/logout?client_id=${process.env.REACT_APP_AUTH0_PORTAL_CLIENTID as string}&returnTo=https://app.acmutd.co`);
    }
  });

  return (
    <LogoutComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">Logout in Progress...</h1>
        <ReactLoading type={"spinningBubbles"} color={"white"} height={'10%'} width={'10%'} />
      </div>
    </LogoutComponent>
  );
};

const LogoutComponent = styled.div`
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

export default Logout;
