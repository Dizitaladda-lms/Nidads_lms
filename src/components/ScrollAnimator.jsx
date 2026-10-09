"use client";
import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const revealSelector = [
      ".reveal",
      ".reveal-left",
      ".reveal-right",
      ".reveal-scale",
      ".reveal-down",
      "[data-reveal]",
    ].join(", ");
    const delays = ["delay-1", "delay-2", "delay-3", "delay-4", "delay-5", "delay-6"];

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const prepareSection = (section) => {
      section.querySelectorAll("h1, h2, h3").forEach((element) => {
        if (!element.classList.contains("reveal") && !element.classList.contains("reveal-left")) {
          element.classList.add("reveal");
        }
      });

      section.querySelectorAll("p").forEach((element, index) => {
        if (!element.closest("[class*='card']") && !element.classList.contains("reveal")) {
          element.classList.add("reveal");
          if (index === 0) element.classList.add("delay-1");
          if (index === 1) element.classList.add("delay-2");
        }
      });

      const seen = new Set();
      [
        "[class*='card']",
        "[class*='Card']",
        "[class*='grid'] > *",
        "[class*='Grid'] > *",
        "article",
        "li[class*='item']",
      ].forEach((selector) => {
        section.querySelectorAll(selector).forEach((element, index) => {
          if (seen.has(element)) return;
          seen.add(element);
          if (!element.classList.contains("reveal-scale")) {
            element.classList.add("reveal-scale");
            if (index < delays.length) element.classList.add(delays[index]);
          }
        });
      });

      section.querySelectorAll(revealSelector).forEach((element) => revealObserver.observe(element));
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prepareSection(entry.target);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "600px 0px" }
    );

    document.querySelectorAll("section").forEach((section) => sectionObserver.observe(section));
    document.querySelectorAll(revealSelector).forEach((element) => revealObserver.observe(element));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
