import { ROUTE_LOGIN } from "@/constants/endpoints";
import Link from "next/link";
import { magic } from "../../lib/magic-client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { darkTheme } from "@/data/atoms/theme";

const Header = () => {
  const router = useRouter();
  const [theme, setTheme] = useAtom(darkTheme);

  const [emailId, setEmailId] = useState("User");
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await magic.user.logout();
      router.push(ROUTE_LOGIN);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setEmailId(email);
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
                  {!!theme ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 p-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  )}{" "}
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
