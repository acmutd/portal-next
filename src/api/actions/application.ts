import axios from "axios";
import * as Sentry from "@sentry/react";
import { application_set } from "../../config/interface";

const get_applications = async (authToken: string): Promise<application_set> => {
  if (authToken === undefined || authToken === "") {
    return {
      isLoading: true,
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const result: application_set = await axios
    .get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/auth0/applications",
      config
    )
    .then((res) => {
      return {
        ...res.data,
        isLoading: false,
      };
    })
    // 401 Unauthorized Error
    .catch((err) => {
      Sentry.captureException(err);
      return {
        isLoading: false,
      };
    });
  return result;
};

export default get_applications;
