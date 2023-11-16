const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(500).json({
        data: {},
        success: "false",
        message: "please sign in",
        error: {},
      });
    }
    const response = await isAuthenticated(token);
    if (response.id !== req.body.userId) throw "user token cannot be verified";
    next();
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "access denied",
      error: error,
    });
  }
};

const isAuthenticated = async (token) => {
  try {
    const response = verifyToken(token);
    if (!response) {
      throw { error: "Invalid Token" };
    }
    return response;
  } catch (error) {
    console.log("Error while authenticating");
    throw { error };
  }
};

const verifyToken = (token) => {
  try {
    const response = jwt.verify(token, JWT_KEY);
    return response;
  } catch (error) {
    console.log("Error in token verification");
    throw { error };
  }
};

module.exports = verifyUser;
