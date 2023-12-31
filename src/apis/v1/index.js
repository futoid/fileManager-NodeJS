const express = require("express");
const router = express.Router();

const userRouter = require("../v1/user");
const folderRouter = require("../v1/folder");
const fileRouter = require("../v1/file");

router.use("/user", userRouter);
router.use("/folder", folderRouter);
router.use("/file", fileRouter);

module.exports = router;
