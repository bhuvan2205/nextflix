const jwt = require("jsonwebtoken");

export const getIssuer = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { issuer } = decoded;
  if (issuer) {
    return issuer;
  }
  return null;
};
