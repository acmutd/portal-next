import React from "react";
import { Layout, Card, Button } from "antd";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Applications.css";
const { Content } = Layout;

const currApps = [
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

const cardApps = currApps.map((app) => (
  <Grid item xs={4}>
    <Card title={app.name} bordered={false} hoverable>
      {app.description}
      <Button>Apply here!</Button>
    </Card>
  </Grid>
));

const Applications = () => {
  return (
    <Layout>
      <Navbar selectedPage="apps" />
      <Content>
        <Grid container spacing={3}>
          {cardApps}
        </Grid>
      </Content>
    </Layout>
  );
};

export default Applications;
