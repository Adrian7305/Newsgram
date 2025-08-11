import React, { useState } from 'react';
import PostCard from './PostCard';
import LoadingSkeleton from './LoadingSkeleton';

const PostList = ({ posts, loading, lastPostRef, hasMore }) => {
  const [sortOrder, setSortOrder] = useState('recent'); // Default sorting

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'liked') {
      return b.initialLikes - a.initialLikes;
    }
    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return b.createdDate ? new Date(b.createdDate) - new Date(a.createdDate) : 0;
  });

  return (
    <div className="post-list">
      <div className="sort-buttons">
        <button onClick={() => handleSort('recent')} className={sortOrder === 'recent' ? 'active' : ''}>Recent</button>
        <button onClick={() => handleSort('liked')} className={sortOrder === 'liked' ? 'active' : ''}>Liked</button>
        <button onClick={() => handleSort('alphabetical')} className={sortOrder === 'alphabetical' ? 'active' : ''}>Alphabetical</button>
      </div>
      {sortedPosts.map((post, index) => {
        if (sortedPosts.length === index + 1) {
          return <PostCard ref={lastPostRef} key={post.id} post={post} />;
        }
        return <PostCard key={post.id} post={post} />;
      })}
      {loading && <LoadingSkeleton />}
      {!hasMore && !loading && <p className="end-of-posts-message">You have reached the end of the posts.</p>}
    </div>
  );
};

export default PostList;