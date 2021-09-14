import React, { useEffect } from "react";
import Message404 from "./views/Message/Message404";
import Form from "./views/Form";
import Applications from "./views/Applications/Applications";
import Profile from "./views/Profile/Profile";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Welcome from "./views/Message/Welcome";
import GsuiteLanding from "./views/Message/GsuiteLanding";
import GenericMessage from "./views/Message/GenericMessage";
import {
  pro,
  vanity,
  email,
  event,
  form,
  mentor,
  mentee,
} from "./config/typeform_config";
import CalendarPage from "./views/Calendar/Calendar";
import EventPage from "./views/Message/Event";
import * as Sentry from "@sentry/react";
import { useAuth0 } from "@auth0/auth0-react";
import GsuiteProtectedRoute from "./components/Actions/GsuiteRoute";
import { jwt } from "./api/state";
import { useRecoilState } from "recoil";
import CustomForm from "./views/Message/CustomForm";
import GsuiteAuthorize from "./components/Actions/GsuiteAuthorize";
import ProfileInjectedTypeform from "./views/ProfileInjectedTypeform";
import Typeform from "./components/Typeform/typeform";
import Auth0ProtectedRoute from "./components/Actions/Auth0Route";
import Auth0Authorize from "./components/Actions/Auth0Authorize";
/**
 * Note: Use Component with Capital C when using a protected route
 * AuthRoute = protected by Auth0
 * GsuiteProtectedRoute = protected by GSuite
 * <Form /> has built in authentication verification, results in 2 api calls to the same endpoint
 */
function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
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
  }, [
    isLoading,
    isAuthenticated,
    token,
    setToken,
    getAccessTokenSilently,
    user,
  ]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/authorize" component={Auth0Authorize} />
          <Auth0ProtectedRoute
            path="/newprofile"
            Component={
              <Form typeform_id={pro} endpoint="/auth0/create-blank-profile" />
            }
            exact
          />
          <Auth0ProtectedRoute
            path="/calendar"
            Component={<CalendarPage />}
            exact
          />
          <Auth0ProtectedRoute path="/profile" Component={<Profile />} exact />
          <Auth0ProtectedRoute
            path="/applications"
            Component={<Applications />}
            exact
          />
          <Auth0ProtectedRoute path="/checkin" Component={<EventPage />} />
          <Auth0ProtectedRoute path="/forms" Component={<CustomForm />} />
          <Auth0ProtectedRoute
            path="/tobor"
            Component={<GenericMessage title="🤖" />}
          />
          <Route path="/gsuite" component={GsuiteAuthorize} />
          <GsuiteProtectedRoute
            path="/tothemoon"
            Component={<GsuiteLanding title="Yay gsuite auth works! 🚀" />}
          />
          <GsuiteProtectedRoute
            path="/vanity"
            Component={<ProfileInjectedTypeform typeform_id={vanity} />}
          />
          <GsuiteProtectedRoute
            path="/event"
            Component={<ProfileInjectedTypeform typeform_id={event} />}
          />
          <GsuiteProtectedRoute
            path="/email"
            Component={<ProfileInjectedTypeform typeform_id={email} />}
          />
          <GsuiteProtectedRoute
            path="/form"
            Component={<ProfileInjectedTypeform typeform_id={form} />}
          />
          <Auth0ProtectedRoute
            path="/mentor"
            Component={
              <Typeform
                tfLink={"https://acmutd.typeform.com/to/" + mentor}
                style={{ height: "100vh" }}
              />
            }
          />
          <Auth0ProtectedRoute
            path="/mentee"
            Component={
              <Typeform
                tfLink={"https://acmutd.typeform.com/to/" + mentee}
                style={{ height: "100vh" }}
              />
            }
          />
          <Route path="/*" component={Message404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
