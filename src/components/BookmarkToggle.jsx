// src/components/BookmarkToggle.jsx
export default function BookmarkToggle({ showOnlyBookmarked, toggle }) {
  return (
    <label className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        checked={showOnlyBookmarked}
        onChange={toggle}
      />
      Show Bookmarked Only
    </label>
  );
}
