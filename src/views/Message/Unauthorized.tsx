import React from "react";
import Message from "./GenericMessage";

const Unauthorized = () => {
  return (
    <Message title="Unauthorized" buttonText="Return Home" buttonURL="/" />
  );
};

export default Unauthorized;
