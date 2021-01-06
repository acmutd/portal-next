import * as React from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../../api/state";
import { Route, Redirect } from "react-router-dom";

const AProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth);

  console.log(auth_status);
  return (
    <Route
      {...rest}
      render={() => {
        return (auth_status.is_verified === true && auth_status.idp === "Auth0") ? (
          <Component />
        ) : (
          <Redirect to="/auth0" />
        );
      }}
    />
  );
}

const GProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth);

  console.log(auth_status);
  return (
    <Route
      {...rest}
      render={() => {
        return (auth_status.is_verified === true && auth_status.idp === "GSuite") ? (
          <Component />
        ) : (
          <Redirect to="/gsuite" />
        );
      }}
    />
  );
}
export { AProtectedRoute, GProtectedRoute };
