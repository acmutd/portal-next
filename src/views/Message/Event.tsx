import React, { useEffect, useState } from "react";
import Message from "./GenericMessage";
import { jwt } from "../../api/state";
import { useRecoilValue } from "recoil";
import axios from "axios";

const EventPage = () => {
  const token = useRecoilValue(jwt);
  const [apiComplete, setApiComplete] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    const fn = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) +
          "/auth0/checkin" +
          "?checkpath=" +
          window.location.pathname,
        config
      );
      setApiComplete(true);
      setEvent(result.data.event_name);
    };
    fn();
  }, [token]);

  return (
    <Message
      title="Thanks for attending!"
      loading={!apiComplete}
      desc={`Your participation at ${event} has been recorded`}
      buttonText="Open Profile"
      buttonURL="/profile"
    />
  );
};

export default EventPage;
