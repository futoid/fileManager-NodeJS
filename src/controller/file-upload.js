const express = require("express");
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { SECRET_KET, ACCESS_KEY, S3_REGION } = require("../config/serverConfig");
const router = express.Router();

aws.config.update({
  secretAccessKey: SECRET_KET,
  accessKeyId: ACCESS_KEY,
  region: S3_REGION,
});

const app = express();
const s3 = new aws.S3();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "bucket-name",
    key: function (req, file, cb) {
      // console.log(file);
      cb(null, file.originalname);
    },
  }),
});

router.post("/", upload.array("upl", 25), function (req, res, next) {
  try {
    return res.status(200).send({
      message: "Uploaded!",
      urls: req.files.map(function (file) {
        return {
          url: file.location,
          name: file.key,
          type: file.mimetype,
          size: file.size,
        };
      }),
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to upload file",
      error: error,
    });
  }
});

module.exports = router;
