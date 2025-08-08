// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by title or content..."
      className="p-2 border rounded w-full mb-4"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
