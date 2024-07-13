const jwt = require("jsonwebtoken");
const Token = require("../Models/token.js");
require("dotenv").config();

const generateToken = async (userExist) => {
  const jwtToken = jwt.sign(
    { email: userExist.email, role: userExist.role, id: userExist._id },
    process.env.SECRET,
    {expiresIn:"1d"}
  );

  try {
    const findOldToken = await Token.findOne({ user: userExist._id });

    if (findOldToken) {
      await Token.findOneAndDelete({ user: userExist._id });
      console.log("old token deleted");
    }
    const newToken = await Token.create({ key: jwtToken, user: userExist._id });

    return newToken.key;
  } catch (error) {
    console.log("error");
  }
};

module.exports = generateToken;
