// src/components/BookmarkToggle.jsx
export default function BookmarkToggle({ showOnlyBookmarked, toggle }) {
  return (
    <div className="bookmark-toggle" onClick={toggle}>
      <input
        type="checkbox"
        checked={showOnlyBookmarked}
        onChange={toggle}
      />
      <span>Show Bookmarked Only</span>
    </div>
  );
}
