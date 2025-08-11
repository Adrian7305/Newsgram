// src/pages/Home.jsx
import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import BookmarkToggle from '../components/BookmarkToggle';
import PostList from '../components/PostList';
import { getBookmarks } from '../utils/bookmarkUtils';

export default function Home({ posts, tags, authors }) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter(post => {
      const q = query.toLowerCase();
      const isMatch = post.title.toLowerCase().includes(q) || post.body.toLowerCase().includes(q);
      const tagMatch = selectedTag ? post.tags.includes(selectedTag) : true;
      const authorMatch = selectedAuthor ? post.author === selectedAuthor : true;
      const bookmarked = !showOnlyBookmarked || getBookmarks().includes(post.id);
      return isMatch && tagMatch && authorMatch && bookmarked;
    });
  }, [posts, query, selectedTag, selectedAuthor, showOnlyBookmarked]);

  return (
    <div className="p-4">
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
      <PostList posts={filtered} />
    </div>
  );
}
