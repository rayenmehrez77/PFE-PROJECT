const mongoose = require("mongoose");

// Define the Training schema
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
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: "String",
    required: true,
  },
});

// Create the Training model
const Action = mongoose.model("Action", trainingSchema);

module.exports = Action;
