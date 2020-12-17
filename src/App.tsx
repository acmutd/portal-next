import React from "react";
import Homepage from "./views/HomePage";
import Division from "./views/Divisions";
import Vanity from "./views/Vanity";
import DevForm from "./views/Dev_Application";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  BrowserView,
  MobileView,
} from "react-device-detect";

function App() {
  return (
    <div>
      <BrowserRouter>
        <BrowserView>
          <Switch>
            <Route path="/" component={DevForm} exact />
            <Route path="/divisions" component={Division} exact />
            <Route path="/vanity" component={Vanity} exact />
            <Route path="/home" component={Homepage} exact />
            <Route path="/dev" component={DevForm} exact />
          </Switch>
        </BrowserView>

        <MobileView>
        <Switch>
            <Route path="/" component={Vanity} exact />
            <Route path="/divisions" component={Division} exact />
            <Route path="/vanity" component={Vanity} exact />
            <Route path="/home" component={Homepage} exact />
            <Route path="/dev" component={DevForm} exact />
          </Switch>
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
