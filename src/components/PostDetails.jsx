import React, { useState, useEffect } from 'react';
import { getBookmarks, toggleBookmark } from '../utils/bookmarkUtils';
import { fetchComments } from '../api/api';

const PostDetails = ({ post, isOpen, onClose }) => {
  const [likes, setLikes] = useState(post?.initialLikes || 0);
  const [dislikes, setDislikes] = useState(post?.initialDislikes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (post) {
      setLikes(post.initialLikes || 0);
      setDislikes(post.initialDislikes || 0);
      setIsBookmarked(getBookmarks().includes(post.id));
      loadComments(post.id);
    }
  }, [post]);

  const loadComments = async (postId) => {
    setLoadingComments(true);
    try {
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
    setIsLiked(!isLiked);
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
    } else {
      setDislikes(dislikes + 1);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
    setIsDisliked(!isDisliked);
  };

  const handleBookmark = () => {
    const newBookmarks = toggleBookmark(post.id);
    setIsBookmarked(newBookmarks.includes(post.id));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        postId: post.id,
        name: "You",
        text: newComment.trim(),
        created_at: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setShowCommentForm(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diff = now - commentDate;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isOpen || !post) return null;

  return (
    <div className="post-details-overlay" onClick={onClose}>
      <div className="post-details-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        {/* Post Content */}
        <div className="post-content">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <span className="author">👤 {post.author}</span>
            <span className="date">📅 {new Date(post.createdDate).toLocaleDateString()}</span>
            <span className="tags">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </span>
          </div>

          <div className="post-body">
            {post.body}
          </div>

          {/* Post Interactions */}
          <div className="post-interactions">
            <button 
              onClick={handleLike} 
              className={`interaction-btn ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '❤️' : '🤍'} {likes}
            </button>
            
            <button 
              onClick={handleDislike} 
              className={`interaction-btn ${isDisliked ? 'disliked' : ''}`}
            >
              {isDisliked ? '👎' : '👍'} {dislikes}
            </button>
            
            <button 
              onClick={handleBookmark} 
              className={`interaction-btn ${isBookmarked ? 'bookmarked' : ''}`}
            >
              {isBookmarked ? '🔖' : '📖'} {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <div className="comments-header">
            <h3>💬 Comments ({comments.length})</h3>
            <button 
              className="add-comment-btn"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              {showCommentForm ? 'Cancel' : 'Add Comment'}
            </button>
          </div>

          {/* Add Comment Form */}
          {showCommentForm && (
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="comment-input"
                rows="3"
              />
              <button type="submit" className="submit-comment-btn">
                Post Comment
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {loadingComments ? (
              <div className="loading-comments">Loading comments...</div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.name}</span>
                    <span className="comment-time">{formatTimestamp(comment.created_at)}</span>
                  </div>
                  <div className="comment-content">{comment.text}</div>
                </div>
              ))
            ) : (
              <div className="no-comments">No comments yet. Be the first to comment!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
