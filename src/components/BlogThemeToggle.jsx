"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "blog-theme";

export default function BlogThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  /* ── On mount: read saved preference ── */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved === "light" ? "light" : "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    setMounted(true);
  }, []);

  /* Apply theme to .blog-page AND inject navbar overrides into <head> */
  useEffect(() => {
    if (!mounted) return;

    /* 1. Scope blog-page itself */
    const root = document.querySelector(".blog-page");
    if (root) {
      root.setAttribute("data-theme", theme);
    }

    /* 2. Navbar lives outside .blog-page and uses CSS Modules whose
          hashed class names beat a plain global selector even with
          !important in some build orders. Injecting a <style> tag
          directly into <head> is the only 100% reliable override. */
    const STYLE_ID = "blog-theme-navbar-override";
    let styleEl = document.getElementById(STYLE_ID);

    if (theme === "light") {
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `
        /* Blog light-theme navbar overrides — injected by BlogThemeToggle */
        nav {
          background: rgba(255, 255, 255, 0.88) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          box-shadow: 0 1px 0 rgba(0, 60, 160, 0.1) !important;
        }
        nav::after {
          background: rgba(0, 80, 200, 0.14) !important;
        }
        nav a,
        nav li a {
          color: #0d1f3c !important;
        }
        nav a:hover,
        nav li a:hover {
          color: #1a72e8 !important;
        }
        /* mobile hamburger / close button */
        nav button[aria-label="Open menu"],
        nav button[aria-label="Close menu"] {
          color: #0d1f3c !important;
        }
      `;
    } else {
      /* Dark mode — remove the injected overrides so the navbar returns to normal */
      if (styleEl) {
        styleEl.remove();
      }
    }

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

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
