import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import("dotenv/config");

const s3 = new aws.S3({
  accessKeyId: process.env.S3ID,
  secretAccessKey: process.env.S3KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname);
    },
  }),
});

export = upload;
