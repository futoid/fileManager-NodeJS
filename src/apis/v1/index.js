const express = require("express");
const router = express.Router();

const userRouter = require("../v1/user");
const folderRouter = require("../v1/folder");

router.use("/user", userRouter);
router.use("/folder", folderRouter);

module.exports = router;
