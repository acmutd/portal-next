import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0ProtectedRoute = ({ Component, path, ...rest }: any) => {
  const { isAuthenticated } = useAuth0();

  //Save user location for redirect in Authorize
  sessionStorage.setItem("og-path", path);

  const render = () => {
    return isAuthenticated === true ? (
      Component
    ) : (
      <Redirect exact to="/authorize" />
    );
  };

  return <Route path={path} render={render} {...rest} />;
};
export default Auth0ProtectedRoute;
