import { createClient } from "pexels";
import axios from "axios";
import videos from "../data/videos.json";
import { STATS_ENDPOINT } from "@/constants/api-endpoints";

const API_KEY = process.env.YOUTUBE_API_KEY;
const ENV = process.env.DEV_MODE;

export const fetchVideos = async (query) => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;
  const response = await axios.get(url);
  const { data } = response;
  return data;
};

export const getVideos = async (query = "disney") => {
  try {
    const data = ENV === "dev" ? videos : await fetchVideos(query);
    return data?.items?.map((item) => {
      return {
        title: item?.snippet?.title || "",
        image: item?.snippet?.thumbnails?.high?.url || "",
        id: item?.id?.videoId || "",
      };
    });
  } catch (error) {
    const emptyResults = [];
    for (let i = 0; i < 5; i++) {
      emptyResults.push({});
    }
    return emptyResults;
  }
};

export const getVideoById = async (id = "0_44XEVOwek") => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
    const response = await axios.get(url);
    const { data } = response;
    return data.items.map((item) => {
      return {
        views: item?.statistics?.viewCount,
        likes: item?.statistics?.likeCount,
        favs: item?.statistics?.favoriteCount,
        publishTime: item?.snippet?.publishedAt,
        title: item?.snippet?.title,
        channel: item?.snippet?.channelTitle,
        description: item?.snippet?.description,
      };
    });
  } catch (error) {
    console.log({ error });
  }
};

export const fetchPopularVideos = async () => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}`;

  const response = await axios.get(url);
  const { data } = response;
  return data;
};

export const getPopularVideos = async () => {
  try {
    const data = ENV === "dev" ? videos : await fetchPopularVideos();
    return data?.items?.map((item) => {
      return {
        title: item?.snippet?.title || "",
        image: item?.snippet?.thumbnails?.high?.url || "",
        id: item?.id || "",
      };
    });
  } catch (error) {
    const emptyResults = [];
    for (let i = 0; i < 5; i++) {
      emptyResults.push({});
    }
    return emptyResults;
  }
};

export const getPexelsVideos = async (query = "disney") => {
  try {
    const client = createClient(process.env.PEXELS_API_KEY);
    const response = await client.videos.search({ query, per_page: 8 });
    return response.videos;
  } catch (error) {
    const emptyResults = [];
    for (let i = 0; i < 8; i++) {
      emptyResults.push({});
    }
    return emptyResults;
  }
};

export const fetchVideoData = async (Id, setLike) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios({
      url: `${STATS_ENDPOINT}?videoId=${Id}`,
      method: "get",
      headers: headers,
    });
    const { data } = response || {};
    if (data.isVideoExists) {
      setLike(data?.video.stats?.[0].favourited);
    } else {
      console.log({ data });
    }
  } catch (error) {
    console.log({ error });
  }
};


export const handleLike = async (Id, value, setIsUpdating, setLike) => {
  setIsUpdating(true);
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios({
    url: STATS_ENDPOINT,
    method: "post",
    data: JSON.stringify({
      videoId: Id,
      watched: true,
      isFavourited: value,
    }),
    headers: headers,
  });
  const { data } = response || {};
  if (data) {
    setLike(value);
    setIsUpdating(false);
  } else {
    setIsUpdating(false);
    console.log("Something went wrong!");
  }
};