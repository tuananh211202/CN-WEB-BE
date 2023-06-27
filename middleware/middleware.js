const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token is invalid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }
};

const checkAdmin = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.user.data.email === "admin@gmail.com") {
      next();
    } else {
      return res.status(403).json("Access denied. Not authorized");
    }
  });
};

module.exports = { checkToken, checkAdmin };
