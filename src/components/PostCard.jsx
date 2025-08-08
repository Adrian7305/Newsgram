import React, { useState } from 'react';

const PostCard = ({ post }) => {
  // Local state for like count and liked status
  const [likes, setLikes] = useState(post.initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-card">
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
        <button onClick={handleLike}>
          {isLiked ? '❤️ Liked' : '🤍 Like'}
        </button>
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default PostCard;
