const unggah = require("unggah");

const upload = unggah({
  limits: {
    fileSize: 1e6, // in bytes
  },
  storage: unggah.s3({
    endpoint: "s3.ap-southeast-1.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: "bootcamp-hacktiv8",
    rename: (req, file) => {
      return `bandly/${Date.now()}-${file.originalname}`; // this is the default
    },
  }), // storage configuration for google cloud storage or S3
});

module.exports = upload;
