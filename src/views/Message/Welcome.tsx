import React, { useEffect } from "react";
import Message from "./GenericMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { jwt } from "../../api/state";
import { useRecoilState } from "recoil";
import * as Sentry from "@sentry/react";

const Welcome = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useRecoilState(jwt);

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
        Sentry.setUser({
          email: user.email,
          id: user.sub,
        });
      }
    };
    fn();
  }, [isLoading, isAuthenticated, token, getAccessTokenSilently, setToken]);

  return (
    <Message title="Welcome to ACM!" buttonText="Get Started!" buttonURL="/profile" />
  );
};

export default Welcome;
