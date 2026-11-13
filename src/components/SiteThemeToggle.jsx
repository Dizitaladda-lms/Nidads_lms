"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "site-theme-preference";

export default function SiteThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved === "light" ? "light" : "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    document.body.setAttribute("data-site-theme", initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    document.body.setAttribute("data-site-theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="site-theme-toggle"
      data-theme-active={mounted ? theme : "dark"}
    >
      {theme === "light" ? "☾ Dark" : "☀ Light"}
    </button>
  );
}
