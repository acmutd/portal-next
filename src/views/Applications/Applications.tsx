import React, { useEffect } from "react";
import { Layout } from "antd";
import { Card, CardHeader, Grid, CircularProgress, CardContent, CardActions } from '@material-ui/core';
import Navbar from "../../components/Navbar/DarkNavbar";
import { useHistory } from "react-router-dom";
import "./Applications.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue } from "recoil";
import { profile, application } from "../../api/state";
import Button from "../../components/OrangeButton/OrangeButton";
const { Content } = Layout;

const Applications = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const user_profile = useRecoilValue(profile);
  const open_applications = useRecoilValue(application);
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

  const cardApps = () => {
    return <Grid container alignItems="stretch" spacing={4}>
      {open_applications.applications?.map((app) => {
      if(app.active) {
        return <Grid item xs={6} md={6} lg={4}>
          <Card>
            <CardHeader title={app.typeform_name}/>
              <CardContent>{app.description}
              </CardContent>
              <CardActions style={{justifyContent: "center", paddingBottom: "20px"}}>
                <Button text="Apply here!" onClick={() => linkRedirect(`${app.path_name}`)} />
                {app.external_link && (
                  <Button text="Learn more" onClick={() => linkRedirect(app.external_link)} />
                )}
              </CardActions>
          </Card>
        </Grid>
      }
      })}
    </Grid>
  }

  return (
    <Layout>
      <Navbar selectedPage="applications" />
      <Content>
          {open_applications.isLoading ? <CircularProgress/> : cardApps()}
      </Content>
    </Layout>
  );
};

export default Applications;
