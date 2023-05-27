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
    type: "String",
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  Formateur: {
    type: String,
    required: true,
  },
  Location: {
    type: "String",
    required: true,
  },
  Etat: {
    type: "String",
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
