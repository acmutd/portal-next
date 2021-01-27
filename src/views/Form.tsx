import React, { useEffect, useState } from "react";
import Typeform from "../components/Typeform/typeform";
import Loading from "./Message/Loading";
import axios from "axios";
import { getCookie } from "../acmApi/cookieManager";
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
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    load_data();
  });

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
        // Origin: "http://localhost:3000",
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

  if (loading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Unauthorized />;
  }

  return <Typeform tfLink={url} style={{ height: "100vh" }} />;
};

export default Form;
