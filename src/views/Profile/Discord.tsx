import { Steps, Button, message, Alert } from "antd";
import React, { Fragment, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button2 from "../../components/OrangeButton/OrangeButton";
import axios from "axios";
import "./Discord.css";

const { Step } = Steps;
interface discord_profile {
  snowflake: string;
  username: string;
  discriminator: string;
}

const DiscordPane = () => {
  const [current, setCurrent] = useState(0);
  const [stepComplete, setStepComplete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [access_token, setAccessToken] = useState("");
  const [successVerification, setSuccessVerification] = useState(false);
  const [discordProfile, setDiscordProfile] = useState<
    discord_profile | undefined
  >(undefined);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

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
      setAccessToken(result.data.access_token);
      setDiscordProfile({
        snowflake: result.data.snowflake,
        username: result.data.username,
        discriminator: result.data.discriminator,
      });
    } else {
      await loginWithRedirect({
        appState: { targetUrl: "/profile" },
        connection: "Discord",
      });
    }
  };

  const verify = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    };
    const data = {
      access_token: access_token,
      snowflake: discordProfile?.snowflake,
    };
    const result = await axios.post(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) +
        "/auth0/verify-discord",
      data,
      config
    );

    if (result.data.is_present && result.data.is_verified) {
      setSuccessVerification(true);
      setStepComplete(true);
    }
    console.log(result);
    setStep2Complete(true);
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
            <Fragment>
              <p>
                Discord Username:{" "}
                {discordProfile?.username + "#" + discordProfile?.discriminator}
              </p>
              <p>Thank you, please click next.</p>
            </Fragment>
          )}
        </Fragment>
      ),
    },
    {
      title: "Verification",
      content: (
        <Fragment>
          <h3>Joining the ACM Discord Server</h3>
          <p>
            All our events take place on the ACM Discord Server. Clicking verify
            will check whether you have joined the ACM Discord Server. You can
            join the{" "}
            <a href="https://acmutd.co/discord">
              ACM Discord Server by clicking here.
            </a>
          </p>
          <p>
            Once you join the ACM Discord Server please complete verifying
            yourself in the #verify-here channel before returning here.
          </p>

          {!step2Complete ? (
            <Fragment>
              {" "}
              <p>Step 2: Verify</p> <Button2 text="Verify" onClick={verify} />{" "}
            </Fragment>
          ) : successVerification ? (
            <p>Thank you, please click next.</p>
          ) : (
            <Fragment>
              {" "}
              <p>
                Verification Failed. Please review steps and try again.
              </p>{" "}
              <Button2 text="Verify" onClick={verify} />{" "}
            </Fragment>
          )}
        </Fragment>
      ),
    },
    {
      title: "Confirmation",
      content: (
        <Fragment>
          <p>
            Thank you for linking your discord account with the ACM Portal.
            You'll now be eligible to receive additional benefits.
          </p>
          <p>
            You'll also find that you now that have a verified role on discord
            to confirm that the linking was successful.
          </p>
          <p>
            You can refresh this page to review your linked discord profile
            information
          </p>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <Alert
        message="Warning"
        description="Hello, this feature is still in development, you're welcome to try it out but be warned that it may switch you out of your current account depending on your email."
        type="warning"
        showIcon
        closable
      />
      <br></br>
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
