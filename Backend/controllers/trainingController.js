const Training = require("../models/trainingModel");

const trainingController = {
  getTrainings: async (req, res) => {
    try {
      // Retrieve all trainings
      const trainings = await Training.find();
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve trainings" });
    }
  },

  addTraining: async (req, res) => {
    try {
      const {
        image,
        Title,
        Date,
        Duration,
        Trainer,
        Location,
        Status,
        nbParticipants,
      } = req.body;

      // Create a new training
      const newTraining = new Training({
        image,
        Title,
        Date,
        Duration,
        Trainer,
        Location,
        Status,
        nbParticipants,
      });
      await newTraining.save();

      res.json(newTraining);
    } catch (error) {
      res.status(500).json({ error: "Failed to add a new training" });
    }
  },

  deleteTraining: async (req, res) => {
    const trainingID = req.params.trainingID;
    try {
      // Delete a specific training by ID
      await Training.findByIdAndDelete(trainingID);

      res.json({ message: `Training with ID ${trainingID} has been deleted` });
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to delete training with ID ${trainingID}` });
    }
  },

  updateTraining: async (req, res) => {
    const trainingID = req.params.trainingID;
    try {
      // Extract data from the request body
      const {
        image,
        Title,
        Date,
        Duration,
        Trainer,
        Location,
        Status,
        nParticipants,
      } = req.body;

      // Update a specific training by ID
      const updatedTraining = await Training.findByIdAndUpdate(
        trainingID,
        {
          image,
          Title,
          Date,
          Duration,
          Trainer,
          Location,
          Status,
          nParticipants,
        },
        { new: true }
      );

      res.json(updatedTraining);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to update training with ID ${trainingID}` });
    }
  },
};

module.exports = trainingController;
