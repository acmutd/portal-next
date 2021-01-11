import React from "react";
import { Layout, Card } from "antd";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar/DarkNavbar";
import { useHistory } from "react-router-dom";
import "./Applications.css";
const { Content } = Layout;

const currApps = [
  {
    name: "Education Officer Application",
    link: "/edu",
    extra: "https://www.acmutd.co/education",
    description: (
      <p>
        Want to gain leadership experience, give back to the community, and
        become more involved with ACM? Become an{" "}
        <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
        program, Technical Interview Prep, and various technical workshops
        throughout the semester. We are looking for creative individuals who are
        passionate about CS, understand the basics of event planning, work well
        in a team, and want to lend a hand to the community! Applications close{" "}
        <strong>January 31st, 2020 at 11:59 CST</strong>. But this semester we
        will be doing <strong>rolling interviews</strong> and the positions may
        fill before the deadline. Thus, it is recommended to submit your
        application as soon as possible.
      </p>
    ),
  },
  {
    name: "Education Officer Application",
    link: "/edu",
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
    name: "Education Officer Application",
    link: "/edu",
    description: (
      <p>
        Want to gain leadership experience, give back to the community, and
        become more involved with ACM? Become an{" "}
        <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
        program, Technical Interview Prep, and various technical workshops
        throughout the semester. We are looking for creative individuals who are
        passionate about CS, understand the logistics of event planning, work
        well in a team, and want to lend a hand to the community! Applications
        close January 31st, 2020 at 11:59 CST. But this semester we will be
        doing <strong>rolling interviews</strong> and the positions may fill
        before the deadline. Thus, it is recommended to submit your application
        as soon as possible.
      </p>
    ),
  },
  {
    name: "Education Officer Application",
    link: "https://apply.acmutd.co/education",
    description: (
      <p>
        Want to gain leadership experience, give back to the community, and
        become more involved with ACM? Become an{" "}
        <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
        program, Technical Interview Prep, and various technical workshops
        throughout the semester. We are looking for creative individuals who are
        passionate about CS, understand the logistics of event planning, work
        well in a team, and want to lend a hand to the community! Applications
        close January 31st, 2020 at 11:59 CST. But this semester we will be
        doing <strong>rolling interviews</strong> and the positions may fill
        before the deadline. Thus, it is recommended to submit your application
        as soon as possible.
      </p>
    ),
  },
  {
    name: "Education Officer Application",
    link: "https://apply.acmutd.co/education",
    description: (
      <p>
        Want to gain leadership experience, give back to the community, and
        become more involved with ACM? Become an{" "}
        <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
        program, Technical Interview Prep, and various technical workshops
        throughout the semester. We are looking for creative individuals who are
        passionate about CS, understand the logistics of event planning, work
        well in a team, and want to lend a hand to the community! Applications
        close January 31st, 2020 at 11:59 CST. But this semester we will be
        doing <strong>rolling interviews</strong> and the positions may fill
        before the deadline. Thus, it is recommended to submit your application
        as soon as possible.
      </p>
    ),
  },
];

const Applications = () => {
  const history = useHistory();

  const cardApps = currApps.map((app, index) => (
    <Grid item xs={4} key={index}>
      <Card title={app.name} bordered={false} hoverable>
        {app.description}
        <div className="flex"></div>
        <button
          className="apply-button"
          onClick={() => history.push(`${app.link}`)}
        >
          Apply here!
        </button>
        {app.extra && (
          <button
            className="apply-button"
            onClick={() => (window.location.href = `${app.extra}`)}
          >
            Learn More
          </button>
        )}
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
