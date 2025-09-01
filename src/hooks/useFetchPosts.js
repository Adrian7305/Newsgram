import { useState, useEffect } from "react";
import { fetchPosts } from "../api/api";

const useFetchPosts = (page, limit = 20, refreshKey = 0) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page, limit)
      .then((newPosts) => {
        if (page === 1 || refreshKey > 0) {
          // Reset posts for first page or when refreshing
          setPosts(newPosts);
        } else {
          // Append posts for subsequent pages
          setPosts((prev) => [...prev, ...newPosts]);
        }
        
        // If we're fetching all posts at once (limit >= 20), set hasMore to false
        if (limit >= 20) {
          setHasMore(false);
        } else {
          setHasMore(newPosts.length === limit);
        }
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [page, limit, refreshKey]);

  return { posts, loading, hasMore };
};

export default useFetchPosts;