const mongoose = require("mongoose");

// Define the Training schema
const trainingSchema = new mongoose.Schema({
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
  duration: {
    type: Number,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  location: {
    type: "String",
    required: true,
  },
  etat: {
    type: "String",
    required: false,
  },
  nbParticipants: {
    type: Number,
    required: false,
  },
  status: {
    type: "String",
    required: false,
  },
});

// Create the Training model
const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
