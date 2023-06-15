const Collaborator = require("../models/collaboratorModel");
const Forum = require("../models/ForumModel");
const User = require("../models/userModel");

const ForumController = {
  getForums: async (req, res) => {
    try {
      const forums = await Forum.find().populate('user').populate('collaborators');
      res.json(forums);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve forums" });
    }
  },
  participateForum: async (req, res) => {
    try {
      const forumId = req.params.id;
      const userId = req.body.user; 
      const forum = await Forum.findById(forumId);
  
      if (!forum) {
        return res.status(404).json({ message: 'forum not found' });
      }
  
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is already a collaborator in the action
      const isParticipate = forum.participants.includes(user._id);
  
      if (isParticipate) {
        return res.status(400).json({ message: 'User is already participate' });
      }
  
      // Add the user as a collaborator to the action
      forum.participants.push(user._id);
  
      // Save the updated action with the new collaborator
      const updateForum = await forum.save();
  
      res.json(updateForum);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },

  addForum: async (req, res) => {
    try {
      const { title, date, collaborators, location, status , user} = req.body;
      const existingForumByName = await Forum.findOne({ title });
      let collabs = []
      
    for (const collaboratorId of collaborators) {
      
      const collaborator = await Collaborator.findById(collaboratorId);
      
      if (collaborator) {
        
        collabs.push(collaborator);
      }
     
    }
    
      const newForum = new Forum({
        user,
        title,
        date,
        location,
        status,
        collaborators: collabs,
      });
      if (existingForumByName) {
        return res
          .status(400)
          .json({ message: "Forum with the same title already exists" });
      }
      await newForum.save();

      res.json(newForum);
    } catch (error) {
      res.status(500).json({ error: "Failed to add a new Forum", error });
    }
  },

  deleteForum: async (req, res) => {
    const forumID = req.params.forumID;
    try {
      await Forum.findByIdAndDelete(forumID);

      res.json({ message: `Forum with ID ${forumID} has been deleted` });
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to delete forum with ID ${forumID}` });
    }
  },

  updateForum: async (req, res) => {
    const { forumID } = req.params;
    const { title, date, collaborators, location, status, user} = req.body;
    const forum = await Forum.findById(forumID);
    let collabs = []
    console.log(collaborators);
  for (const collaboratorId of collaborators) {
    
    const collaborator = await Collaborator.findById(collaboratorId);
    
    if (collaborator) {
      
      collabs.push(collaborator);
    }
   
  }
    try {
      forum.title = title;
      forum.date = date;
      forum.location = location;
      forum.status = status;
      forum.user = user;
      forum.collaborators = collabs;
      await forum.save();

      res.status(200).json({ message: "forum updated successfully", forum });
    } catch (error) {
      res.status(500).json({
        error: `Failed to update Forum with ID ${forumID}`,
        error,
      });
    }
  },
};

module.exports = ForumController;
