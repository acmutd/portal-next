import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { jwt_gsuite, auth_gsuite } from "../../api/state";
import { getCookie } from "../../acmApi/cookieManager";
import { useHistory, Redirect } from "react-router-dom";

const GsuiteAuthorize = () => {
  const [Jwt, setJwt] = useRecoilState(jwt_gsuite);
  const auth_status = useRecoilValue(auth_gsuite);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Case 1: user has no cf cookie and is not verified
    //            trigger cf to get cookie, go to case 2
    // Case 2: user has cf cookie and is not verified
    //            copy cookie to jwt_gsuite, verify, go to case 3
    // Case 3: user has cf cookie and is verified
    //            take user back to where they were going.
    // Case 4: user has no cf cookie and is verified
    //            copy case 1
    // Jwt.token === "" when initialized, Jwt.token === undefined when not initialized

    if (auth_status.is_verified || loading) {
      // Case 3
      return;
    } else {
      // If auth_status is not verified
      if (getCookie("CF_Authorization") === undefined) {
        // Case 1 & 4, CF cookie is missing
        // Refresh screen to trigger CF Access to get cookie
        setLoading(true);
        window.location.reload();
        // Go to case 2
      } else if (getCookie("CF_Authorization") !== undefined) {
        // Case 2, cookie present
        setLoading(true);
        setJwt({ token: getCookie("CF_Authorization") as string, isSet: true });
      } else {
        return;
      }
    }
  }, [auth_status, history, Jwt.token, setJwt, loading]);

  if (auth_status.is_verified) {
    // If user is verified, take user back to where they were going
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

export default GsuiteAuthorize;
