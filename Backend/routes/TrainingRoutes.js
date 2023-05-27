const express = require("express");
const router = express.Router();

const trainingController = require("../controllers/trainingController");

router.route("/").get(trainingController.getTrainings);

router.route("/").post(trainingController.addTraining);

router.route("/:trainingID").put(trainingController.updateTraining);

router.route("/:trainingID").delete(trainingController.deleteTraining);

module.exports = router;
