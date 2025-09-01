// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by title or content..."
      className="search-bar"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
