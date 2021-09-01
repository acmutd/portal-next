import React from "react";
import Typeform from "../components/Typeform/typeform";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../api/state";

interface message {
  typeform_id: string;
}
const ProfileInjectedTypeform = (props: message) => {
  const auth_status = useRecoilValue(auth_gsuite);
  const email =
    auth_status.decoded_jwt === undefined
      ? undefined
      : auth_status.decoded_jwt["email"];
  const name = email!.split("@")[0];
  const firstName =
    name.split(".")[0].charAt(0).toUpperCase() + name.split(".")[0].slice(1);
  const lastName =
    name.split(".")[1].charAt(0).toUpperCase() + name.split(".")[1].slice(1);
  const typeform_id = props.typeform_id;

  return (
    <div>
      <Typeform
        tfLink={
          "https://acmutd.typeform.com/to/" +
          typeform_id +
          "#email=" +
          email +
          "&first_name=" +
          firstName +
          "&last_name=" +
          lastName
        }
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default ProfileInjectedTypeform;
