import Layout from "@/components/layout/Layout";
import Banner from "@/components/ui/Banner";
import Carousel from "@/components/ui/Carousel";
import Head from "next/head";
import { getPexelsVideos } from "../lib/videos";

export default function Home({
  disneyVideos,
  popularVideos,
  productivityVideos,
  travelVideos,
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
