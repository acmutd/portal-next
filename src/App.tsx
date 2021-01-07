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
import { vanity, dev, edu, marketing } from "./config/typeform_config";

/**
 * Note: Use Component with Capital C when using a protected route
 * AProtectedRoute = protected by Auth0
 * GProtectedRoute = protected by GSuite
 * Refactor at some point so that we have one protected route with prop?
 * Now that we have protected routes there's no point in protecting individual components
 * <Form /> has built in authentication verification, results in 2 api calls to the same endpoint
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <BrowserView>
          <Switch>
            <Route path="/" component={Welcome} exact />

            {/* General Routes for testing */}
            <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact />

            {/* Auth0 Protected Routes */}
            <AProtectedRoute
              Component={<Form typeform_id={dev} endpoint="/verify" />}
              path="/dev"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={edu} endpoint="/verify" />}
              path="/edu"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={marketing} endpoint="/verify" />}
              path="/marketing"
              exact
            />

            {/* Officer Exclusive Routes */}
            <GProtectedRoute
              Component={<Form typeform_id={vanity} endpoint="/verify" />}
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
            <Route path="/" component={Welcome} exact />

            {/* General Routes for testing */}
            <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact />

            {/* Auth0 Protected Routes */}
            <AProtectedRoute
              Component={<Form typeform_id={dev} endpoint="/verify" />}
              path="/dev"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={edu} endpoint="/verify" />}
              path="/edu"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={marketing} endpoint="/verify" />}
              path="/marketing"
              exact
            />

            {/* Officer Exclusive Routes */}
            <GProtectedRoute
              Component={<Form typeform_id={vanity} endpoint="/verify" />}
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
