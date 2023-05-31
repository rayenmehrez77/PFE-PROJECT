const mongoose = require("mongoose");

// Define the Training schema
const ForumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  Collaborators: {
    type: string,
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
const Forum = mongoose.model("Forum", ForumSchema);

module.exports = Forum;
