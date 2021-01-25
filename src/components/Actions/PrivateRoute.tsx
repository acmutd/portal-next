import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth, jwt } from "../../api/state";

const PrivateRoute = ({ component: Component, path, ...rest }: any): any => {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const auth_status = useRecoilValue(auth);
  const setToken = useSetRecoilState(jwt);


  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
        // appState: { targetUrl: window.location.origin },
      });
      setToken(await getAccessTokenSilently());
    };
    fn();
  }, [isLoading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) => {
    return isAuthenticated === true ? Component : null;
  };

  const render2 = (props: any) => {
    return isAuthenticated === true ? <Component {...props} /> : null;
  };

  return <Route path={path} render={render2} {...rest} />;
};

export default withRouter(PrivateRoute);
