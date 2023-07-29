import { useRouter } from "next/router";
import React from "react";
import PlayIcon from "../icons/play";

const Banner = () => {
  const router = useRouter();
  const hanleClick = () => {
    router.push("/video/0_44XEVOwek");
  };
  return (
    <>
      <section className="bg-cover h-screen bg-top py-32 w-full flex items-center bg-[url('https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg')]">
        <div className="container mx-auto flex items-center h-full text-white">
          <div className="w-full md:w-1/2 px-4 md:px-0">
            <h1 className="text-5xl font-medium mb-6 uppercase font-sans">
              Unlimited movies, <br /> TV shows and more
            </h1>
            <p className="text-xl mb-12">
              Watch anywhere. Cancel anytime. Ready to watch? Enter your email
              to create or restart your membership.
            </p>
            <button onClick={hanleClick} className="btn btn-secondary px-6">
              Play
              <PlayIcon />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
