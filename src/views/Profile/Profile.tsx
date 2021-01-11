import React from "react";
import { Tabs, Layout } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Profile.css";
import { profile } from "../../api/state";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
const { Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
  const history = useHistory();
  const user_profile = useRecoilValue(profile);

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
            {user_profile.profile?.past_applications ? (
              user_profile.profile.past_applications.map((app) => (
                <h1>{app.name}</h1>
              ))
            ) : (
              <p>No applications submitted yet.</p>
            )}
          </TabPane>
          {/*<TabPane tab="Badges" key={3}>
            Content 3
                </TabPane>*/}
          <TabPane tab="Settings" key={4}>
            <h2 style={{ color: "white" }}>Your Profile Data: </h2>
            <p>Email: {user_profile.profile?.email}</p>
            <p>
              Name: {user_profile.profile?.first_name}{" "}
              {user_profile.profile?.last_name}
            </p>
            <p>NetID: {user_profile.profile?.net_id}</p>
            <button
              className="apply-button"
              onClick={() => history.push("/newprofile")}
            >
              Update Profile Information
            </button>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Profile;

/* const data = [
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
]; */
