import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={`theme-toggle-btn ${theme}`}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="toggle-track" aria-hidden>
        <span className="toggle-thumb">
          {theme === "light" ? "☀️" : "🌙"}
        </span>
      </span>
      <span className="toggle-label">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
};

export default ThemeToggle;
