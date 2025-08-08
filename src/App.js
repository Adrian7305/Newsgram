import { useState } from "react";
import useFetchPosts from "./hooks/useFetchPosts";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import LoadingSkeleton from "./components/LoadingSkeleton";

const App = () => {
  const [page, setPage] = useState(1);
  const { posts, loading, hasMore } = useFetchPosts(page, 5);
  const loadMore = () => setPage((prev) => prev + 1);

  const lastPostRef = useInfiniteScroll(loading, hasMore, loadMore);

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 Infinite Posts</h2>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div ref={lastPostRef} key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        }
      })}
      {loading && <LoadingSkeleton />}
    </div>
  );
};

export default App;