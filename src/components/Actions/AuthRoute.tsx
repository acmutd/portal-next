import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSetRecoilState } from "recoil";
import { jwt } from "../../api/state";
import Loading from "../../views/Message/Loading";

const AuthRoute = ({ Component, path, ...rest }: any): any => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(jwt);

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

  const render = (props: any) => {
    return isAuthenticated === true ? Component : <Loading />;
  };

  return <Route path={path} render={render} {...rest} />;
};

export default withRouter(AuthRoute);


