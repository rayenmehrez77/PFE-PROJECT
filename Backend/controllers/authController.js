const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { default: mongoose } = require("mongoose");

const generateToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  try {
    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      OLM: req.body.OLM,
      sexe: req.body.sexe,
      gouvernement: req.body.gouvernement,
      phone: req.body.phone,
      password: req.body.password,
      comparePassword: req.body.confirmPassword,
      role: req.body.role,
    });

    const token = generateToken(newUser._id);

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.OLM ||
      !newUser.gouvernement ||
      !newUser.sexe ||
      !newUser.password ||
      !newUser.comparePassword ||
      !newUser.role
    ) {
      res.status(200).json({
        success: false,
        status: "fail",
        message: "All fields are required!",
      });
      return;
    }

    // if (newUser.password !== newUser.comparePassword) {
    //   res.status(200).json({
    //     success: false,
    //     status: "fail",
    //     message: "Passwords do not match!",
    //   });
    //   return;
    // }

    // User created successfully!
    res.status(200).json({
      success: true,
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
        token: token,
      },
    });
  } catch (error) {
    res.status(200).json({ success: false, status: "fail", message: error });
  }
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
