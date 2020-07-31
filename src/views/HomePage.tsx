import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  authInterface,
  loginAction,
  logoutAction,
} from "../actions/authenticate";
import { connect } from "react-redux";
import { useAcmApi } from "../acmApi";

interface HomePageProps {
  isLoggedIn: boolean;
  login(): void;
}

const HomePage = (props: HomePageProps) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { createRole } = useAcmApi();
  const [response, setResponse] = useState("");

  const wrapperFunction = async () => {
    props.login();
    await loginWithRedirect();
  };

  const helloWrapper = async () => {
    // world()
    // setResponse(JSON.stringify(await hello({ world: "hello" })));
    setResponse(JSON.stringify(await createRole("test", {})));
  }

  return (
    <div>
      <button onClick={wrapperFunction}>Click me to sign in</button>
      {isAuthenticated ? (
          <div>
            <h1>authenticated</h1>
            <button onClick={helloWrapper}>Hello</button>
          </div>
      ) : (
        <h1>Not Authenticated</h1>
      )}


      {response}
    </div>
  );
};


const mapState = (state: any) => {
  return {
    isLoggedIn: state.authenticateReducer.isLoggedIn,
  };
};

const mapDispatch = (dispatch: (action: authInterface) => void) => {
  return {
    login: () => {
      dispatch(loginAction());
    },
    logout: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapState, mapDispatch)(HomePage);
