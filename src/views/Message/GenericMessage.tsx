import React from "react";
import ReactLoading from "react-loading";
import Button from "../../components/OrangeButton/OrangeButton";
import styled from "styled-components";

interface message {
  title: string;
  desc?: string;
  buttonText?: string; // if not defined, don't show button
  buttonAction?: () => void;
  buttonURL?: string;
  loading?: boolean;
}

const GenericMessage = (props: message) => {
  return (
    <MessageComponent>
      <div className="container">
        <img
          className="acm-logo"
          src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png"
          alt="ACM Logo"
        />
        <h1 className="text">{props.title}</h1>
        {props.loading ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"white"}
            height={"10%"}
            width={"10%"}
          />
        ) : (
          <div>
            <h4 className="text">{props.desc}</h4>
            {props.buttonText && (
              <Button
                text={props.buttonText}
                onClick={props.buttonAction}
                redirectURL={props.buttonURL}
              />
            )}
          </div>
        )}
      </div>
    </MessageComponent>
  );
};

const MessageComponent = styled.div`
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
`;

export default GenericMessage;
