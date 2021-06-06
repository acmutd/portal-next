import React from "react";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../../api/state";
import { Route, Redirect } from "react-router-dom";

const GsuiteProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth_gsuite);

  return (
    <Route
      {...rest}
      render={() => {
        return auth_status.is_verified === true ? (
          Component
        ) : (
          <Redirect exact to="/gsuite" />
        );
      }}
    />
  );
};
export { GsuiteProtectedRoute };
