import React, { useEffect, useRef, useState } from "react";
import { Tabs, Layout } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Profile.css";
import Button from "../../components/OrangeButton/OrangeButton";
import { profile } from "../../api/state";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { firebaseStorage as storage } from '../../api/firebase/config';
import { ref, uploadBytes } from 'firebase/storage';
// import DiscordPane from "./Discord";
const { Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
  const history = useHistory();
  const user_profile = useRecoilValue(profile);
  const { isLoading, isAuthenticated } = useAuth0();
  const [uploadReady, setUploadReady] = useState(false);
  const uploadRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isLoading || user_profile.exists || user_profile.isLoading) {
      return;
    }
    if (isAuthenticated) {
      history.push("/newprofile");
    }
  }, [isLoading, isAuthenticated, user_profile, history]);

  const handleResumeUploadReady = () => {
    if (uploadRef.current.files.length !== 1 ||
      (!uploadRef.current.files[0].name.endsWith(".pdf") &&
        !uploadRef.current.files[0].name.endsWith(".doc") &&
        !uploadRef.current.files[0].name.endsWith(".docx"))) return alert("Please make sure you upload a single file ending in .pdf, doc, or docx");
    setUploadReady(true);
  };
  const handleResumeUpload = () => {
    let extension = "pdf";
    const file = uploadRef.current.files[0];
    if (file.name.endsWith(".doc")) extension = "doc";
    else if (file.name.endsWith(".docx")) extension = "docx";

    const resumeRef = ref(storage, `${process.env.REACT_APP_GCP_RESUME_PATH}/${user_profile.profile?.sub}.${extension}`);
    uploadBytes(resumeRef, uploadRef.current.files[0]).then((result) => alert("Upload succeeded...")).catch((err) => alert("Upload failed. Please try again later..."));
    setUploadReady(false);
  };

  // const discPane =
  //   user_profile.profile?.discord_verified || false ? (
  //     <Fragment>
  //       <h1 style={{ color: "white", marginBottom: 20 }}>
  //         Your Discord Profile:
  //       </h1>
  //       <p>
  //         <strong>Discord ID:</strong> {user_profile.profile?.snowflake}
  //       </p>
  //       <p>
  //         <strong>Username:</strong>{" "}
  //         {user_profile.profile?.username +
  //           "#" +
  //           user_profile.profile?.discriminator}
  //       </p>
  //     </Fragment>
  //   ) : (
  //     <DiscordPane />
  //   );

  return (
    <Layout>
      <Navbar selectedPage="profile" />
      <Content>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Event Participation" key={1}>
            <h1 style={{ color: "white", marginBottom: 20 }}>Event History:</h1>
            {user_profile.profile?.past_events ? (
              user_profile.profile.past_events
                .map((event, index) => (
                  <div className="border sepFlexBox" key={index}>
                    <h2 style={{ color: "white" }}>{event.name}</h2>
                    <h2 style={{ color: "white" }}>
                      |&nbsp;&nbsp;&nbsp;
                      {new Date(event.submitted_at).toDateString()}
                    </h2>
                  </div>
                ))
                .reverse()
            ) : (
              <p>No events attended yet.</p>
            )}
          </TabPane>
          <TabPane tab="Past Applications" key={2}>
            <h1 style={{ color: "white" }}>Submitted Applications:</h1>
            <p>
              Note: If you recently submitted an application, it may take a
              short period of time before appearing
            </p>
            {user_profile.profile?.past_applications ? (
              user_profile.profile.past_applications
                .map((app, index) => (
                  <div className="border sepFlexBox" key={index}>
                    <h2 style={{ color: "white" }}>{app.name}</h2>
                    <h2 style={{ color: "white" }}>
                      |&nbsp;&nbsp;&nbsp;
                      {new Date(app.submitted_at).toDateString()}
                    </h2>
                  </div>
                ))
                .reverse()
            ) : (
              <p>No applications submitted yet.</p>
            )}
          </TabPane>
          <TabPane tab="Shortcuts" key={3}>
            <h1 style={{ color: "white", marginBottom: 20 }}>Quick Links:</h1>
            <ul className="linkList" style={{ fontSize: 20 }}>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://acmutd.co/discord"
                >
                  ACM Discord
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/acmatutd/"
                >
                  ACM Facebook
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.instagram.com/acmutd/"
                >
                  ACM Instagram
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/company/acmutd/"
                >
                  ACM LinkedIn
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.acmutd.co/"
                >
                  ACM Website
                </a>
              </li>
            </ul>
          </TabPane>
          <TabPane tab="Upload Resume" key={"KEKW"}>
            <div id="upload_container">
              <input id="resume_input" type="file" ref={uploadRef} onChange={handleResumeUploadReady} />
              {!uploadReady ?
                <>
                  <label id="resume_input_label" htmlFor="resume_input">Upload Resume</label>
                </> :
                <Button
                  text="Confirm Upload"
                  onClick={handleResumeUpload}
                />}
            </div>
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
            <Button
              text="Update Profile Information"
              redirectURL="/newprofile"
            />
          </TabPane>
          {/* <TabPane tab="Discord" key={5}>
            {discPane}
          </TabPane> */}
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
