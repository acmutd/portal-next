import React from "react";
import Message from "./GenericMessage";

const Loading = () => {
  return <Message title="Give us a moment..." loading={true} />;
};

export default Loading;
