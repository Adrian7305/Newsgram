const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// 🔍 Get comments for a specific post
const getComments = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid postId format' });
  }

  try {
    const comments = await Comment.find({ postId: new mongoose.Types.ObjectId(postId) })
      .populate('postId', 'title')
      .sort({ created_at: -1 });

    // Normalize _id to id for frontend
    const normalized = comments.map(comment => {
      const c = comment.toObject();
      c.id = c._id;
      delete c._id;
      return c;
    });

    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗃 Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('postId', 'title')
      .sort({ created_at: -1 });

    const normalized = comments.map(comment => {
      const c = comment.toObject();
      c.id = c._id;
      delete c._id;
      return c;
    });

    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get a single comment
const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('postId', 'title');
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const c = comment.toObject();
    c.id = c._id;
    delete c._id;

    res.json(c);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➕ Create new comment
const createComment = async (req, res) => {
  try {
    const { postId, name, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid postId' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      postId: new mongoose.Types.ObjectId(postId),
      name,
      text
    });

    const newComment = await comment.save();
    await newComment.populate('postId', 'title');

    const c = newComment.toObject();
    c.id = c._id;
    delete c._id;

    res.status(201).json(c);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✏️ Update comment
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postId', 'title');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const c = comment.toObject();
    c.id = c._id;
    delete c._id;

    res.json(c);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🗑 Delete comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComments,
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};
