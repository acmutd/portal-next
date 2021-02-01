import React, { useEffect } from "react";
import { Route, withRouter, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwt, profile } from "../../api/state";
import Loading from "../../views/Message/Loading";

const ProfileRoute = ({ component: Component, path, ...rest }: any): any => {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [token, setToken] = useRecoilState(jwt);
  const user_profile = useRecoilValue(profile);
  const history = useHistory();

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
      }
    };
    fn();
  }, [isLoading, isAuthenticated, token]);

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: "localhost:3000" },
      });
      setToken({ token: await getAccessTokenSilently(), isSet: true});
    };
    fn();
  }, [isLoading, isAuthenticated, loginWithRedirect, path]);

  useEffect(() => {
    if (isLoading || user_profile.exists || user_profile.isLoading) {
      return;
    }
    if (isAuthenticated) {
      history.push("/newprofile");
    }
  }, [isLoading, isAuthenticated, user_profile]);

  const render = (props: any) => {
    return (isAuthenticated && user_profile.exists) === true ? (
      Component
    ) : (
      <Loading />
    );
  };

  return <Route path={path} render={render} {...rest} />;
};

export default withRouter(ProfileRoute);
