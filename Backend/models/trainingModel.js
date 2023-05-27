const mongoose = require("mongoose");

// Define the Training schema
const trainingSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    default: Date.now,
  },
  Duration: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Trainer: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  nbParticipants: {
    type: Number,
    required: true,
  },
});

// Create the Training model
const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
