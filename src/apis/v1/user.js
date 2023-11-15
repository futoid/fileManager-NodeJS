const express = require("express");
const router = express.Router();
const { ValidateAuthRequest } = require("../../middlewares/auth-middleware");

const {
  create,
  signIn,
  isAuthenticated,
} = require("../../controller/user-controller");

router.post("/signup", ValidateAuthRequest, create);
router.post("/signin", ValidateAuthRequest, signIn);

//Authentication API
router.get("/auth", isAuthenticated);

module.exports = router;
