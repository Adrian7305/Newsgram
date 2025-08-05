import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <div>
        <strong>Author:</strong> {post.author}
      </div>
      <div className="tags">
        {post.tags && post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
