import axios from "axios";
import * as Sentry from "@sentry/react";
import { profile } from "../../config/interface";

const get_profile = async (authToken: string): Promise<profile> => {
  if (authToken === undefined || authToken === "") {
    return {
      exists: false,
    };
  }

  //   await new Promise(resolve => setTimeout(resolve, 5000));
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const result: profile = await axios
    .get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/auth0/profile",
      config
    )
    .then((res) => {
      return {
        exists: res.data.exists,
        profile: res.data,
      };
    })
    // 401 Unauthorized Error
    .catch((err) => {
      Sentry.captureException(err);
      return {
        exists: false,
      };
    });
  return result;
};

export default get_profile;
