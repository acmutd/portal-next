import React, { useEffect } from "react";
import { Layout, Card } from "antd";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar/DarkNavbar";
import { useHistory } from "react-router-dom";
import "./Applications.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue } from "recoil";
import { profile } from "../../api/state";
import Button from "../../components/OrangeButton/OrangeButton";
const { Content } = Layout;

const currApps = [
  {
    name: "Technical Interview Prep Program Application",
    link: "/tip",
    extra: "https://www.acmutd.co/education",
    description: (
      <p>
        Trying to land an internship? Most tech companies have{" "}
        <strong>both behavioral and technical interviews</strong>. Our technical
        interview prep program will prepare you for both and help you{" "}
        <strong>nail your next interview</strong>! We are piloting the program
        this Spring with a small cohort. The program consists of three parts
        every week, one of which is weekly workshops on Thursdays from 8:30-10pm
        CST.
      </p>
    ),
  },
  {
    name: "Education Officer Application",
    link: "https://apply.acmutd.co/education",
    extra: "https://www.acmutd.co/education",
    description: (
      <p>
        Want to gain leadership experience, give back to the community, and
        become more involved with ACM? Become an{" "}
        <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
        program, Technical Interview Prep, and various technical workshops
        throughout the semester. We are looking for creative individuals who are
        passionate about CS, understand the logistics of event planning, work
        well in a team, and want to lend a hand to the community!
      </p>
    ),
  },
  {
    name: "Development Officer Application",
    link: "/developer",
    extra: "https://github.com/acmutd",
    description: (
      <p>
        ACM Development provides students a platform to follow their passion in
        developing the next generation of software that{" "}
        <strong>powers our community</strong> to new heights. Using advanced
        cutting edge new technology, we seek to deliver{" "}
        <strong>innovative solutions</strong> to simplify and accelerate student
        growth and engagement within ACM. If you are interested in building
        applications like this portal and the several others then fill out our
        application!
      </p>
    ),
  },
  {
    name: "Media Officer Application",
    link: "/media",
    description: (
      <p>
        ACM Media is our newest creative team behind all the marketing and
        design responsibilities that encompass ACM at UTD. We're building a team
        of talented designers and marketing specialists to help conduct
        marketing campaigns and maximize attendance. Join us to help shape the
        brand and identity of the ACM organization!
      </p>
    ),
  },
  {
    name: "Win $30!",
    link: "/survey",
    description: (
      <p>
        Fill out the ACM Participation Survey so that we can help better support
        you with improved opportunities at ACM! This survey will cover questions
        about all the various divisions in ACM. By filling out this survey you
        will be entered in a <strong>raffle to win $30</strong>!!! Your feedback
        about events at ACM will be taken into consideration and if you have
        more to share feel free to engage with us on Discord!
      </p>
    ),
  },
];

const Applications = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const user_profile = useRecoilValue(profile);
  const history = useHistory();

  useEffect(() => {
    if (isLoading || user_profile.exists || user_profile.isLoading) {
      return;
    }
    if (isAuthenticated) {
      history.push("/newprofile");
    }
  }, [isLoading, isAuthenticated, user_profile, history]);

  const linkRedirect = (link: string) => {
    if (link.includes("http")) {
      window.location.href = link;
    } else history.push(link);
  };

  const cardApps = currApps.map((app, index) => (
    <Grid item xs={12} md={6} lg={4} key={index}>
      <Card title={app.name} bordered={false} hoverable>
        {app.description}
        <div className="flex">
          <Button text="Apply here!" onClick={() => linkRedirect(app.link)} />
          {app.extra && (
            <Button text="Learn more" onClick={() => linkRedirect(app.extra)} />
          )}
        </div>
      </Card>
    </Grid>
  ));

  return (
    <Layout>
      <Navbar selectedPage="applications" />
      <Content>
        <Grid container spacing={3}>
          {cardApps}
        </Grid>
      </Content>
    </Layout>
  );
};

export default Applications;
