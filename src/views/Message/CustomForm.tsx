import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwt } from "../../api/state";
import { useRecoilState } from "recoil";
import { profile, application } from "../../api/state";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import Loading from "../Message/Loading";
import Form from "../../views/Form";
import { application as application_interface } from "../../config/interface";

const CustomForm = () => {
  const [typeformID, setTypeformID] = useState("NxomQTLD");
  const { isLoading, isAuthenticated } = useAuth0();
  const [token] = useRecoilState(jwt);
  const history = useHistory();
  const user_profile = useRecoilValue(profile);
  const apps = useRecoilValue(application);

  useEffect(() => {
    if (isLoading || user_profile.exists || user_profile.isLoading) {
      return;
    }
    if (isAuthenticated) {
      history.push("/newprofile");
    }
  }, [isLoading, isAuthenticated, user_profile, history]);

  useEffect(() => {
    console.log(apps);
    if ((apps.total as number) > 0) {
      apps.applications
        ?.filter((app: application_interface) => {
          return app.path_name === window.location.pathname;
        })
        .forEach((app: application_interface) => {
          setTypeformID(app.typeform_id);
        });
    }
  }, [apps, isAuthenticated, token.isSet]);

  return typeformID === "NxomQTLD" ? (
    <Loading />
  ) : (
    <Form typeform_id={typeformID} endpoint="/auth0/developer" />
  );
};

export default CustomForm;
