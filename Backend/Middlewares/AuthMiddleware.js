const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    // const token = req.cookies.token;

    // if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      // req.token = token; // Attach token to request object
    
    console.log("token")
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token Missing",
        action:"login again"
      });
    }
    try {
      const decodeToken = jwt.verify(token, process.env.SECRET);
      console.log(decodeToken); 
      req.user = decodeToken;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }
    console.log(token);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something  wrong",
      
    });
  }
}

async function isAdmin(req, res, next) {  
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "you are unauthorized to access this page",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "user role is invalid ",
    });
  }
}

async function isBlogger(req, res, next) {
  console.log("hi");
  try {
    
    if (req.user.role !== "Blogger") {
      return res.status(401).json({
        success: false,
        message: "you are unauthorized to access this page",
      });
    }
    else {
      

      return res.status(200).json({
        success: true,
        message: "authorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "user role is invalid ",
    });
  }
}

async function isReader(req, res, next) {
  try {
    if (req.user.role !== "Reader") {
      return res.status(401).json({
        success: false,
        message: "you are unauthorized to access this page",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "user role is invalid ",
    });
  }
}
module.exports = {
  auth,
  isAdmin,
  isBlogger,
  isReader,
};
