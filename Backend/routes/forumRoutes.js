const express = require("express");
const router = express.Router();

const ForumsController = require("../controllers/ForumController");
const upload = require("../utils/configUpload");

router.route("/").get(ForumsController.getForums);
router.route("/participate/:id").post(ForumsController.participateForum);
router
  .route("/addForum")
  .post( ForumsController.addForum);

router
  .route("/editForum/:ForumID")
  .put( ForumsController.updateForum);

router.route("/:ForumID").delete(ForumsController.deleteForum);

module.exports = router;
