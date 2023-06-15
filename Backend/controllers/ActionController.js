const Action = require("../models/actionModel");

const ActionController = {
  getActions: async (req, res) => {
    try {
      const actions = await Action.find().populate('user');
      res.json(actions);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve actions" });
    }
  },

  addAction: async (req, res) => {
    try {
      const { title, date, director, location, status , user} = req.body;
      const image = req.file.path;

      const existingActionByName = await Action.findOne({ title });

      const newAction = new Action({
        image: image,
        title,
        date,
        director,
        location,
        status,
        user
      });
      if (existingActionByName) {
        return res
          .status(400)
          .json({ message: "Action with the same title already exists" });
      }
      await newAction.save();

      res.json(newAction);
    } catch (error) {
      res.status(500).json({ error: "Failed to add a new Action", error });
    }
  },

  deleteAction: async (req, res) => {
    const ActionID = req.params.actionID;
    try {
      // Delete a specific Action by ID
      await Action.findByIdAndDelete(ActionID);

      res.json({ message: `Action with ID ${ActionID} has been deleted` });
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to delete action with ID ${ActionID}` });
    }
  },

  updateAction: async (req, res) => {
    const { actionID } = req.params;
    const { title, date, director, location, status,user } = req.body;
    const action = await Action.findById(actionID);

    try {
      const image = req.file.path;
      action.user = user;
      action.title = title;
      action.date = date;
      action.director = director;
      action.location = location;
      action.status = status;
      action.image = image;
      await action.save();

      res.status(200).json({ message: "action updated successfully", action });
    } catch (error) {
      res.status(500).json({
        error: `Failed to update action with ID ${actionID}`,
        error,
      });
    }
  },
};

module.exports = ActionController;
