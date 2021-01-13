import { atom, selector } from "recoil";
import { getCookie } from "../acmApi/cookieManager";
import { verify } from "./actions/initialize";

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