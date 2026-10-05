"use client";

import Image from "next/image";
import styles from "./TrustedCompanies.module.css";
import { useRef, useEffect, useState } from "react";

const companies = [
  { name: "American Express", logo: "/logo/1.png" },
  { name: "Club Mahindra", logo: "/logo/2.png" },
  { name: "Fractal", logo: "/logo/3.png" },
  { name: "Infosys", logo: "/logo/4.png" },
  { name: "Intel", logo: "/logo/5.png" },
  { name: "L&T Financial Services", logo: "/logo/6.png" },
  { name: "AB InBev", logo: "/logo/7.png" },
  { name: "WNS", logo: "/logo/8.png" },
  { name: "Adobe", logo: "/logo/adobe.png" },
  { name: "Amazon", logo: "/logo/amazon.jpg" },
  { name: "Apple", logo: "/logo/apple.png" },
  { name: "Meta", logo: "/logo/meta.png" },
];

export default function TrustedCompanies() {
  const carouselRef = useRef(null);
  const [isAutoScroll, setIsAutoScroll] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 769px)");

    const syncAutoScroll = () => {
      setIsAutoScroll(mediaQuery.matches);
    };

    syncAutoScroll();
    mediaQuery.addEventListener("change", syncAutoScroll);

    return () => {
      mediaQuery.removeEventListener("change", syncAutoScroll);
    };
  }, []);

  useEffect(() => {
    if (!isAutoScroll || !carouselRef.current) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: 124,
          behavior: "smooth",
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isAutoScroll]);

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.label}>Trusted by leading brands</span>
          <h2 className={styles.title}>Trusted by <span style={{color:"#38b6ff"}}>500+</span> Enterprises</h2>
          <p className={styles.description}>
            Over 500+ enterprises trust us for building their next-generation AI teams.
            Partner with us to drive your growth and innovation.
          </p>
        </div>

        {/* Desktop: scrolling carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={carouselRef}>
            {[...companies, ...companies].map((company, idx) => (
              <div key={`${company.name}-${idx}`} className={styles.card}>
                <Image
                  src={company.logo}
                  alt={company.name}
                  className={styles.logo}
                  width={120}
                  height={48}
                  loading="lazy"
                  sizes="120px"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: static wrapped grid — all logos visible */}
        <div className={styles.mobileGrid}>
          {companies.map((company) => (
            <div key={company.name} className={styles.mobileCard}>
              <Image
                src={company.logo}
                alt={company.name}
                className={styles.logo}
                width={120}
                height={48}
                loading="lazy"
                sizes="120px"
                quality={75}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
