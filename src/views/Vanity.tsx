import React, { useEffect, useState } from "react";
import Typeform from "../components/Typeform/typeform";
import vanity from "../config/vanity_config";
import axios from "axios";
import { getCookie } from "../acmApi/cookieManager";

const Vanity = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const authToken = getCookie("CF_Authorization") as string;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    }
    axios.get(process.env.REACT_APP_CLOUD_FUNCTION_URL as string + "/verify",config).then((res) => {
      setEmail(res.data.email);
      const identifier = res.data.email.split("@")[0];
      setFirstName(identifier.split(".")[0]);
      setLastName(identifier.split(".")[1]);
    })
  }, []);
  return (
    <div>
      <Typeform
        tfLink={
          "https://acmutd.typeform.com/to/" +
          vanity +
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

/**
 * TODO:
 *  - Retrieve CF_Authorization token
 *  - Decode and ensure that it is a valid JWT
 *  - Extract email from JWT
 *  - Extract first name and last name from email
 *  - ACM email format = firstname.lastname@acmutd.co
 *  - Update the tfLink parameter to include those two fields
 *  - Example tfLink = https://acmutd.typeform.com/to/YEN0HToX#email=harsha.srikara@acmutd.co&name=Harsha%20Srikara
 *
 *  - - - - - - - - - - - Second Iteration
 *  - Advanced security -> The exact typeform link can be found by inspect element, to really back the security of this there are two options
 *  - - Send the CF_Authorization token as an additional parameter in the typeform url & it will get passed to the backend
 *  - - However this causes that token to be saved in a db which isn't safe
 *  - - - Alternatively can directly ping the acm-core api with the CF_Authorization token from here & the api can cross validate it again & then accordingly fetch data from the db with the typeform fields
 *  - - - All this is tbd, not required for first iteration
 */

export default Vanity;
