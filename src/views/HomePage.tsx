
import { useAuth0 } from "@auth0/auth0-react";
import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TileGrid from "../components/TileGrid/TileGrid";

import {
  authInterface,
  loginAction,
  logoutAction,
} from "../actions/authenticate";
import { connect } from "react-redux";
import { useAcmApi } from "../acmApi";
import Menu from '../components/Menu/menu'


// interface HomePageProps {
//   isLoggedIn: boolean;
//   login(): void;
// }
const HomePage = () => {

  const [menu, setMenu] = useState(false);
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
    <Fragment>
        <Menu active={menu} onClose={() => setMenu(false)}/>
        <Navbar onMenu={() => setMenu(true)}/>
        <TileGrid />
    </Fragment>
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
