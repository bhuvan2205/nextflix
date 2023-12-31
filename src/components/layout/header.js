import Link from "next/link";
import { magic } from "../../lib/magic-client";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { darkTheme } from "@/data/atoms/theme";
import MoonIcon from "../icons/moon";
import SunIcon from "../icons/sun";
import { LOGOUT_ENDPOINT } from "@/constants/api-endpoints";
import axios from "axios";
import { useRouter } from "next/router";
import { ROUTE_LOGIN } from "@/constants/endpoints";

const Header = () => {
  const router = useRouter();
  const [theme, setTheme] = useAtom(darkTheme);

  const [emailId, setEmailId] = useState("User");
  const [didToken, setDidToken] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${didToken}`,
    };

    try {
      const response = await axios({
        url: LOGOUT_ENDPOINT,
        method: "post",
        headers: headers,
      });
      const { data } = response || {};
      if (data?.message) {
        router.push(ROUTE_LOGIN);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        if (email) {
          setEmailId(email);
          setDidToken(didToken);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  });

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home Page</Link>
              </li>
              <li>
                <Link href="/browse/my-list">Your Videos</Link>
              </li>
              <li>
                <Link href="/">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <span className="cursor-pointer font-bold normal-case text-xl">
            NextFlix
          </span>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="pb-2">
                <Link href={"/"} className="justify-between">
                  {emailId}
                </Link>
              </li>
              <li className="pb-2">
                <span>Settings</span>
              </li>
              <li className="pb-2 pl-2">
                <span onClick={() => setTheme(!theme)}>
                  Theme
                  {!!theme ? <MoonIcon /> : <SunIcon />}{" "}
                </span>
              </li>
              <li className="pb-2 pl-2">
                <button
                  className="badge badge-secondary flex items-center p-2 py-0"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
