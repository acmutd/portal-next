import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config/auth0_config";
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";
import Loading from "./views/Message/Loading";
import { RecoilRoot as GlobalState } from "recoil";
import Error from "./views/Message/Error";

/*
Sentry Initialization:

Sentry acts to organize error reports in an intuitive fashion.
It is a catch all that records most issues that take place in
your application on the sentry dashboard. The set up for sentry in this application is 
seen below. For more info go to:

ACM Sentry how to guide: https://docs.google.com/document/d/1jD4rd2_0TvC2RyjU3XNs1HudUsQBH8kBFLHsKOEvPgc
Sentry docs: https://docs.sentry.io/
*/

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  release: process.env.npm_package_version,
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={
        window.location.origin +
        window.location.pathname +
        window.location.search
      }
      audience={config.audience}
      scope={"read:current_user update:current_user_metadata"}
      useRefreshTokens={true}
    >
      <Sentry.ErrorBoundary fallback={<Error />}>
        <React.Suspense fallback={<Loading />}>
          <GlobalState>
            <App />
          </GlobalState>
        </React.Suspense>
      </Sentry.ErrorBoundary>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
