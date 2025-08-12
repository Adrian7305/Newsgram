import React, { useState } from 'react';
import { forwardRef } from 'react';

const PostCard = forwardRef(({ post }, ref) => {
  const [likes, setLikes] = useState(post.initialLikes);
  const [dislikes, setDislikes] = useState(post.initialDislikes || 0); // New dislike state
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
      // If a user dislikes a post and then likes it, remove the dislike
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
      // If a user likes a post and then dislikes it, remove the like
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
    setIsDisliked(!isDisliked);
  };

  return (
    <div className="post-card" ref={ref}>
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <div>
        <strong>Author:</strong> {post.author}
      </div>
      <div>
        <strong>Date:</strong> {new Date(post.createdDate).toLocaleDateString()}
      </div>
      <div className="tags">
        {post.tags && post.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="interactions">
        <button onClick={handleLike} className={isLiked ? 'liked-btn' : ''}>
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>
        <button onClick={handleDislike} className={isDisliked ? 'disliked-btn' : ''}>
          {isDisliked ? '👎' : '👍'} {dislikes}
        </button>
      </div>
    </div>
  );
});

export default PostCard;