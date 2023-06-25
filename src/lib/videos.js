import { createClient } from "pexels";
import axios from "axios";

export const getVideos = async (query = "disney") => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    const { data } = response;
    return data.items.map((item) => {
      return {
        title: item?.snippet?.title || "",
        imgUrl: item?.snippet?.thumbnails?.high?.url || "",
        id: item?.id?.videoId || "",
      };
    });
  } catch (error) {
    console.log({ error });
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
    const response = await client.videos.search({ query, per_page: 15 });
    return response.videos;
  } catch (error) {
    console.log({ error });
    const emptyResults = [];
    for (let i = 0; i < 8; i++) {
      emptyResults.push({});
    }
    return emptyResults;
  }
};
