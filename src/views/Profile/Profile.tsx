import React from "react";
import styled from "styled-components";
import { Tabs, Layout, Menu, List, Avatar } from "antd";
import ACMLogo from "../../assets/images/acm-light.png";
import "./Profile.css";
const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
  return (
    <Layout className="layout">
      <Header>
        <LogoComponent>
          <img src={ACMLogo} />
        </LogoComponent>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Applications</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Events" key={1}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Applications" key={2}>
            Content 2
          </TabPane>
          <TabPane tab="Badges" key={3}>
            Content 3
          </TabPane>
          <TabPane tab="Settings" key={4}>
            Content 4
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

const LogoComponent = styled.div`
  img {
    height: 64px;
    float: left;
    padding: 10px;
  }
`;

export default Profile;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
