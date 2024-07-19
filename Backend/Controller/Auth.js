const user = require("../Models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const {
  ValidationError,
  UnauthorizedError,
  UserAlreadyExistsError,
  BadRequestError,
} = require("../Errors/error.js");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/generateToken.js");
const Token = require("../Models/token.js");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function signUp(req, res, next) {
  const { name, email, password, role, confirmPassword, address, country } =
    req.body;

  if (!name || !email || !password || !role || !country || !address) {
    // ((((((Handle it from Front End also please))))))
    throw new BadRequestError("please fill all the details");
  }
  const isNameUnique = await user.findOne({ name });

  if (isNameUnique) {
    // return res.status(409).json({ message: "user name already taken" });
    throw new ValidationError("user name is already taken", 409);
  }
  const existingUser = await user.findOne({ email });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  if (password !== confirmPassword) {
    throw new ValidationError("password do not match");
  }
  // const newPassword = await bcrypt.hash(password, 10);   ( i am doing this using pre middleware in user Model)

  const newUser = new user({
    name,
    email,
    password,
    country,
    address,
    role,
  });
  const savedUser = await newUser.save();

  // generate verification token
  let token = generateVerificationToken();

  function generateVerificationToken() {
    return jwt.sign(
      {
        name,
        email,
        role,
      },
      process.env.SECRET
    );
  }

  // sending token to user for verification

  await transporter
    .sendMail({
      from: '"BlogTank 👻" <imsauravkrmishra@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify Your Blog account", // Subject line
      text: "Hi, thank your for registering", // plain text body
      html: `<b>click to verify your account:</b>http://localhost:3009/api/v1/verifyUser/${token}`, // html body
    })
    .catch((err) => {
      return res.json({
        message: "failed to send mail",
      });
    });

  res.status(200).json({
    success: true,
    message: "successfully registered",
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please fill all the details");
  }

  let userExist = await user.findOne({ email });
  if (!userExist) {
    throw new UnauthorizedError();
  }

  if (!userExist.isVerified) {
    throw new UnauthorizedError("user is not verified");
  }

  const token = await generateToken(userExist);

  console.log("loginToken", token);
  return res.json({
    success: true,
    message: "Successfull Login",
    token: token,
    role:userExist.role
  });

  // const payload = {
  //   email: userExist.email,
  //   role: userExist.role,
  //   id: userExist._id,
  // };
  // const option = {
  //   expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // };

  // if (await bcrypt.compare(password, userExist.password)) {
  //   let token = jwt.sign(payload, process.env.SECRET, { expiresIn: "4h" });

  //   userExist = userExist.toObject();
  //   userExist.token = token;
  //   console.log(userExist);
  //   userExist.password = "";
  //   res.cookie("token", token, option).status(200).json({
  //     success: true,
  //     token,
  //     userExist,
  //     message: "Successfull Login",
  //   });
  //   // res.redirect(`/${userExist.role}`)
  // } else {
  //   throw new UnauthorizedError("password do not match");
  // }
}

async function logout(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  res.clearCookie("token");

  if (!token) {
    throw new BadRequestError("no token recieved");
  }

  const decodeToken = jwt.verify(token, process.env.SECRET);

  await Token.findOneAndDelete({ user: decodeToken.id });

  return res.status(200).json({
    success: true,
    message: "logout successfull",
  });
}


async function verifyUser(req, res) {
  const { token } = req.params;
  console.log(token);
  const decodeToken = jwt.verify(token, process.env.SECRET);
  const { name, email, role } = decodeToken;
  await user.findOneAndUpdate(
    {
      name,
      email,
    },
    { isVerified: true }
  );
  return res.status(200).json({
    message: "user is verified now",
    success: true,
  });
}

module.exports = {
  login: asyncErrorHandler(login),
  signUp: asyncErrorHandler(signUp),
  logout: asyncErrorHandler(logout),
  verifyUser: asyncErrorHandler(verifyUser),
};
