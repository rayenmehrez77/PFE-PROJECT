const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
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
      enum: ["Monastir", "Sousse", "Mahdia"],
    },
    sexe: {
      type: String,
      enum: ["Masculin", "Féminin"],
    },
    phone: {
      type: String,
      unique: false,
    },
    password: {
      type: String,
      required: false,
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
