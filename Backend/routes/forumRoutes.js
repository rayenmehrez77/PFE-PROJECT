const express = require("express");
const router = express.Router();

const ForumsController = require("../controllers/ForumController");
const upload = require("../utils/configUpload");

router.route("/").get(ForumsController.getForums);

router
  .route("/addForum")
  .post(upload.single("image"), ForumsController.addForum);

router
  .route("/editForum/:ForumID")
  .put(upload.single("image"), ForumsController.updateForum);

router.route("/:ForumID").delete(ForumsController.deleteForum);

module.exports = router;
