import React from "react";
import Message from "./GenericMessage";

const Error = () => {
  return (
    <Message
      title="Oops. We've run into an error."
      desc="We're sorry about the inconvenience that this may have caused you. If this error happens again please report it to ACM Development."
      buttonText="Return Home"
      buttonURL="/"
    />
  );
};

export default Error;
