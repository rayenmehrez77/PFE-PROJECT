const Post = require("../models/postModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.createPost = asyncErrorHandler(async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file.path;
        const userId = req.body.user; 
        const post = new Post({
          title,
          description,
          image,
          user: userId 
        });
    
        await (await post.save()).populate('user');
    
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
})

exports.getPost = asyncErrorHandler(async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('user');

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
  const { title, description,userId } = req.body;
  const image = req.file.path;
  try {
    const post = Post.findById(postId);

    post.title = title;
    post.description = description;
    post.image = image;
    post.user=userId
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
    const posts = await Post.find().populate('user');

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
