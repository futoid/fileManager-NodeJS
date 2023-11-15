const express = require("express");
const router = express.Router();

const {
  create,
  updateName,
  getFolders,
} = require("../../controller/folder-controller");

router.post("/create", create);
router.post("/update", updateName);
router.get("/all", getFolders);

module.exports = router;
