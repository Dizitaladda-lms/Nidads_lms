"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "blog-theme";
const PREFERENCE_KEY = "blog-theme-preference";

export default function BlogThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  /* ── On mount: read saved preference ── */
  useEffect(() => {
    const savedPreference = localStorage.getItem(PREFERENCE_KEY);
    const initial = savedPreference === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    setMounted(true);
  }, []);

  /* Apply theme to .blog-page and the navbar outside it. */
  useEffect(() => {
    if (!mounted) return;

    const root = document.querySelector(".blog-page");
    if (root) {
      root.setAttribute("data-theme", theme);
    }
    document.body.setAttribute("data-blog-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    return () => {
      document.body.removeAttribute("data-blog-theme");
    };
  }, [theme, mounted]);

  const toggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(PREFERENCE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  /* ── Avoid hydration flash ── */
  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <button
      id="blog-theme-toggle"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="blog-theme-toggle"
      data-theme-active={theme}
    >
      <span className="blog-theme-toggle__track">
        <span className="blog-theme-toggle__thumb">
          {isLight ? (
            /* Sun icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </span>
      </span>
      <span className="blog-theme-toggle__label">
        {isLight ? "Light" : "Dark"}
      </span>
    </button>
  );
}
