import { useState } from "react";
import useFetchPosts from "./hooks/useFetchPosts";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import PostList from "./components/PostList";
import Home from "./pages/Home";
import PostDetails from "./components/PostDetails";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "feed"
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);
  
  const { posts, loading, hasMore } = useFetchPosts(page, 5);
  const loadMore = () => setPage((prev) => prev + 1);

  const lastPostRef = useInfiniteScroll(loading, hasMore, loadMore);

  // Add a random initial like count and a creation date to each post once fetched
  const postsWithMetaData = posts.map(post => ({
    ...post,
    initialLikes: post.initialLikes || Math.floor(Math.random() * 100),
    createdDate: post.createdDate || new Date(),
  }));

  // Extract unique tags and authors for filtering
  const tags = [...new Set(posts.flatMap(post => post.tags || []))];
  const authors = [...new Set(posts.map(post => post.author))];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostDetailsOpen(true);
  };

  const handleClosePostDetails = () => {
    setIsPostDetailsOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <div className="nav-header">
        <h1>📰 Newsgram</h1>
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-tab ${currentPage === "feed" ? "active" : ""}`}
            onClick={() => setCurrentPage("feed")}
          >
            📚 Infinite Feed
          </button>
        </nav>
      </div>

      {/* Page Content */}
      {currentPage === "home" ? (
        <Home 
          posts={postsWithMetaData} 
          tags={tags} 
          authors={authors}
          onPostClick={handlePostClick}
        />
      ) : (
        <div className="feed-container">
          <h2>📚 Infinite Posts</h2>
          <PostList 
            posts={postsWithMetaData} 
            loading={loading} 
            lastPostRef={lastPostRef} 
            hasMore={hasMore}
            onPostClick={handlePostClick}
          />
        </div>
      )}

      {/* Post Details Modal */}
      <PostDetails
        post={selectedPost}
        isOpen={isPostDetailsOpen}
        onClose={handleClosePostDetails}
      />
    </div>
  );
};

export default App;