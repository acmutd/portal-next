import * as React from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../../api/state";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";

/**
 * The AProtectedRoute will validate if the user is signed in to Auth0
 * The GProtectedRoute will validate if the user is signed in to G Suite
 * 
 * @param param0 should be the component in rendered form with any associated props included
 * For example if you would like to render the Homepage Component pass in like so
 * <GProtectedRoute Component={<Homepage />} path="/test2" exact />
 * 
 * For more complex components that require props pass it in like so
 * <AProtectedRoute
      Component={<Form typeform_id={edu} endpoint="/verify" />}
      path="/edu"
      exact
    />
 */
const AProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth);

  return (
    <Route
      {...rest}
      render={() => {
        return auth_status.is_verified === true &&
          auth_status.idp === "auth0" ? (
          Component
        ) : (
          <Redirect to="/auth0" />
        );
      }}
    />
  );
};

const GProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth);

  return (
    <Route
      {...rest}
      render={() => {
        return auth_status.is_verified === true &&
          auth_status.idp === "gsuite" ? (
          Component
        ) : (
          <Redirect exact to="/gsuite" />
        );
      }}
    />
  );
};
export { AProtectedRoute, GProtectedRoute };
