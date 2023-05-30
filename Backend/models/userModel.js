const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    OLM: {
      type: String,
      required: [true, "OLM is required!"],
    },
    gouvernement: {
      type: String,
      required: [true, "Gouvernement is required!"],
    },
    sexe: {
      type: String,
      required: [true, "Sexe is required!"],
    },
    phone: {
      type: String,
      required: [false, "Phone is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password is shorter than the minimum length(8)"],
    },

    role: {
      type: String,
      enum: ["Super Admin", "Admin", "Member"],
      default: "Member",
    },
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  // only run this function if password was not modified
  if (!this.isModified("password")) return next();

  // hash the password with is modified is true
  this.password = await bcrypt.hash(this.password, 12);

  // delete confirmPassword field
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
