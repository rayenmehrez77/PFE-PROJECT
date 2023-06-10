const express = require("express");
const router = express.Router();

const ActionsController = require("../controllers/ActionController");
const upload = require("../utils/configUpload");

router.route("/").get(ActionsController.getActions);

router
  .route("/addAction")
  .post(upload.single("image"), ActionsController.addAction);

router
  .route("/editAction/:actionID")
  .put(upload.single("image"), ActionsController.updateAction);

router.route("/deleteAction/:actionID").delete(ActionsController.deleteAction);

module.exports = router;
