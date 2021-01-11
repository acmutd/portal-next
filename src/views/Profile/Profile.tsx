import React from "react";
import { Tabs, Layout } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Profile.css";
import { Card } from "antd";
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
            <h1 style={{ color: "white", marginBottom: 20 }}>
              Application History:
            </h1>
            {user_profile.profile?.past_applications ? (
              user_profile.profile.past_applications.map((app) => (
                <div className="border sepFlexBox">
                  <h2 style={{ color: "white" }}>{app.name}</h2>
                  <h2 style={{ color: "white" }}>
                    |&nbsp;&nbsp;&nbsp;{new Date(app.submitted_at).toDateString()}
                  </h2>
                </div>
              ))
            ) : (
              <p>No applications submitted yet.</p>
            )}
          </TabPane>
          <TabPane tab="Shortcuts" key={3}>
            <h1 style={{ color: "white", marginBottom: 20 }}>Quick Links:</h1>
            <ul className="linkList" style={{ fontSize: 20 }}>
              <li>
                <a href="https://acmutd.co/discord">ACM Discord</a>
              </li>
              <li>
                <a href="https://www.facebook.com/acmatutd/">ACM Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/acmutd/">ACM Instagram</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/acmutd/">
                  ACM LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.acmutd.co/">ACM Website</a>
              </li>
            </ul>
          </TabPane>
          {/*<TabPane tab="Badges" key={3}>
            Content 3
                </TabPane>*/}
          <TabPane tab="Settings" key={4}>
            <h1 style={{ color: "white", marginBottom: 20 }}>
              Your Profile Data:{" "}
            </h1>
            <p>
              <strong>Email:</strong> {user_profile.profile?.email}
            </p>
            <p>
              <strong>Name:</strong> {user_profile.profile?.first_name}{" "}
              {user_profile.profile?.last_name}
            </p>
            <p>
              <strong>NetID:</strong> {user_profile.profile?.net_id}
            </p>
            <p>
              <strong>Major:</strong> {user_profile.profile?.major}
            </p>
            <p>
              <strong>University:</strong> {user_profile.profile?.university}
            </p>
            <p>
              <strong>Classification:</strong>{" "}
              {user_profile.profile?.classification}
            </p>
            <button
              className="apply-button"
              onClick={() => history.push("/newprofile")}
              style={{ margin: 0 }}
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
