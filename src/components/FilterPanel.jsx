// src/components/FilterPanel.jsx
import React from 'react';

export default function FilterPanel({ tags, authors, selectedTag, selectedAuthor, onFilter }) {
  return (
    <div className="flex gap-4 mb-4">
      <select value={selectedTag} onChange={(e) => onFilter('tag', e.target.value)} className="p-2 border rounded">
        <option value="">All Tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <select value={selectedAuthor} onChange={(e) => onFilter('author', e.target.value)} className="p-2 border rounded">
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>
    </div>
  );
}
