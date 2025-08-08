import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent'); // Default sorting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(res => {
        // Add a random initial like count and a creation date to each post
        const postsWithLikesAndDate = res.data.map(post => ({
          ...post,
          initialLikes: Math.floor(Math.random() * 100),
          createdDate: new Date()
        }));
        setPosts(postsWithLikesAndDate);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch posts.');
        setLoading(false);
      });
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sorting logic based on the sortOrder state
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'liked') {
      return b.initialLikes - a.initialLikes;
    }
    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    // Default to 'recent'
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      <div className="sort-buttons">
        <button onClick={() => handleSort('recent')}>Recent</button>
        <button onClick={() => handleSort('liked')}>Liked</button>
        <button onClick={() => handleSort('alphabetical')}>Alphabetical</button>
      </div>
      {sortedPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
