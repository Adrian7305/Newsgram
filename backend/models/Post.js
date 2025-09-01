const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  created_at: { type: Date, default: Date.now }, // ✅ Keep this
  likes: { type: Number, default: 0 },
  bookmarked: { type: Boolean, default: false },
  tags: [{ type: String, trim: true }]
});

module.exports = mongoose.model('Post', postSchema);
