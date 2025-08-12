// src/pages/Home.jsx
import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import BookmarkToggle from '../components/BookmarkToggle';
import PostList from '../components/PostList';
import { getBookmarks } from '../utils/bookmarkUtils';

export default function Home({ posts, tags, authors, loading = false, hasMore = false, lastPostRef = null, onPostClick }) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter(post => {
      const q = query.toLowerCase();
      const isMatch = post.title.toLowerCase().includes(q) || post.body.toLowerCase().includes(q);
      const tagMatch = selectedTag ? post.tags && post.tags.includes(selectedTag) : true;
      const authorMatch = selectedAuthor ? post.author === selectedAuthor : true;
      const bookmarked = !showOnlyBookmarked || getBookmarks().includes(post.id);
      return isMatch && tagMatch && authorMatch && bookmarked;
    });
  }, [posts, query, selectedTag, selectedAuthor, showOnlyBookmarked]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>🏠 Home Feed</h2>
        <p>Search, filter, and discover posts</p>
      </div>
      
      <div className="controls-section">
        <SearchBar query={query} onSearch={setQuery} />
        <FilterPanel
          tags={tags}
          authors={authors}
          selectedTag={selectedTag}
          selectedAuthor={selectedAuthor}
          onFilter={(type, value) => {
            if (type === 'tag') setSelectedTag(value);
            else if (type === 'author') setSelectedAuthor(value);
          }}
        />
        <BookmarkToggle
          showOnlyBookmarked={showOnlyBookmarked}
          toggle={() => setShowOnlyBookmarked(prev => !prev)}
        />
      </div>

      <div className="results-info">
        <p>Showing {filtered.length} of {posts.length} posts</p>
        {(query || selectedTag || selectedAuthor || showOnlyBookmarked) && (
          <button 
            className="clear-filters"
            onClick={() => {
              setQuery('');
              setSelectedTag('');
              setSelectedAuthor('');
              setShowOnlyBookmarked(false);
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      <PostList 
        posts={filtered} 
        loading={loading}
        hasMore={hasMore}
        lastPostRef={lastPostRef}
        onPostClick={onPostClick}
      />
    </div>
  );
}
