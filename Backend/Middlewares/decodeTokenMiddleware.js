const { BadRequestError } = require("../Errors/error");
const jwt = require("jsonwebtoken");
const tokenAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new BadRequestError("no token recieved");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.token = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "invalid token",
      success: false,
    });
  }
};

module.exports = tokenAuth;
