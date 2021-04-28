// Currently in Use
import React, { useEffect, useState } from "react";
import Typeform from "../Typeform/typeform";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutAuth0 = () => {
  const [typeform, setTypeform] = useState("NxomQTLD");

  const {
    isAuthenticated,
    logout,
    isLoading,
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
        logout({
          returnTo: "http://localhost:3000",
          client_id: process.env.REACT_APP_AUTH0_CLIENTID
        });
      } else {
        setTypeform("mtluTuj7");
      }
    }
  }, [isLoading]);

  return (
    <div>
      <Typeform
        tfLink={
          "https://acmutd.typeform.com/to/" +
          typeform
        }
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default LogoutAuth0;
