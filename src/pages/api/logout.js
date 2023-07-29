import { ROUTE_LOGIN } from "@/constants/endpoints";
import { getIssuer } from "@/lib/getIssuer";
import { mAdmin } from "@/lib/magic-server";
import { removeTokenCookie } from "@/lib/setCookie";

const handler = async (req, res) => {
  const { token } = req?.cookies;
  switch (req.method) {
    case "POST":
      try {
        if (!token) {
          return res.status(401).json({ message: "User is not logged in" });
        }
        const issuer = await getIssuer(token);
        removeTokenCookie(res);
        await mAdmin.users.logoutByIssuer(issuer);
        res.writeHead(302, { Location: "/login" });
        res.end();
      } catch (error) {
        res.status(500).json({ Error: error });
      }
      break;
    default:
      res.status(404).json({ Error: "Method not allowed" });
  }
};

export default handler;
