import { ROUTE_HOME } from "@/constants/endpoint";
import { magic } from "../lib/magic-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const login = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Please Enter Email Address");
    } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
      setErrorMsg("Invalid Email Address");
    } else {
      setErrorMsg("");
      setLoading(true);
      try {
        const DIDToken = await magic.auth.loginWithMagicLink({ email });
        if (DIDToken) {
          router.push(ROUTE_HOME);
        }
      } catch (e) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(false);
    };
    const handleRouteChangeError = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);
  return (
    <>
      <Head>
        <title>Login-Nextflix</title>
      </Head>
      <div className="h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
        <div className="absolute bg-slate-950 rounded-lg h-fit overflow-hidden top-[50%] left-[50%] p-8 md:p-16 opacity-90 translate-x-[-50%] translate-y-[-50%]">
          <h2 className="font-bold text-3xl md:text-4xl pb-8 text-white">
            Sign In
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-fit min-w-[250px] md:min-w-[300px]"
          >
            <div>
              <input
                type="text"
                placeholder="Enter Email"
                onChange={handleChange}
                className="input input-bordered input-secondary w-full bg-white text-slate-950"
              />
              {errorMsg && (
                <p className="font-bold pt-1 text-white">{errorMsg}</p>
              )}
            </div>

            <button
              className="btn btn-secondary mt-8 w-full"
              type="submit"
              disabled={loading}
            >
              {!loading ? (
                <>Sign In</>
              ) : (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
