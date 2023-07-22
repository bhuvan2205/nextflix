import { MAX_AGE } from "@/constants/cookie";

const cookie = require("cookie");

export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.DEV_MODE !== "dev",
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
};
