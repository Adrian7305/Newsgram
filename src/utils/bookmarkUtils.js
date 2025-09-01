// src/utils/bookmarkUtils.js
export function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarked') || '[]');
}

export function toggleBookmark(id) {
  const bookmarks = getBookmarks();
  const updated = bookmarks.includes(id)
    ? bookmarks.filter(bid => bid !== id)
    : [...bookmarks, id];

  localStorage.setItem('bookmarked', JSON.stringify(updated));
  return updated;
}
