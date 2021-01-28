import React, { useEffect, useState } from "react";
import Typeform from "../components/Typeform/typeform";
import Loading from "./Message/Loading";
import axios from "axios";
import { profile } from "../api/state";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import Unauthorized from "./Message/Unauthorized";
import * as Sentry from "@sentry/react";
import { useAuth0 } from "@auth0/auth0-react";

interface typeform_info {
  typeform_id: string;
  endpoint: string;
}

const Form = ({ typeform_id, endpoint }: typeform_info) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [signInAttempt, setSignInAttempt] = useState(false);
  const [url, setUrl] = useState("");
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const user_profile = useRecoilValue(profile);
  const history = useHistory();

  useEffect(() => {
    const load_data = async (): Promise<void> => {
      if (loading || signInAttempt) {
        return;
      }
      setLoading(true);
      setSignInAttempt(true);

      const authToken = await getAccessTokenSilently();

      if (authToken === undefined) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      axios
        .get(
          (process.env.REACT_APP_LOCAL_FUNCTION_URL as string) + endpoint,
          config
        )
        .then((res) => {
          setIsAuth(true);

          setUrl(
            "https://acmutd.typeform.com/to/" +
              typeform_id +
              "#" +
              new URLSearchParams(res.data).toString()
          );
          setLoading(false);
        })
        .catch((err) => {
          Sentry.captureException(err);
          setIsAuth(false);
          setLoading(false);
        });
    };
    load_data();
  }, [endpoint, getAccessTokenSilently, loading, signInAttempt, typeform_id]);

  useEffect(() => {
    if (isLoading || user_profile.exists || user_profile.isLoading) {
      return;
    }
    if (isAuthenticated) {
      history.push("/newprofile");
    }
  }, [isLoading, isAuthenticated, user_profile, history]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Unauthorized />;
  }

  return <Typeform tfLink={url} style={{ height: "100vh" }} />;
};

export default Form;
