import React from "react";
import Homepage from "./views/HomePage";
import Division from "./views/Divisions";
import Vanity from "./views/Vanity";
import DevForm from "./views/Dev_Application";
import Form from "./views/Projects";
import Unauthorized from "./views/Unauthorized";
import Loading from "./views/Loading";
import Profile from "./views/Profile/Profile";
import Applications from "./views/Applications/Applications";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Logout from "./views/Logout";

/**
 * Goals for today
 *  - Duplicate the repo
 *  - Set one to use G Suite login
 *  - Set one to use Auth0 login
 *  - Work on the Auth0 one today
 *  - Create a home page that displays a bunch of applications
 *  - Create a /projects, /research, /dev, /interview and so on pages
 *  - Fetch data from backend if person already has a submitted application
 *  - Pass on that information and any other metadata to the typeform
 */

function App() {
  return (
    <div>
      <BrowserRouter>
        <BrowserView>
          <Switch>
            <Route
              path="/"
              render={(props) => <Form {...props} typeform_id="YEN0HToX" />}
              exact
            />
            <Route path="/loading" component={Loading} exact />
            <Route path="/divisions" component={Division} exact />
            <Route path="/vanity" component={Vanity} exact />
            <Route path="/home" component={Homepage} exact />
            <Route path="/dev" component={DevForm} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/apps" component={Applications} exact />
            <Route path="/logout" component={Logout} exact />
          </Switch>
        </BrowserView>

        <MobileView>
          <Switch>
            <Route path="/" component={Unauthorized} exact />
            <Route path="/divisions" component={Division} exact />
            <Route path="/loading" component={Loading} exact />
            <Route path="/vanity" component={Vanity} exact />
            <Route path="/home" component={Homepage} exact />
            <Route path="/dev" component={DevForm} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/apps" component={Applications} exact />
            <Route path="/logout" component={Logout} exact />
          </Switch>
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
