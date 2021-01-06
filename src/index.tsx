import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config/auth0_config";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import store from "./store/store";
import Loading from "./views/Loading";
import { RecoilRoot as GlobalState } from "recoil";
import Error from "./views/Error";

Sentry.init({
  dsn:
    "https://4fb39ad271904932a9d767d44e14fd47@o457361.ingest.sentry.io/5574798",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain as string}
      clientId={config.clientId as string}
      redirectUri={window.location.origin + window.location.pathname}
      audience={config.audience as string}
      scope={"read:current_user update:current_user_metadata"}
    >
      <Provider store={store}>
        <Sentry.ErrorBoundary fallback={<Error />}>
          <React.Suspense fallback={<Loading />}>
            <GlobalState>
              <App />
            </GlobalState>
          </React.Suspense>
        </Sentry.ErrorBoundary>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
