import '@/styles/globals.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { ROUTE_LOGIN } from "@/constants/endpoint";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const isUserLoggedIn = await magic.user.isLoggedIn();
      if (!isUserLoggedIn) {
        router.push(ROUTE_LOGIN);
      } else {
        setLoading(false);
      }
    })();
    const handleRouteComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 h-screen w-full">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-pink-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-pink-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-pink-600"></div>
      </div>
    );
  }
  return <Component {...pageProps} />
}
