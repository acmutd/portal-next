import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { jwt } from "../../api/state";
import { useRecoilState } from "recoil";
import axios from "axios";

const EventPage = () => {
  const history = useHistory();
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useRecoilState(jwt);
  const [apiComplete, setApiComplete] = useState(false);
  const [event, setEvent] = useState("");

  const start = () => {
    history.push("/profile");
  };

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
      }
    };
    fn();
  }, [isLoading, isAuthenticated, token]);

  useEffect(() => {
    const fn = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${await getAccessTokenSilently()}`,
        },
      };
      const result = await axios.get(
        (process.env.REACT_APP_LOCAL_FUNCTION_URL as string) + "/auth0/checkin" + "?checkpath=" + window.location.pathname,
        config
      );
      setApiComplete(true);
      setEvent(result.data.event_name);
    };
    fn();
  }, []);

  return (
    <EventComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">Thanks for attending!</h1>
        {apiComplete ? (
          <h3 className="text">
            Your participation at {event} has been recorded
          </h3>
        ) : null}
        <button className="retry-button" onClick={start}>
          Open Profile
        </button>
      </div>
    </EventComponent>
  );
};

const EventComponent = styled.div`
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

export default EventPage;
