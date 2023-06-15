const Training = require("../models/trainingModel");
const User = require("../models/userModel");

const trainingController = {
  getTrainings: async (req, res) => {
    try {
      // Retrieve all trainings
      const trainings = await Training.find().populate('user');
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve trainings" });
    }
  },
  participateTraining: async (req, res) => {
    try {
      const trainingId = req.params.id;
      const userId = req.body.user; 
      const training = await Training.findById(trainingId);
  
      if (!training) {
        return res.status(404).json({ message: 'training not found' });
      }
  
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is already a collaborator in the action
      const isParticipate = training.participants.includes(user._id);
  
      if (isParticipate) {
        return res.status(400).json({ message: 'User is already participate' });
      }
  
      // Add the user as a collaborator to the action
      training.participants.push(user._id);
  
      // Save the updated action with the new collaborator
      const updateTraining = await training.save();
  
      res.json(updateTraining);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  addTraining: async (req, res) => {
    try {
      const { title, date, duration, trainer, location, etat, nParticipants,user } =
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
        user
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
    const { title, date, duration, trainer, location, etat, nParticipants,user } =
    req.body;
    const training = await Training.findById(trainingID);
    console.log(training,trainingID);
    try {
      // Extract data from the request body
    
      
      const image = req.file.path;
      console.log(training);
      // Update a specific training by ID
      training.user = user;
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
