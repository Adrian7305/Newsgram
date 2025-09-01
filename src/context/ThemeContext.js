import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia) {
      try {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
      } catch {}
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    // set body class so CSS can target body.dark / body.light
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    // also expose as data-theme on <html> for CSS variables if needed
    document.documentElement.setAttribute("data-theme", theme);
    // brief transition helper on theme change
    document.documentElement.classList.add("theme-transition");
    const timeout = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    return () => window.clearTimeout(timeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
