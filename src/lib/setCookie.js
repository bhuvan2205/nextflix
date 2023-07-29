import { MAX_AGE } from "@/constants/cookie";
import { ROUTE_HOME } from "@/constants/endpoints";

const cookie = require("cookie");

export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.DEV_MODE !== "dev",
    path: ROUTE_HOME,
  });
  res.setHeader("Set-Cookie", setCookie);
};

export const removeTokenCookie = (res) => {
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: ROUTE_HOME,
  });

  res.setHeader("Set-Cookie", val);
};
