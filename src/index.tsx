import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config/auth0_config";
import { Provider } from "react-redux";
import store from "./store/store";

console.log(config);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain as string}
      clientId={config.clientId as string}
      redirectUri={window.location.origin}
      audience={config.audience as string}
      scope={"read:current_user update:current_user_metadata"}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// 4 things we need to do

// Add auth0
// Add redux (this will take the most time)
// Add api calling class to make stuff simple skip
// Add device detect

// provider/context pattern
// variables that need to be accessed everywhere
// isAuthenticated

// Redux Tutorial

// Store (just a json)
// Action (enums that dictate what operations can be performed in english) Login, Logout !!!!!
// Reducer (just a function that gets called when you want to do an action)

// 7 dispatches, effects, ...
// dispatches are basically setters, effects are asynchronous reducers ish
