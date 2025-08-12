import { useState, useEffect } from "react";
import { fetchPosts } from "../api/api";

const useFetchPosts = (page, limit = 5) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page, limit)
      .then((newPosts) => {
        if (page === 1) {
          // Reset posts for first page
          setPosts(newPosts);
        } else {
          // Append posts for subsequent pages
          setPosts((prev) => [...prev, ...newPosts]);
        }
        setHasMore(newPosts.length === limit);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [page, limit]);

  return { posts, loading, hasMore };
};

export default useFetchPosts;