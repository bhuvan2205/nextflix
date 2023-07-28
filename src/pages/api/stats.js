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
          query: { videoId },
        } = req || {};
        if (!token) {
          return res.status(403).json({ Error: "Authorization required" });
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const isVideoExists = await isExistingVideo(
            token,
            decoded?.issuer,
            videoId
          );
          console.log({isVideoExists})
          if (isVideoExists) {
            // update the video stats
            const data = await updateVideoStats(
              token,
              decoded?.issuer,
              videoId,
              true,
              2
            );
            return res.status(200).json({ data });
          } else {
            const data = await createNewStats(
              token,
              decoded?.issuer,
              videoId,
              true,
              2
            );
            return res.status(200).json({ data });
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
