const jwt = require("jsonwebtoken");

export const getToken = (metadata) => {
  const signature = {
    ...metadata,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user", "admin"],
      "x-hasura-user-id": `${metadata.issuer}`,
    },
  };
  return jwt.sign(signature, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
  });
};
