const { Magic } = require("@magic-sdk/admin");

export let mAdmin = await Magic.init(process.env.MAGIC_SERVER_KEY);
