import React from "react";
import { useRecoilValue } from "recoil";
import { auth_gsuite } from "../../api/state";
import GenericMessage from "./GenericMessage";

// Sticks the signed in user's email into description of GenericMessage

interface message {
  title: string;
  buttonText?: string; // if not defined, don't show button
  buttonAction?: () => void;
  buttonURL?: string;
  loading?: boolean;
}
const GsuiteLanding = (props: message) => {
  const auth_status = useRecoilValue(auth_gsuite);
  const email =
    auth_status.decoded_jwt === undefined
      ? ""
      : auth_status.decoded_jwt["email"];

  return (
    <GenericMessage
      title={props.title}
      desc={email}
      buttonText={props.buttonText}
      buttonAction={props.buttonAction}
      buttonURL={props.buttonURL}
      loading={props.loading}
    />
  );
};

export default GsuiteLanding;
