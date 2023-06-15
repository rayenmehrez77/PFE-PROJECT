const mongoose = require("mongoose");
const Schema = require("mongoose");
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
  collaborators: [{ type: Schema.Types.ObjectId, ref: "Collaborator" }],
  location: {
    type: "String",
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{
    type: Schema.Types.ObjectId, ref: "User" 
  }],
});

// Create the Training model
const Forum = mongoose.model("Forum", ForumSchema);

module.exports = Forum;
