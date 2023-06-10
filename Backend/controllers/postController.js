const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createPost = asyncErrorHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const image =
      "http://localhost:5001/" +
      req.file.path.replace("public/", "").replace("/\\/g", "/");
    const userId = req.body.user;
    const post = new Post({
      title,
      description,
      image,
      user: userId,
    });

    await (await post.save()).populate("user");

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getPost = asyncErrorHandler(async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

exports.updatePost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { title, description, userId } = req.body;
  const image = req.file.path;
  try {
    const post = Post.findById(postId);

    post.title = title;
    post.description = description;
    post.image = image;
    post.user = userId;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

exports.deletePost = asyncErrorHandler(async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.getPosts = asyncErrorHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

exports.createComment = asyncErrorHandler(async (req, res) => {
  try {
    const { text, user } = req.body;
    const postId = req.params.postId;

    const comment = new Comment({
      text,
      user: user,
    });

    await comment.save();

    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getAllPostComments = asyncErrorHandler(async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "user" },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.deleteComment = asyncErrorHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const commentIndex = post.comments.indexOf(commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    await Comment.findByIdAndDelete(commentId);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.updateComment = asyncErrorHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { text, user } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user.toString() !== user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
