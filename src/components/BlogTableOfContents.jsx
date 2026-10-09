"use client";

import { useState } from "react";

const INITIAL_HEADING_COUNT = 5;

export default function BlogTableOfContents({ headings }) {
  const [showAll, setShowAll] = useState(false);
  const visibleHeadings = showAll
    ? headings
    : headings.slice(0, INITIAL_HEADING_COUNT);

  return (
    <details className="blog-toc">
      <summary>Table of contents</summary>
      <nav aria-label="Table of contents">
        <ol>
          {visibleHeadings.map((heading) => (
            <li key={heading.id} className={`blog-toc__item--h${heading.level}`}>
              <a href={`#${heading.id}`}>{heading.title}</a>
            </li>
          ))}
        </ol>
        {headings.length > INITIAL_HEADING_COUNT && (
          <button
            type="button"
            className="blog-toc__view-more"
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? "View less" : "View more"}
          </button>
        )}
      </nav>
    </details>
  );
}
