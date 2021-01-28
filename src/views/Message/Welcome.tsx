import React, { useEffect } from "react";
import Message from "./GenericMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { jwt } from "../../api/state";
import { useRecoilState } from "recoil";

const Welcome = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useRecoilState(jwt);

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        console.log(await getAccessTokenSilently());
        setToken({ token: await getAccessTokenSilently(), isSet: true });
      }
    };
    fn();
  }, [isLoading, isAuthenticated, token, getAccessTokenSilently, setToken]);

  return (
    <Message title="Welcome to ACM!" buttonText="Enter" buttonURL="/profile" />
  );
};

export default Welcome;
