import React, { useState } from 'react';
import PostCard from './PostCard';
import LoadingSkeleton from './LoadingSkeleton';

const PostList = ({ posts, loading, lastPostRef, hasMore, onPostClick, onLoadMore }) => {
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
        <button 
          onClick={() => handleSort('recent')} 
          className={`sort-button ${sortOrder === 'recent' ? 'active' : ''}`}
        >
          Recent
        </button>
        <button 
          onClick={() => handleSort('liked')} 
          className={`sort-button ${sortOrder === 'liked' ? 'active' : ''}`}
        >
          Most Liked
        </button>
        <button 
          onClick={() => handleSort('alphabetical')} 
          className={`sort-button ${sortOrder === 'alphabetical' ? 'active' : ''}`}
        >
          Alphabetical
        </button>
      </div>
      
      {sortedPosts.map((post, index) => {
        if (sortedPosts.length === index + 1) {
          return <PostCard ref={lastPostRef} key={post.id} post={post} onClick={onPostClick} />;
        }
        return <PostCard key={post.id} post={post} onClick={onPostClick} />;
      })}
      
      {loading && <LoadingSkeleton />}
      
      {!loading && hasMore && (
        <div className="load-more-section">
          <button 
            className="load-more-btn"
            onClick={onLoadMore}
          >
            📚 Load More Posts
          </button>
        </div>
      )}
      
      {!hasMore && !loading && sortedPosts.length > 0 && (
        <div className="end-of-posts-message">
          <p>🎉 You've reached the end of all posts!</p>
          <p>Total posts: {sortedPosts.length}</p>
        </div>
      )}
      
      {!loading && sortedPosts.length === 0 && (
        <div className="no-posts-message">
          <p>📭 No posts found</p>
          <p>Try adjusting your filters or create a new post!</p>
        </div>
      )}
    </div>
  );
};

export default PostList;