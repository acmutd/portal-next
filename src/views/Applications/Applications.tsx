import React from "react";
import { Layout, Card } from "antd";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar/DarkNavbar";
import { useHistory } from "react-router-dom";
import "./Applications.css";
const { Content } = Layout;

const currApps = [
  // {
  //   name: "Education Officer Application",
  //   link: "/edu",
  //   extra: "https://www.acmutd.co/education",
  //   description: (
  //     <p>
  //       Want to gain leadership experience, give back to the community, and
  //       become more involved with ACM? Become an{" "}
  //       <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
  //       program, Technical Interview Prep, and various technical workshops
  //       throughout the semester. We are looking for creative individuals who are
  //       passionate about CS, understand the basics of event planning, work well
  //       in a team, and want to lend a hand to the community! Applications close{" "}
  //       <strong>January 31st, 2020 at 11:59 CST</strong>. But this semester we
  //       will be doing <strong>rolling interviews</strong> and the positions may
  //       fill before the deadline. Thus, it is recommended to submit your
  //       application as soon as possible.
  //     </p>
  //   ),
  // },
  // {
  //   name: "Education Officer Application",
  //   link: "/edu",
  //   description: (
  //     <p>
  //       Want to gain leadership experience, give back to the community, and
  //       become more involved with ACM? Become an{" "}
  //       <strong>ACM Education Officer</strong>! ACM Education runs the Mentor
  //       program, Technical Interview Prep, and various technical workshops
  //       throughout the semester. We are looking for creative individuals who are
  //       passionate about CS, understand the logistics of event planning, work
  //       well in a team, and want to lend a hand to the community!
  //     </p>
  //   ),
  // },
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
        applications like this portal and the several others (which can be
        viewed on the{" "}
        <a href="https://github.com/acmutd" target="_blank">
          ACM Github
        </a>
        ) then fill out our application!
      </p>
    ),
  },
  {
    name: "Media Officer Application",
    link: "/media",
    description: (
      <p>
        ACM Media our newest creative team behind all the marketing and design
        responsibilities that encompass ACM at UTD.
      </p>
    ),
  },
  {
    name: "Participation Survey $50",
    link: "/survey",
    description: (
      <p>
        Fill out the ACM Participation Survey so that we can help better support
        you with improved opportunities at ACM! This survey will cover questions
        about all the various divisions in ACM. By filling out this survey you
        will be entered in a <strong>raffle to win $50</strong>!!! Your feedback
        about events at ACM will be taken into consideration and if you have
        more to share feel free to engage with us on Discord!
      </p>
    ),
  },
];

const Applications = () => {
  const history = useHistory();

  const cardApps = currApps.map((app, index) => (
    <Grid item xs={12} md={6} lg={4} key={index}>
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
