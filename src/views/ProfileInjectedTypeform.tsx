import React from "react";
import Typeform from "../components/Typeform/typeform";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../api/state";
import { unauthorized_form } from "../config/typeform_config";

interface message {
  typeform_id: string;
}

const CapitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const ProfileInjectedTypeform = ({ typeform_id }: message) => {
  const auth_status = useRecoilValue(auth_gsuite);

  if (auth_status.is_verified) {
    const email = auth_status.decoded_jwt!["email"];
    const name = email!.split("@")[0];
    const firstName = CapitalizeWord(name.split(".")[0]);
    const lastName = CapitalizeWord(name.split(".")[1]);

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
  }

  return (
    <div>
      <Typeform
        tfLink={"https://acmutd.typeform.com/to/" + unauthorized_form}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default ProfileInjectedTypeform;
