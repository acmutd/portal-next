import React from "react";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../../api/state";
import { Route } from "react-router-dom";
import Authorize from "./Authorize";

const GsuiteProtectedRoute = ({ Component, ...rest }: any) => {
  const auth_status = useRecoilValue(auth_gsuite);

  return (
    <Route
      {...rest}
      render={() => {
        return auth_status.is_verified === true ? Component : <Authorize />;
      }}
    />
  );
};
export default GsuiteProtectedRoute;
