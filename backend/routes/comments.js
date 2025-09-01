const express = require('express');
const router = express.Router();
const {
  getComments,
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// GET /api/comments/:postId - Get comments for a specific post
router.get('/:postId', getComments);

// POST /api/comments - Create new comment
router.post('/', createComment);

// Optional admin routes:
// GET /api/comments - Get all comments (admin)
router.get('/', getAllComments);

// GET /api/comments/comment/:id - Get single comment by ID
router.get('/comment/:id', getComment);

// PUT /api/comments/:id - Update comment
router.put('/:id', updateComment);

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', deleteComment);

module.exports = router;
