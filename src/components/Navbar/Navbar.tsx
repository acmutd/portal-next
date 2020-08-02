import React from "react";
import { ReactComponent as NavbarLogo } from "../../assets/svgs/logo.svg";
import { ReactComponent as NavbarMenu } from "../../assets/svgs/menu.svg";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const colors = {
  white: `rgba(255,255,255,1)`,
  black: `rgba(0,0,0,1)`,
};

interface NavbarProps {
  onMenu(): void;
}

const Navbar = ({ onMenu }: NavbarProps) => {
  return (
    <NavbarComponent>
      <div className="navbar-bar">
        <div className="navbar-content">
          <div className="navbar-start">
            <NavbarLogo width="70px" height="70px" />
          </div>
          <div className="navbar-center">
            {/* Only show the divisions and Join Us buttons on either side of menu if on web */}
            {isMobile ? (
              <div />
            ) : (
              <button className="navbar-button">Divisions</button>
            )}
            <button className="navbar-menu" onClick={onMenu}>
              <NavbarMenu />
            </button>
            {isMobile ? (
              <div />
            ) : (
              <button className="navbar-button">Join Us</button>
            )}
          </div>
          <div className="navbar-end">
            <img
              className="navbar-auth"
              src="https://i.ibb.co/YfD2TCk/nopfp.png"
              alt="User PFP"
            ></img>
          </div>
        </div>
      </div>
    </NavbarComponent>
  );
};

const NavbarComponent = styled.div`
  .navbar-bar {
    width: 100%;
    background: linear-gradient(to bottom, ${colors.white}, rgba(0, 0, 0, 0));
    padding: 2.5rem 6rem;
  }

  .navbar-content {
    width: 100%;
    position: relative;
    height: 5rem;
    display: flex;
    align-items: center;
  }

  /* nav center */
  .navbar-center {
    height: inherit;
    display: flex;
    align-items: center;
    position: absolute;
    left: 38%;
  }

  .navbar-button {
    font-size: 1.6rem;
    font-weight: bold;
    background: none;
    border: none;
    padding: 0.7rem 1.3rem;
  }

  .navbar-menu {
    padding: 0.6rem;
    margin: 0rem 2rem;
    background: none;
    border: none;

    -webkit-transition-duration: 0.8s;
    -moz-transition-duration: 0.8s;
    -o-transition-duration: 0.8s;
    transition-duration: 0.8s;

    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    transition-property: transform;
  }

  .navbar-menu:hover {
    -webkit-transform: rotate(270deg) scale(1.3);
    -moz-transform: rotate(270deg) scale(1.3);
    -o-transform: rotate(270deg) scale(1.3);
  }

  /* nav end */
  .navbar-end {
    position: absolute;
    right: 0px;
  }

  .navbar-auth {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export default Navbar;
