import {
  createNewStats,
  isExistingVideo,
  updateVideoStats,
} from "@/lib/db/hasura";

const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const {
          cookies: { token },
          body: { videoId, watched, isFavourited },
        } = req || {};
        if (!token) {
          return res.status(403).json({ Error: "Authorization required" });
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const data = await isExistingVideo(token, decoded?.issuer, videoId);
          const isVideoExists = data.stats?.length > 0;
          console.log({ isVideoExists });
          if (isVideoExists) {
            // update the video stats
            const data = await updateVideoStats(
              token,
              decoded?.issuer,
              videoId,
              watched,
              isFavourited
            );
            return res.status(200).json({ data });
          } else {
            const data = await createNewStats(
              token,
              decoded?.issuer,
              videoId,
              watched,
              isFavourited
            );
            return res.status(200).json({ data });
          }
        }
      } catch (error) {
        res.status(500).json({ Error: error });
      }
      break;
    case "GET":
      try {
        const {
          cookies: { token },
          query: { videoId },
        } = req || {};
        if (!token) {
          return res.status(403).json({ Error: "Authorization required" });
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const data = await isExistingVideo(token, decoded?.issuer, videoId);
          const isVideoExists = data.stats?.length > 0;
          if (isVideoExists) {
            res.status(200).json({ video: data, isVideoExists: true });
          } else {
            res.json({ message: "Video not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ Error: error });
      }
      break;
    default:
      res.status(404).json({ Error: "Method not allowed" });
  }
};

export default handler;
