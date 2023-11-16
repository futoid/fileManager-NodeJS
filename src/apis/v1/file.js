const express = require("express");
const router = express.Router();

const {
  create,
  getFiles,
  deleteFile,
  updateFile,
  getFileIfPublic,
} = require("../../controller/file-controller");

const verifyUser = require("../../middlewares/auth-middleware");

router.post("/add", verifyUser, create);
router.post("/remove", verifyUser, deleteFile);
router.post("/update", verifyUser, updateFile);

router.get("/get", verifyUser, getFiles);
router.get("/", getFileIfPublic);

module.exports = router;
