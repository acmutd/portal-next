import React, { useEffect, useState, Fragment } from "react";
import Typeform from "../components/Typeform/typeform";
import Loading from "./Loading";
import { vanity } from "../config/typeform_config";
import axios from "axios";
import { getCookie } from "../acmApi/cookieManager";
import Unauthorized from "./Unauthorized";
import { URLSearchParams } from "url";

interface typeform_info {
  typeform_id: string;
}

const Form = ({ typeform_id }: typeform_info) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);

    const authToken = getCookie("CF_Authorization") as string;

    if (authToken === undefined) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios.get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/verify",
      config
    ).then((res) => {
      setIsAuth(true);
      setData(res.data);
    })

    setUrl("https://acmutd.typeform.com/to/" + typeform_id + "/" + new URLSearchParams(data).toString());
    setLoading(false);

  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Unauthorized />;
  }

  return (
    <Typeform
      tfLink={url}
      style={{ height: "100vh" }}
    />
  );
};

export default Form;
