
import React, { Fragment, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TileGrid from "../../components/TileGrid/TileGrid";

import {
  authInterface,
  loginAction,
  logoutAction,
} from "../../actions/authenticate";
import { connect } from "react-redux";
import Menu from '../../components/Menu/menu'


interface HomePageProps {
  isLoggedIn: boolean;
  login(): void;
}
const HomePage = (props: HomePageProps) => {

  const [menu, setMenu] = useState(false);

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
