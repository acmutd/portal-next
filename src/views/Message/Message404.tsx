import React from "react";
import Message from "./GenericMessage";

const Error = () => {
  return (
    <Message
      title="Oopsies"
      desc="Hello! You seem to have lost your way, let's get you back to safety."
      buttonText="Take Me Home"
      buttonURL="/"
    />
  );
};

export default Error;
