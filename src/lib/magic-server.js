const { Magic } = require("@magic-sdk/admin");

// Magic client for the server side

export const mAdmin = await Magic.init(process.env.MAGIC_SERVER_KEY);
