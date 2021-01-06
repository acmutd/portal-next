import React from "react";
import styled from "styled-components";

const Error = () => {
    const retry = () => {
        // console.log("reshmi is the best");
    }

    return <ErrorComponent>
        <div className="container">
            <img className="acm-logo" src="https://acmutd.co/brand/General/Assets/Logos/favicon.png"/>
            <h1 className="text">Oops. We've run into an error.</h1>
            <h4 className="text">We're sorry about the inconvenience that this may have caused you</h4>
            <h4 className="text">If this error happens again please report it to <a href="mailto:development@acmutd.co">ACM Development</a></h4>
            <button className="retry-button" onClick={() => retry()}>Return Home</button>
        </div>
    </ErrorComponent>
}

const ErrorComponent = styled.div`
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

export default Error;