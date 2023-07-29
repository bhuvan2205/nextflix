import Head from "next/head";
import { fetchWatchedVideos, getPopularVideos, getVideos } from "../lib/videos";
import Layout from "@/components/layout/layout";
import Carousel from "@/components/ui/carousel";
import Banner from "@/components/ui/banner";
import { getIssuer } from "@/lib/getIssuer";
import { ROUTE_LOGIN } from "@/constants/endpoints";

export default function Home({
  disneyVideos,
  popularVideos,
  productivityVideos,
  travelVideos,
  watchedVideos,
}) {
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
            {!!watchedVideos.length && (
              <Carousel
                title="Watched it again"
                videos={watchedVideos}
                size="small"
              />
            )}
            <Carousel
              title="Productivity"
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

export const getServerSideProps = async (context) => {
  const disneyVideos = await getVideos("disney");
  const popularVideos = await getPopularVideos();
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const { token } = context?.req?.cookies;
  const issuer = await getIssuer(token);
  const watchedVideos = await fetchWatchedVideos(token, issuer);

  if (!issuer) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTE_LOGIN,
      },
      props: {},
    };
  }

  return {
    props: {
      disneyVideos,
      popularVideos,
      productivityVideos,
      travelVideos,
      watchedVideos,
    },
  };
};
