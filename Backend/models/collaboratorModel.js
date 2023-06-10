const mongoose = require("mongoose");

// Define the Training schema
const CollaboratorsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

// Create the Training model
const Collaborator = mongoose.model("Collaborator", CollaboratorsSchema);

module.exports = Collaborator;
