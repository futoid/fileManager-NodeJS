const express = require("express");
const router = express.Router();

const {
  create,
  updateName,
  getFolders,
} = require("../../controller/folder-controller");

const verifyUser = require("../../middlewares/auth-middleware");

router.post("/create", verifyUser, create);
router.post("/update", verifyUser, updateName);
router.get("/all", verifyUser, getFolders);

module.exports = router;
