import Home from "@/components/icons/home";
import Layout from "@/components/layout/layout";
import ListItem from "@/components/ui/listItem";
import { ROUTE_HOME } from "@/constants/endpoints";
import { getIssuer } from "@/lib/getIssuer";
import { fetchFavouritedVideos } from "@/lib/videos";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const myList = ({ videos }) => {
  return (
    <>
      <Head>
        <title>My List</title>
        <meta name="description" content="NextFlix, Find your movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Layout>
          <section className="container mx-auto overflow-hidden min-h-screen">
            {!!videos?.length ? (
              <ListItem videos={videos} title="My List" />
            ) : (
              <>
                <h2 className="my-8 text-xl">
                  You don't have any Favourited videos
                </h2>
                <Link href={ROUTE_HOME} className="btn btn-secondary flex items-center w-fit">
                  Go to Home{" "}
                  <Home />
                </Link>
              </>
            )}
          </section>
        </Layout>
      </>
    </>
  );
};

export default myList;

export const getServerSideProps = async (context) => {
  const { token } = context?.req?.cookies;
  const issuer = await getIssuer(token);
  const videos = await fetchFavouritedVideos(token, issuer);

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
      videos,
    },
  };
};
