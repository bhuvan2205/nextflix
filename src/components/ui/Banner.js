import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <>
      <section className="bg-cover h-screen bg-center py-32 w-full flex items-center bg-[url('https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg')]">
        <div className="container mx-auto flex items-center h-full text-white">
          <div className="w-1/2">
            <h1 className="text-5xl font-medium mb-6 uppercase font-sans">
              Unlimited movies, <br /> TV shows and more
            </h1>
            <p className="text-xl mb-12">
              Watch anywhere. Cancel anytime. Ready to watch? Enter your email
              to create or restart your membership.
            </p>
            <button
              onClick={() => {
                console.log("Clicked");
              }}
              className="btn btn-secondary"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
          <div className="w-1/2 pl-16">
            <div
              className="h-64 w-full object-cover rounded-xl bg-[url('https://images.pexels.com/photos/4008733/pexels-photo-4008733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover"
              alt="Layout Image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
