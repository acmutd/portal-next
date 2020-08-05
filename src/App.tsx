import React from "react";
import Homepage from "./views/HomePage";
import Division from "./views/Divisions";
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
            <Route path="/" component={Homepage} exact />
            <Route path="/divisions" component={Division} exact />
          </Switch>
        </BrowserView>

        <MobileView>
        <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/divisions" component={Division} exact />
          </Switch>
        </MobileView>
      </BrowserRouter>
    </div>
  );
}

export default App;
