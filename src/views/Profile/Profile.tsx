import React, { useEffect, useState } from "react";
import { Tabs, Layout, List, Avatar } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Profile.css";
import axios from "axios";
import { getCookie } from "../../acmApi/cookieManager";
const { Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    load_data();
  }, []);

  const load_data = async () => {
    const authToken = getCookie("CF_Authorization") as string;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/auth0/profile",
        config
      )
      .then((res) => {
        setProfileData(res.data);
      });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar selectedPage="profile" />
      <Content>
        <Tabs defaultActiveKey="1" tabPosition="left">
          {/*<TabPane tab="Events" key={1}>
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
                  </TabPane>*/}
          <TabPane tab="Past Applications" key={2}>
            Content 2
          </TabPane>
          {/*<TabPane tab="Badges" key={3}>
            Content 3
                </TabPane>*/}
          <TabPane tab="Settings" key={4}>
            hi
            {/*profileData?.first_name*/}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

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
