import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { jwt, auth } from "../../api/state";
import { getCookie } from "../../acmApi/cookieManager";

interface props {
  idp: string;
}

const Authorize = ({ idp }: props) => {
  const [Jwt, setJwt] = useRecoilState(jwt);
  const auth_status = useRecoilValue(auth);
  const [wait, setWait] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (Jwt === getCookie("CF_Authorization")) {
      return;
    }
    setJwt(getCookie("CF_Authorization") as string);
  });

  useEffect(() => {
    if (auth_status.is_verified && auth_status.idp === idp) {
      window.location.href = "/";
    }
    // window.location.reload();
  }, [auth_status, idp]);

  useEffect(() => {
      setTimeout(() => {
        setWait(true);
        window.location.reload();
      }, 2000);
  });

  useEffect(() => {
    if(!refresh) {
      setRefresh(true);

    }
  });

  const reload = () => {
    window.location.reload();
  };

  return (
    <AuthorizeComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">Authorization in Progress... {idp} </h1>
        {wait ? (
          <button className="retry-button" onClick={() => reload()}>
            Reauthenticate
          </button>
        ) : (
          <div></div>
        )}
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

export default Authorize;
