import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Welcome = () => {
    const history = useHistory();
    const start = () => {
        history.push("/applications");
    }

    return <WelcomeComponent>
        <div className="container">
            <img className="acm-logo" src="https://www.acmutd.co/brand/General/Assets/Logos/favicon.png" alt="ACM Logo"/>
            <h1 className="text">Welcome to ACM!</h1>
            <button className="retry-button" onClick={() => start()}>Get Started!</button>
        </div>
    </WelcomeComponent>
}

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
        font-family: 
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