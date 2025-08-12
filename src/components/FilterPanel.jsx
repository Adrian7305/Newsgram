// src/components/FilterPanel.jsx
import React from 'react';

export default function FilterPanel({ tags, authors, selectedTag, selectedAuthor, onFilter }) {
  return (
    <div className="filter-panel">
      <select 
        value={selectedTag} 
        onChange={(e) => onFilter('tag', e.target.value)} 
        className="filter-select"
      >
        <option value="">All Tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <select 
        value={selectedAuthor} 
        onChange={(e) => onFilter('author', e.target.value)} 
        className="filter-select"
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>
    </div>
  );
}
