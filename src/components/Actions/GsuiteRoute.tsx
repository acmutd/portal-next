import React from "react";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../../api/state";
import { Route, Redirect } from "react-router-dom";

const GsuiteProtectedRoute = ({ Component, path, ...rest }: any) => {
  const auth_status = useRecoilValue(auth_gsuite);
  //Save user location for redirect in Authorize
  sessionStorage.setItem("og-path", window.location.pathname);

  const render = () => {
    return auth_status.is_verified === true ? (
      Component
    ) : (
      <Redirect exact to="/gsuite" />
    );
  };

  return <Route path={path} render={render} {...rest} />;
};
export default GsuiteProtectedRoute;
