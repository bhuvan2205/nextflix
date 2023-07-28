import Dislike from "@/components/icons/dislike";
import HeartIcon from "@/components/icons/heart";
import Home from "@/components/icons/home";
import LikeIcon from "@/components/icons/like";
import ThunderIcon from "@/components/icons/thunder";
import { STATS_ENDPOINT } from "@/constants/api-endpoints";
import { DEFAULT_LIKE_DISLIKE } from "@/constants/default";
import { ROUTE_HOME } from "@/constants/endpoints";
import { fetchVideoData, getVideoById, handleLike } from "@/lib/videos";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Video = ({ video }) => {
  const router = useRouter();
  const { Id } = router.query || {};
  const [descView, setDescView] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [like, setLike] = useState(DEFAULT_LIKE_DISLIKE);
  const handleClose = () => {
    router.push(ROUTE_HOME);
  };

  const handleVideoLike = (value) => {
    handleLike(Id, value, setIsUpdating, setLike);
  };

  useEffect(() => {
    fetchVideoData(Id, setLike);
  }, []);

  const { description, title, publishTime, views, likes } = video || {};
  return (
    <>
      {isUpdating && (
        <div className="absolute bg-black opacity-60 top-0 bottom-0 left-0 right-0 z-40">
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-pink-600"></div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-[60%] mx-auto">
        <div>
          <div className="rounded-md shadow-lg bg-gray-900 text-gray-100 overflow-hidden relative">
            <iframe
              id="player"
              type="text/html"
              src={`http://www.youtube.com/embed/${Id}?enablejsapi=1&origin=http://example.com&autoplay=1&rel=1`}
              frameborder="0"
              className="h-96 min-w-[360px] w-full"
            ></iframe>
            <div className="absolute top-[60%] left-[10%]">
              <div className="flex gap-4">
                <button
                  className="rounded-full p-2 w-12 h-12 border-solid border-2 border-white  flex items-center justify-center"
                  onClick={() => handleVideoLike(1)}
                >
                  <LikeIcon fill={like === 1 ? "#00fff2" : "#000"} />
                </button>
                <button
                  className="rounded-full p-2 w-12 h-12 border-solid border-2 border-white  flex items-center justify-center"
                  onClick={() => handleVideoLike(2)}
                >
                  <Dislike fill={like === 2 ? "#f00524" : "#000"} />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg p-4">
            <div className="py-4">
              <h4 className="text-sm font-semibold">{publishTime}</h4>
              <h6 className="text-xl font-bold uppercase text-green-400 py-4">
                {title}
              </h6>
              <p
                className={`text-lg text-justify ${
                  descView ? "overflow-scroll h-60" : "line-clamp-4"
                }`}
              >
                {description}
              </p>
              <button
                onClick={() => setDescView(!descView)}
                className="badge badge-accent float-right mt-2"
              >
                {descView ? "Read less" : "Read more"}
              </button>
            </div>
            <div className="stats flex flex-col">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <HeartIcon />
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-primary">
                  {(likes / 1000).toFixed(2)}K
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <ThunderIcon />
                </div>
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">
                  {(views / 1000).toFixed(2)}K
                </div>
                <div className="stat-desc">33% more than last month</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[10%] right-[10%]">
          <div
            className="h-12 w-12 bg-secondary hover:bg-secondary-focus rounded-full items-center justify-center cursor-pointer tooltip tooltip-top hidden sm:flex"
            data-tip="Go to home?"
            onClick={handleClose}
          >
            <Home />
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;

export async function getStaticProps(context) {
  const { Id } = context.params || {};
  const videoArray = await getVideoById(Id);
  return {
    props: {
      video: videoArray?.length > 0 ? videoArray[0] : {},
    },
  };
}

export async function getStaticPaths() {
  const videos = ["8n61UG708S4", "0_44XEVOwek"];
  const paths = videos.map((Id) => ({
    params: { Id },
  }));

  return { paths, fallback: "blocking" };
}
