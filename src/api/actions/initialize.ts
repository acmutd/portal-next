import * as jwt from "jsonwebtoken";
import axios from "axios";
import * as Sentry from "@sentry/react";
import { decoded_jwt, auth_status } from "../../config/interface";

export const verify = async (authToken: string): Promise<auth_status> => {
    console.log(authToken);
    if (authToken === undefined ){
        return {
            jwt: authToken,
            is_verified: false,
        }
    }
  const decodedToken: decoded_jwt = (jwt.decode(authToken, {
    complete: true,
  }) as any).payload;
  Sentry.setUser({
    id: decodedToken.sub,
    email: decodedToken.email,
  });

  let decoded_idp;
  if ("custom" in decodedToken) {
    decoded_idp = "auth0";
  } else {
    decoded_idp = "gsuite";
  }

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const auth: auth_status = await axios
    .get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) + "/" + decoded_idp + "/verify-idp",
      config
    )
    .then((res) => {
      return {
        jwt: authToken,
        decoded_jwt: decodedToken,
        idp: res.data.idp,
        is_verified: true,
      };
    })
    // 401 Unauthorized Error
    .catch((err) => {
      Sentry.captureException(err);
      return {
        jwt: authToken,
        decoded_jwt: decodedToken,
        is_verified: false,
      };
    });
  return auth;
};
