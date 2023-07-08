import { ROUTE_HOME } from "@/constants/endpoint";
import { getPexelVideo } from "@/lib/videos";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const { ID } = router.query || {};
  const handleClose = () => {
    router.push(ROUTE_HOME);
  };

  const video = {
    views: 12200,
    likes: 6000,
    publishTime: "1990-12-03",
    title: "Collection resource",
    channel: "Paramopunt pictures",
    description:
      "Pexels Collections are a way to group specific photos and videos into one unified gallery. This can be useful if, for example, you want to expose a specific subset of Pexels content to your users. You can access ",
  };

  const { description, title, publishTime, views, channel, likes } =
    video || {};
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-[60%] mx-auto">
      <div>
        <div className="rounded-md shadow-lg bg-gray-900 text-gray-100 overflow-hidden">
          <iframe
            id="player"
            type="text/html"
            src={`http://www.youtube.com/embed/${ID}?enablejsapi=1&origin=http://example.com&autoplay=1&rel=1`}
            frameborder="0"
            className="h-96 min-w-[360px] w-full"
          ></iframe>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg p-4">
          <div className="py-4">
            <h4 className="text-sm font-semibold">{publishTime}</h4>
            <h6 className="text-xl font-bold uppercase text-green-400 py-4">
              {title}
            </h6>
            <p className="text-lg text-justify">{description}</p>
          </div>
          <div className="stats flex flex-col">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">{likes / 1000}K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">{views / 1000}K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[10%]">
        <div
          className="h-12 w-12 bg-secondary hover:bg-secondary-focus rounded-full flex items-center justify-center cursor-pointer tooltip tooltip-top"
          data-tip="Go to home?"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Video;
