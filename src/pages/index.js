import Layout from "@/components/layout/Layout";
import Banner from "@/components/ui/Banner";
import Carousel from "@/components/ui/Carousel";
import Head from "next/head";
import { magic } from "../lib/magic-client";
import { getPexelsVideos } from "../lib/videos";
import { useEffect, useState } from "react";
import { ROUTE_LOGIN } from "@/constants/endpoint";
import { useRouter } from "next/router";

export default function Home({
  disneyVideos,
  popularVideos,
  productivityVideos,
  travelVideos,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const isUserLoggedIn = await magic.user.isLoggedIn();
      if (!isUserLoggedIn) {
        router.push(ROUTE_LOGIN);
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
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-red-600"></div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="NextFlix, Find your movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Layout>
          <Banner />
          <section className="container mx-auto overflow-hidden">
            <Carousel title="Disney" videos={disneyVideos} size="large" />
            <Carousel
              title="Watch again"
              videos={productivityVideos}
              size="medium"
            />
            <Carousel title="Travel" videos={travelVideos} size="small" />
            <Carousel title="Popular" videos={popularVideos} size="large" />
          </section>
        </Layout>
      </>
    </>
  );
}

export const getServerSideProps = async () => {
  const disneyVideos = await getPexelsVideos("travel");
  const popularVideos = await getPexelsVideos("popular");
  const productivityVideos = await getPexelsVideos("productivity");
  const travelVideos = await getPexelsVideos("travel");

  return {
    props: {
      disneyVideos,
      popularVideos,
      productivityVideos,
      travelVideos,
    },
  };
};
