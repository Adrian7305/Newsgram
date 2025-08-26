import { useState } from "react";
import useFetchPosts from "./hooks/useFetchPosts";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import PostList from "./components/PostList";
import Home from "./pages/Home";
import PostDetails from "./components/PostDetails";
// at top of App.js
import ThemeToggle from "./components/ThemeToggle";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";




const App = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "feed"
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [localPosts, setLocalPosts] = useState([]);
  
  const itemsPerPage = currentPage === "feed" ? 5 : 20;
  const { posts, loading, hasMore } = useFetchPosts(page, itemsPerPage, refreshKey);
  const loadMore = () => setPage((prev) => prev + 1);

  const lastPostRef = useInfiniteScroll(loading, hasMore, loadMore);

  // Add a random initial like count and a creation date to each post once fetched
  const postsWithMetaData = [...localPosts, ...posts].map(post => ({
    ...post,
    initialLikes: post.initialLikes || Math.floor(Math.random() * 100),
    createdDate: post.createdDate || new Date(),
  }));

  // Extract unique tags and authors for filtering
  const tags = [...new Set(postsWithMetaData.flatMap(post => post.tags || []))];
  const authors = [...new Set(postsWithMetaData.map(post => post.author))];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostDetailsOpen(true);
  };

  const handleClosePostDetails = () => {
    setIsPostDetailsOpen(false);
    setSelectedPost(null);
  };

  const handlePostAdded = (newPost) => {
    // Add the new post to the beginning of local posts
    const postWithMetadata = {
      ...newPost,
      initialLikes: 0,
      createdDate: new Date(),
    };
    
    setLocalPosts(prev => [postWithMetadata, ...prev]);
    
    // Also refresh the API posts to ensure consistency
    setRefreshKey(prev => prev + 1);
    setPage(1);
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="app-container">
      {/* Navigation Header */}
     <div className="nav-header">
  <h1>📰 Newsgram</h1>

  {/* Theme toggle aligned to the right of header */}
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <ThemeToggle />
    <button className="nav-tab" onClick={logout} title={user?.username ? `Logged in as ${user.username}` : undefined}>🚪 Logout</button>
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
</div>


      {/* Page Content */}
      {currentPage === "home" ? (
        <Home 
          posts={postsWithMetaData} 
          tags={tags} 
          authors={authors}
          onPostClick={handlePostClick}
          onPostAdded={handlePostAdded}
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
            onLoadMore={loadMore}
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