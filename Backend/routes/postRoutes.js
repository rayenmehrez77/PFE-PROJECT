const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const upload = require("../utils/configUpload");

router.route("/").get(postController.getPosts);

router.route("/addPost").post(upload.single("image"),postController.createPost);

router.route("/editPost/:postId").put(upload.single("image"),postController.updatePost);

router.route("/:postId").delete(postController.deletePost);
router.route("/:postId").get(postController.getPost);

module.exports = router;