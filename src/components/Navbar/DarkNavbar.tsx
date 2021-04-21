import React from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import ACMLogo from "../../assets/images/acm-light.png";
import { useHistory } from "react-router-dom";
import "./DarkNavbar.css";
const { Header } = Layout;

interface NavbarProps {
  selectedPage: string;
}

const DarkNavbar = ({ selectedPage }: NavbarProps) => {
  const history = useHistory();
  const { logout } = useAuth0();

  const navigate = (MenuParams: any) => {
    if (MenuParams.key === "logout") {
      logout();
    } else history.push(`/${MenuParams.key}`);
  };

  return (
    <Header>
      <LogoComponent>
        <img
          alt="ACMLogo"
          src={ACMLogo}
          onClick={() => (window.location.href = "https://www.acmutd.co/")}
        />
      </LogoComponent>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedPage]}
        onSelect={navigate}
      >
        {/*<Menu.Item key="applications">Applications</Menu.Item>*/}
        <Menu.Item key="profile">Profile</Menu.Item>
        <Menu.Item key="calendar">Calendar</Menu.Item>
        <Menu.Item key="applications">Application</Menu.Item>
        <Menu.Item style={{ float: "right" }} key="logout">
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const LogoComponent = styled.div`
  img {
    height: 64px;
    float: left;
    padding: 10px;
  }
`;

export default DarkNavbar;
