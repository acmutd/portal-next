import React, { useEffect, useState } from "react";
import Typeform from "../components/Typeform/typeform";
import { dev } from "../config/vanity_config";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const DevForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [typeform, setTypeform] = useState("NxomQTLD");

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

  useEffect(() => {
    console.log("user" + user);
    console.log("isloading" + isLoading);
    console.log("isauth" + isAuthenticated);
  });

  useEffect(() => {
    if (isLoading) {
      setTypeform("zrktcrjl");
    } else {
      if (isAuthenticated) {
        if (email == "") {
          setEmail(user.email);
          setName(user.nickname);
          setTypeform(dev as string);
        }
      } else {
        setName("unauthorized");
        setEmail("unauthorized");
        setTypeform("NxomQTLD");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      load_data();
    }
  }, [isAuthenticated, isLoading]);

  const load_data = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
    const accessToken = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(
        (process.env.REACT_APP_CLOUD_FUNCTION_URL2 as string) + "/verify",
        config
      )
      .then((res) => {
        setEmail(user.email);
        setName(user.nickname);
      })
      .then(() => {
        if (email === "") {
          setName("unauthorized");
          setEmail("unauthorized");
          setTypeform("NxomQTLD");
        } else {
          setTypeform(dev as string);
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
          name
        }
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default DevForm;
