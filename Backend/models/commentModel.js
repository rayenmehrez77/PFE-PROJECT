const mongoose = require("mongoose");
const Schema = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  
  const Comment = mongoose.model('Comment', commentSchema);
  module.exports = Comment;