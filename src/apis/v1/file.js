const express = require("express");
const router = express.Router();

const {
  create,
  getFiles,
  deleteFile,
  updateFile,
} = require("../../controller/file-controller");

const verifyUser = require("../../middlewares/auth-middleware");

router.post("/add", verifyUser, create);
router.get("/get", verifyUser, getFiles);
router.post("/remove", verifyUser, deleteFile);
router.post("/update", verifyUser, updateFile);

module.exports = router;
