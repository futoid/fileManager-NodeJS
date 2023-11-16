const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await userService.createUser(data);
    return res.status(201).json({
      data: user,
      success: "true",
      message: "User created successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to create user",
      error: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const token = await userService.signIn(req.body.email, req.body.password);
    return res.status(201).json({
      data: token,
      success: "true",
      message: "User SignedIn successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to sign in",
      error: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response.email,
      success: "true",
      message: "User authencticated successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to authenticate",
      error: error,
    });
  }
};

const getCurrentUserByToken = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const user = await userService.getCurrentUser(token);
    return res.status(200).json({
      data: user,
      success: "true",
      message: "User authencticated successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not user found",
      error: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  getCurrentUserByToken,
};
