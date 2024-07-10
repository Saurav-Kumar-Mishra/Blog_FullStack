const bcrypt = require("bcrypt");
const user = require("../Models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function signUp(req, res) {
  try {
    const { name, email, password, role, confirmPassword, address, country } =req.body;

    if (!name || !email || !password || !role || !country || !address) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details" });
    }
    const isNameUnique = await user.findOne({ name });

    if (isNameUnique) {
      return res.status(409).json({ message: "user name already taken" });
    }
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "user is already registered " });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password did not match" });
    }
    const newPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: newPassword,
      country,
      address,
      role,

    });
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details" });
    }

    let userExist = await user.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "user doesn't exist. Please register first" });
    }
    const payload = {
      email: userExist.email,
      role: userExist.role,
      id: userExist._id,
      
    };
    const option = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly:true
    };
    if (await bcrypt.compare(password, userExist.password)) {
      let token = jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" });
      
      userExist = userExist.toObject();
      userExist.token = token;
      console.log(userExist);
      userExist.password = "";
      res.cookie("token", token,option).status(200).json({
        success: true,
        token,
        userExist, 
        message: "Successfull Login",
      });
      // res.redirect(`/${userExist.role}`)

    } else {
      return res.status(403).json({
        message: "incorrect password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

 function logout(req, res){
  try {
    res.clearCookie("token");
    console.log('cookie deleted')
    return res.status(200).json({
      success:true,
      message:"logout successfull"
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success:false,
      message:"logout faliure"
    });
  }
}

function verifySession(req,res)
{
  const {email, role, id, token } = req.user;
  
  let newToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" });


}

module.exports = {
  login,
  signUp,
  logout,
  verifySession
};
