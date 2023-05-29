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
      const { title, date, duration, trainer, location, etat, nParticipants } =
        req.body;
      const image = req.file.path;
      const existingTrainingByName = await Training.findOne({ title });
      // Create a new training
      const newTraining = new Training({
        image: image,
        title,
        date,
        duration,
        trainer,
        location,
        etat,
        nParticipants,
      });
      if (existingTrainingByName) {
        return res
          .status(400)
          .json({ message: "training with the same title already exists" });
      }
      await newTraining.save();

      res.json(newTraining);
    } catch (error) {
      res.status(500).json({ error: "Failed to add a new training", error });
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
    const {trainingID} = req.params;
    const { title, date, duration, trainer, location, etat, nParticipants } =
    req.body;
    const training = await Training.findById(trainingID);
    console.log(training,trainingID);
    try {
      // Extract data from the request body
    
      
      const image = req.file.path;
      console.log(training);
      // Update a specific training by ID
      training.title = title;
      training.date = date;
      training.duration = duration;
      training.trainer = trainer;
      training.location = location;
      training.etat = etat;
      training.nParticipants = nParticipants;
      training.image = image;
      await training.save();

      res
        .status(200)
        .json({ message: "trainer updated successfully", training });
    } catch (error) {
      res.status(500).json({
        error: `Failed to update training with ID ${trainingID}`,
        error,
      });
    }
  },
};

module.exports = trainingController;
