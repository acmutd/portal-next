import React from "react";
import styled from "styled-components";
import { Tabs, Layout, Menu } from "antd";
import ACMLogo from "../assets/images/acm-light.png";
const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
  return (
    <Layout className="layout">
      <Header>
        <LogoComponent>
          <img src={ACMLogo} />
        </LogoComponent>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Applications</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Events" key={1}>
            Content 1
          </TabPane>
          <TabPane tab="Applications" key={2}>
            Content 2
          </TabPane>
          <TabPane tab="Badges" key={3}>
            Content 3
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

const LogoComponent = styled.div`
  img {
    height: 50px;
    float: left;
  }
`;

export default Profile;
