const User = require("../models/userModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Create user route does not exist yet",
  });
};

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
  const { name, email, OLM, phone } = req.body;

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
    user.OLM = OLM;
    user.phone = phone;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

exports.deleteUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
