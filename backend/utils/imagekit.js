const ImageKit = require("@imagekit/nodejs").default;
const env = require("../config/env");

const imagekit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

const urlEndpoint = `https://ik.imagekit.io/${env.IMAGEKIT_ID}`;

module.exports = { imagekit, urlEndpoint };
