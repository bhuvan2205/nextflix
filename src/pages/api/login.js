import { createNewuser, isNewUser } from "@/lib/db/hasura";
import { getToken } from "@/lib/getToken";
import { mAdmin } from "@/lib/magic-server";
import { setTokenCookie } from "@/lib/setCookie";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const { authorization } = req?.headers || {};
        const DIDToken = authorization.split(" ")[1];
        const metadata = await mAdmin.users.getMetadataByToken(DIDToken);
        const token = getToken(metadata);
        const newUser = await isNewUser(token, metadata?.issuer);
        if (newUser) {
          const createNewUser = await createNewuser(token, metadata);
          // Set Cookie - New Users
          setTokenCookie(token, res);
          return res.status(201).json({ data: createNewUser });
        } else {
          // Set Cookie - Existing users
          setTokenCookie(token, res);
          return res.status(200).json({
            data: "Already user exists",
          });
        }
      } catch (error) {
        res.status(400).json({ Error: error });
      }
      break;
    default:
      res.status(404).json({ Error: "Method not allowed" });
  }
};

export default handler;
