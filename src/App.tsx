import React from "react";
import Homepage from "./views/Deprecated/HomePage";
import Form from "./views/Form";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  AProtectedRoute,
  GProtectedRoute,
} from "./components/Actions/ProtectedRoute";
import { BrowserView, MobileView } from "react-device-detect";
import Authorize from "./components/Actions/Authorize";
import Welcome from "./views/Message/Welcome";

/**
 * Note: Use Component with Capital C when using a protected route
 * AProtectedRoute = protected by Auth0
 * GProtectedRoute = protected by GSuite
 * Refactor at some point so that we have one protected route with prop?
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <BrowserView>
          <Switch>
            <Route path="/" component={Welcome} exact/>

            {/* General Routes for testing */}
            <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact />

            {/* Officer Exclusive */}
            <GProtectedRoute
              Component={<Form typeform_id="YEN0HToX" endpoint="/verify" />}
              path="/vanity"
              exact
            />

            {/* Authorization Routes, Will get activated by Cloudflare Access, Do Not Touch */}
            <Route
              path="/auth0"
              render={(props) => <Authorize {...props} idp="Auth0" />}
              exact
            />
            <Route
              path="/gsuite"
              render={(props) => <Authorize {...props} idp="GSuite" />}
              exact
            />
          </Switch>
        </BrowserView>

        <MobileView>
          <Switch>
            <Route path="/" component={Welcome} exact/>

            {/* General Routes for testing */}
            <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact />

            {/* Officer Exclusive */}
            <GProtectedRoute
              Component={<Form typeform_id="YEN0HToX" endpoint="/verify" />}
              path="/vanity"
              exact
            />

            {/* Authorization Routes, Will get activated by Cloudflare Access, Do Not Touch */}
            <Route
              path="/auth0"
              render={(props) => <Authorize {...props} idp="Auth0" />}
              exact
            />
            <Route
              path="/gsuite"
              render={(props) => <Authorize {...props} idp="GSuite" />}
              exact
            />
          </Switch>
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
