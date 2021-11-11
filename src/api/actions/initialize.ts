import * as jwt from "jsonwebtoken";
import axios from "axios";
import * as Sentry from "@sentry/react";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { decoded_jwt, auth_status } from "../../config/interface";

const verify = async (authToken: string): Promise<auth_status> => {

  if (authToken === undefined || authToken === "") {
    return {
      jwt: authToken,
      is_verified: false,
    };
  }

  // await new Promise(resolve => setTimeout(resolve, 5000));
  const decodedToken: decoded_jwt = (jwt.decode(authToken, {
    complete: true,
  }) as any).payload;
  const user_email = decodedToken["https://acmutd.co/email"];
  Sentry.setUser({
    id: decodedToken.sub,
    email: user_email,
  });

  const decoded_idp = "auth0";

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const auth: auth_status = await axios
    .get(
      (process.env.REACT_APP_CLOUD_FUNCTION_URL as string) +
        "/" +
        decoded_idp +
        "/verify-jwt",
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

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_GCP_APIKEY,
  storageBucket: process.env.REACT_APP_GCP_BUCKET_URL,
});

export const firebaseStorage = getStorage(firebaseApp);

export default verify;
