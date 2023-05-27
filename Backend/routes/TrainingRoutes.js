const express = require("express");
const router = express.Router();

const trainingController = require("../controllers/trainingController");
const upload = require("../utils/configUpload");

router.route("/").get(trainingController.getTrainings);

router.route("/addTraining").post(upload.single("image"),trainingController.addTraining);

router.route("/:trainingID").put(trainingController.updateTraining);

router.route("/:trainingID").delete(trainingController.deleteTraining);

module.exports = router;
