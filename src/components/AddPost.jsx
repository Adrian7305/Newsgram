import React, { useState } from 'react';
import { createPost } from '../api/api';

const AddPost = ({ isOpen, onClose, onPostAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim() || !formData.author.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newPost = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        author: formData.author.trim(),
        tags: formData.tags.trim() ? formData.tags.trim().split(',').map(tag => tag.trim()) : [],
        created_at: new Date().toISOString(),
        likes: 0,
        bookmarked: false
      };

      const createdPost = await createPost(newPost);
      
      // Show success message
      setSuccess(true);
      setError('');
      
      // Reset form
      setFormData({
        title: '',
        body: '',
        author: '',
        tags: ''
      });
      
      // Wait a moment to show success message, then close modal and notify parent
      setTimeout(() => {
        onPostAdded(createdPost);
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        body: '',
        author: '',
        tags: ''
      });
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-post-overlay" onClick={handleClose}>
      <div className="add-post-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-button" onClick={handleClose} disabled={loading}>
          ✕
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <h2>✍️ Create New Post</h2>
          <p>Share your thoughts with the community</p>
        </div>

        {/* Add Post Form */}
        <form onSubmit={handleSubmit} className="add-post-form">
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              ✅ Post created successfully! Redirecting...
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title..."
              className="form-input"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Content *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Write your post content..."
              className="form-textarea"
              rows="6"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter your name..."
              className="form-input"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="react, javascript, web-dev (comma separated)"
              className="form-input"
              disabled={loading}
            />
            <small className="form-hint">Separate tags with commas</small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
