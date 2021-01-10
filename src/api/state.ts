import { atom, selector } from "recoil";
import { getCookie } from "../acmApi/cookieManager";
import verify from "./actions/initialize";
import get_profile from "./actions/profile";

export const jwt = atom({
  key: "jwt",
  default: getCookie("CF_Authorization") as string,
});

// will automatically re-evaluate if the jwt changes
export const auth = selector({
    key: "auth",
    get: async ({get}) => {
        return await verify(get(jwt));
    },
});

export const profile = selector({
  key: "profile",
  get: async ({get}) => {
    return await get_profile(get(jwt));
  }
})