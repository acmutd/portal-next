import React, { useEffect, useState } from "react";
import Typeform from "../components/Typeform/typeform";
import { vanity } from "../config/typeform_config";
import axios from "axios";
import { getCookie } from "../acmApi/cookieManager";

const Vanity = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [typeform, setTypeform] = useState("NxomQTLD");

  useEffect(() => {
    // load_data();
  }, [email]);

  const load_data = async () => {
    const authToken = getCookie("CF_Authorization") as string;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(
        (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/verify",
        config
      )
      .then((res) => {
        setEmail(res.data.email);
        const identifier = res.data.email.split("@")[0];
        setFirstName(identifier.split(".")[0]);
        setLastName(identifier.split(".")[1]);
      })
      .then(() => {
        if (email === "") {
          setTypeform("NxomQTLD");
        } else {
          setTypeform(vanity as string);
        }
      });
  };

  return (
    <div>
      <Typeform
        tfLink={
          "https://acmutd.typeform.com/to/" +
          typeform +
          "#email=" +
          email +
          "&name=" +
          firstName +
          "%20" +
          lastName
        }
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default Vanity;
