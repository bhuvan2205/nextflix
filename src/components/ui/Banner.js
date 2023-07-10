import { useRouter } from "next/router";
import React from "react";

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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            </button>
          </div>
          {/* <div className="w-1/2 pl-16 hidden md:block">
            <div
              className="h-64 w-full object-cover rounded-xl bg-[url('https://images.pexels.com/photos/4008733/pexels-photo-4008733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover"
              alt="Layout Image"
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Banner;
