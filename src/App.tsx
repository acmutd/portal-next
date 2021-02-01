import React, { useEffect } from "react";
import Message404 from "./views/Message/Message404";
import Form from "./views/Form";
import Applications from "./views/Applications/Applications";
import Profile from "./views/Profile/Profile";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Welcome from "./views/Message/Welcome";
import { media, pro, developer, tip } from "./config/typeform_config";
import Logout from "./components/Actions/Logout";
import CalendarPage from "./views/Calendar/Calendar";
import EventPage from "./views/Message/Event";
import * as Sentry from "@sentry/react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthRoute from "./components/Actions/AuthRoute";
import { jwt } from "./api/state";
import { useRecoilState } from "recoil";

/**
 * Note: Use Component with Capital C when using a protected route
 * AProtectedRoute = protected by Auth0
 * GProtectedRoute = protected by GSuite
 * Refactor at some point so that we have one protected route with prop?
 * Now that we have protected routes there's no point in protecting individual components
 * <Form /> has built in authentication verification, results in 2 api calls to the same endpoint
 */
function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useRecoilState(jwt);

  useEffect(() => {
    const fn = async () => {
      if (isAuthenticated && !token.isSet) {
        setToken({ token: await getAccessTokenSilently(), isSet: true });
        Sentry.setUser({
          email: user.email,
          id: user.sub,
        });
      }
    };
    fn();
  }, [isLoading, isAuthenticated, token, setToken, getAccessTokenSilently]);

  return (
    <div>
      <BrowserRouter>
        <BrowserView>
          <Switch>
            <Route path="/" component={Welcome} exact />
            <AuthRoute
              path="/newprofile"
              Component={
                <Form
                  typeform_id={pro}
                  endpoint="/auth0/create-blank-profile"
                />
              }
              exact
            />
            <AuthRoute path="/calendar" Component={<CalendarPage />} exact />
            <AuthRoute path="/profile" Component={<Profile />} exact />
            <AuthRoute
              path="/applications"
              Component={<Applications />}
              exact
            />
            <AuthRoute path="/checkin" Component={<EventPage />} />
            <AuthRoute
              path="/tip"
              Component={<Form typeform_id={tip} endpoint="/auth0/developer" />}
              exact
            />
            <AuthRoute
              path="/media"
              Component={
                <Form typeform_id={media} endpoint="/auth0/developer" />
              }
              exact
            />
            <AuthRoute
              path="/developer"
              Component={
                <Form typeform_id={developer} endpoint="/auth0/developer" />
              }
              exact
            />

            {/* General Routes for testing
            <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact />

            {/* Auth0 Protected Routes */}
            {/* <AProtectedRoute
              Component={<Form typeform_id={dev} endpoint="/auth0/verify" />}
              path="/dev"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={edu} endpoint="/auth0/verify" />}
              path="/edu"
              exact
            />
            <AProtectedRoute
              Component={
                <Form typeform_id={media} endpoint="/auth0/developer" />
              }
              path="/media"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={tip} endpoint="/auth0/developer" />}
              path="/tip"
              exact
            />  */}
            {/* <AProtectedRoute
              Component={
                <Form typeform_id={developer} endpoint="/auth0/developer" />
              }
              path="/developer"
              exact
            /> */}
            {/* <AProtectedRoute
              Component={
                <Form typeform_id={survey} endpoint="/auth0/developer" />
              }
              path="/survey"
              exact
            />
            <AProtectedRoute
              Component={<Applications />}
              path="/applications"
              exact
            />
            <AProtectedRoute Component={<Profile />} path="/profile" exact /> */}

            {/* Officer Exclusive Routes */}
            {/* <GProtectedRoute
              Component={
                <Form typeform_id={vanity} endpoint="/gsuite/verify" />
              }
              path="/vanity"
              exact
            /> */}

            {/* Authorization Routes, Will get activated by Cloudflare Access, Do Not Touch */}
            {/* <Route
              path="/auth0"
              render={(props) => <Authorize {...props} idp="auth0" />}
              exact
            />
            <Route
              path="/gsuite"
              render={(props) => <Authorize {...props} idp="gsuite" />}
              exact
            /> */}
            <Route path="/logout" component={Logout} exact />
            <Route path="/*" component={Message404} />
          </Switch>
        </BrowserView>

        <MobileView>
          <Switch>
            <Route path="/" component={Welcome} exact />
            <AuthRoute
              path="/newprofile"
              Component={
                <Form
                  typeform_id={pro}
                  endpoint="/auth0/create-blank-profile"
                />
              }
              exact
            />
            <AuthRoute path="/calendar" Component={<CalendarPage />} exact />
            <AuthRoute path="/profile" Component={<Profile />} exact />
            <AuthRoute
              path="/applications"
              Component={<Applications />}
              exact
            />
            <AuthRoute path="/checkin/*" Component={<EventPage />} />

            {/* General Routes for testing */}
            {/* <AProtectedRoute Component={<Homepage />} path="/test1" exact />
            <GProtectedRoute Component={<Homepage />} path="/test2" exact /> */}

            {/* Auth0 Protected Routes */}
            {/* <AProtectedRoute
              Component={<Form typeform_id={dev} endpoint="/auth0/verify" />}
              path="/dev"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={edu} endpoint="/auth0/verify" />}
              path="/edu"
              exact
            />
            <AProtectedRoute
              Component={
                <Form typeform_id={media} endpoint="/auth0/developer" />
              }
              path="/media"
              exact
            />
            <AProtectedRoute
              Component={<Form typeform_id={tip} endpoint="/auth0/developer" />}
              path="/tip"
              exact
            /> */}
            {/* <AProtectedRoute
              Component={
                <Form typeform_id={developer} endpoint="/auth0/developer" />
              }
              path="/developer"
              exact
            /> */}
            {/* <AProtectedRoute
              Component={
                <Form typeform_id={survey} endpoint="/auth0/developer" />
              }
              path="/survey"
              exact
            />
            <AProtectedRoute
              Component={<Applications />}
              path="/applications"
              exact
            />
            <AProtectedRoute Component={<Profile />} path="/profile" exact />
            <AProtectedRoute
              Component={<CalendarPage />}
              path="/calendar"
              exact
            /> */}

            {/* Officer Exclusive Routes */}
            {/* <GProtectedRoute
              Component={
                <Form typeform_id={vanity} endpoint="/gsuite/verify" />
              }
              path="/vanity"
              exact
            /> */}

            {/* Authorization Routes, Will get activated by Cloudflare Access, Do Not Touch */}
            {/* <Route
              path="/auth0"
              render={(props) => <Authorize {...props} idp="auth0" />}
              exact
            />
            <Route
              path="/gsuite"
              render={(props) => <Authorize {...props} idp="gsuite" />}
              exact
            /> */}
            <Route path="/logout" component={Logout} exact />
            <Route path="/*" component={Message404} />
          </Switch>
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
