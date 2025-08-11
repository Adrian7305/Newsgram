import { useState } from "react";
import useFetchPosts from "./hooks/useFetchPosts";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import PostList from "./components/PostList";

const App = () => {
  const [page, setPage] = useState(1);
  const { posts, loading, hasMore } = useFetchPosts(page, 5);
  const loadMore = () => setPage((prev) => prev + 1);

  const lastPostRef = useInfiniteScroll(loading, hasMore, loadMore);

  // Add a random initial like count and a creation date to each post once fetched
  const postsWithMetaData = posts.map(post => ({
    ...post,
    initialLikes: post.initialLikes || Math.floor(Math.random() * 100),
    createdDate: post.createdDate || new Date(),
  }));

  return (
    <div className="app-container">
      <h2>📚 Infinite Posts</h2>
      <PostList 
        posts={postsWithMetaData} 
        loading={loading} 
        lastPostRef={lastPostRef} 
        hasMore={hasMore} 
      />
    </div>
  );
};

export default App;