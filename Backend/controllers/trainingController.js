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
      // Extract data from the request body
      const {
        
        title,
        date,
        duration,
        formateur,
        location,
        etat,
        nParticipants,
      } = req.body;
      const image = req.file.path
      // Create a new training
      const newTraining = new Training({
        image:image,
        title,
        date,
        duration,
        formateur,
        location,
        etat,
        nParticipants,
      });
      await newTraining.save();

      res.json(newTraining);
    } catch (error) {
      res.status(500).json({ error: "Failed to add a new training",error });
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
        title,
        date,
        duration,
        formateur,
        location,
        etat,
        nParticipants,
      } = req.body;

      // Update a specific training by ID
      const updatedTraining = await Training.findByIdAndUpdate(
        trainingID,
        { title, date, duration, formateur, location, etat, nParticipants },
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
