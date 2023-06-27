const authService = require("../services/authService");

const registerUser = async (req, res) => {
  const result = await authService.createNewUser(req.body);
  return res.status(200).json(result);
};

const loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json("Missing required parameters");
  }

  let userData = await authService.handleLogin(email, password);

  return res.status(200).json({
    message: userData.message,
    user: userData.user,
  });
};

const changePassword = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      message: "Missing required parameter",
    });
  }

  const result = await authService.handleChangePassword(req.query.id, req.body);
  return res.status(200).json(result);
};

module.exports = { registerUser, loginUser, changePassword };
