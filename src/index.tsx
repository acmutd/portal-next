import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config/auth0_config";
import { Provider } from "react-redux";
import store from "./store/store";

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