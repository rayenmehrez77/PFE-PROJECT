const Forum = require("../models/ForumModel");

const ForumController = {
  getForums: async (req, res) => {
    try {
      const forums = await Forum.find();
      res.json(forums);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve forums" });
    }
  },

  addForum: async (req, res) => {
    try {
      const { title, date, collaborators, location, status } = req.body;
      const existingForumByName = await Action.findOne({ title });

      const newForum = new Forum({
        title,
        date,
        location,
        status,
        collaborators: [collaborators],
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
    const { title, date, director, location, status } = req.body;
    const forum = await Action.findById(forumID);
    try {
      forum.title = title;
      forum.date = date;
      forum.location = location;
      forum.status = status;
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
