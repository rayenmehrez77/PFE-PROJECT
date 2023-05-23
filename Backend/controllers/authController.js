const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const generateToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    OLM: req.body.OLM,
    password: req.body.password,
    comparePassword: req.body.confirmPassword,
    role: req.body.role,
  });

  const token = generateToken(newUser._id);

  res.status(200).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: newUser,
      token: token,
    },
  });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email || !password) {
    res.status(200).json({
      success: false,
      status: "fail",
      message: "Email and Password are required!",
    });
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ email: email });
  const compare = await user.comparePassword(password);

  console.log(compare);

  if (!user || !compare) {
    res.status(200).json({
      success: false,
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  console.log(compare);

  const token = generateToken(user._id);

  // 3) if everything is ok, send token to client

  res.status(200).json({
    success: true,
    status: "success",
    message: "User logged in successfully",
    data: {
      user: user,
      token: token,
    },
  });
});
