const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcryptjs");


exports.getUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, phone, password } = req.body;
  const image = "http://localhost:5001/" + req.file.path.replace("public/", "");
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided email is already used by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update the user's information
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = image;
    user.password = password;
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong",error });
  }
});

// DELETE method to delete a user
exports.deleteUser = asyncErrorHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's role is "super admin"
    if (user.role === "Super Admin") {
      return res
        .status(403)
        .json({ message: "Cannot delete super admin user" });
    }

    // Delete the user from the database
    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET method to get all users
exports.getUsers = asyncErrorHandler(async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users); // Return the users as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
