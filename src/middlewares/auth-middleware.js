const ValidateAuthRequest = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: "false",
      message: "Password or Email missing",
      err: "Attributes missing",
    });
  }
  next();
};

module.exports = {
  ValidateAuthRequest,
};
