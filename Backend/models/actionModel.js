const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  director: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
