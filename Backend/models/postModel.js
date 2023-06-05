const mongoose = require("mongoose");
const Schema = require("mongoose");
const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
