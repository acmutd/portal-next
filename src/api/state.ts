import { atom, selector } from "recoil";
// import { getCookie } from "../acmApi/cookieManager";
import verify from "./actions/initialize";
import get_profile from "./actions/profile";
import get_applications from "./actions/application";

export const jwt = atom({
  key: "jwt",
  default: {
    token: "",
    isSet: false,
  },
});

// will automatically re-evaluate if the jwt changes
export const auth = selector({
    key: "auth",
    get: async ({get}) => {
        return await verify(get(jwt).token);
    },
});

export const profile = selector({
  key: "profile",
  get: async ({get}) => {
    return await get_profile(get(jwt).token);
  }
});

export const application = selector({
  key: "application",
  get: async ({get}) => {
    return await get_applications(get(jwt).token);
  }
});