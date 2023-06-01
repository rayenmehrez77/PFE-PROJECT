const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const upload = require("../utils/configUpload");

router.route("/").get(postController.getPosts);

router.route("/addPost").post(upload.single("image"),postController.createPost);

router.route("/editPost/:postId").put(upload.single("image"),postController.updatePost);

router.route("/:postId").delete(postController.deletePost);
router.route("/:postId").get(postController.getPost);
router.route("/:postId/comment").post(postController.createComment);
router.route("/:postId/comments").get(postController.getAllPostComments);
router.route("/:postId/comments/:commentId").delete(postController.deleteComment);
router.route("/:postId/comments/:commentId").put(postController.updateComment);
module.exports = router;