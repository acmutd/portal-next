import { Steps, Button, message } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button2 from "../../components/OrangeButton/OrangeButton";
import * as Sentry from "@sentry/react";
import axios from "axios";
import "./Discord.css";

const { Step } = Steps;

const DiscordPane = () => {
  const [current, setCurrent] = useState(0);
  const [stepComplete, setStepComplete] = useState(false);
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    user,
    loginWithRedirect,
  } = useAuth0();

  const next = () => {
    setStepComplete(false);
    setCurrent(current + 1);
  };

  const signin = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    };
    const result = await axios.get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/auth0/discord",
      config
    );
    console.log(result);
    if (result.data.discord_authentication) {
      setStepComplete(true);
    } else {
      await loginWithRedirect({
        appState: { targetUrl: "/profile" },
        connection: "Discord",
      });
    }
  };

  const steps = [
    {
      title: "Authentication",
      content: (
        <Fragment>
          <h3>Welcome to the discord integration utility.</h3>
          <p>
            Complete the following steps to link your ACM account to discord.
          </p>
          <p>
            This will help you sync your event attendence and activity from
            discord over to the portal.
          </p>
          {!stepComplete ? (
            <Fragment>
              {" "}
              <p>Step 1: Sign in with discord</p>{" "}
              <Button2 text="Sign in" onClick={signin} />{" "}
            </Fragment>
          ) : (
            <p>Thank you, please click next.</p>
          )}
        </Fragment>
      ),
    },
    {
      title: "Joining",
      content: (
        <Fragment>
          <h3>Joining the ACM Discord Server</h3>
          <p>
            Next we would like you to join the ACM Discord Server. 
          </p>
          <p>
            This will help you sync your event attendence and activity from
            discord over to the portal.
          </p>
          {!stepComplete ? (
            <Fragment>
              {" "}
              <p>Step 1: Sign in with discord</p>{" "}
              <Button2 text="Sign in" onClick={signin} />{" "}
            </Fragment>
          ) : (
            <p>Thank you, please click next.</p>
          )}
        </Fragment>
      ),
    },
    {
      title: "Verification",
      content: "Last-content",
    },
    {
      title: "Confirmation",
      content: "Last-content",
    },
  ];

  return (
    <Fragment>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            disabled={!stepComplete}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Verification Complete")}
          >
            Done
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default DiscordPane;
