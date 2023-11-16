const express = require("express");
const router = express.Router();
const { fieldsVerify } = require("../../middlewares/fieldsVerify-middleware");

const verifyUser = require("../../middlewares/auth-middleware");

const {
  create,
  signIn,
  isAuthenticated,
  getCurrentUserByToken,
} = require("../../controller/user-controller");

router.post("/signup", fieldsVerify, create);
router.post("/signin", fieldsVerify, signIn);
router.get("/currentUser", getCurrentUserByToken);

//Authentication API
router.get("/auth", isAuthenticated);

module.exports = router;
