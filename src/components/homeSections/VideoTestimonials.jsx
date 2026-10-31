"use client";

import { useState, useRef } from "react";
import styles from "./VideoTestimonials.module.css";
import PopupButton from "@/components/PopupButton";

const VIDEOS = [
  {
    id: "pgg6p_TfrN8",
    name: "NIDADS Student",
    role: "Data Analytics Trainee",
    title: "Real Learning Experience at NIDADS",
    badge: "Student Review",
    course: "Data Analytics & AI",
    startTime: 0,
    rating: 5,
  },
  {
    id: "miVSa95wPdg",
    name: "Pranjal",
    role: "Data Science Aspirant",
    title: "Happy Learning Journey in Data Science",
    badge: "Alumni Story",
    course: "Data Science & Analytics",
    startTime: 0,
    rating: 5,
  },
  {
    id: "GAphkSNI1Ao",
    name: "NIDADS Learner",
    role: "Machine Learning Student",
    title: "Practical Learning & Real Projects",
    badge: "Verified Review",
    course: "Data Science & ML",
    startTime: 0,
    rating: 5,
  },
  {
    id: "fKCxptOFfic",
    name: "Palak",
    role: "Data Science Student",
    title: "Palak's Learning Experience & Mentorship",
    badge: "Student Testimonial",
    course: "Data Science Master Program",
    startTime: 0,
    rating: 5,
  },
  {
    id: "4N0PKy5xj2o",
    name: "Founder & Mentors",
    role: "Inside NIDADS Campus",
    title: "Founder Challenges Trainers & Students",
    badge: "Campus & Mentorship",
    course: "Practical Industry Training",
    startTime: 11, // Starts at 0:11 (11s) as requested
    rating: 5,
  },
];

export default function VideoTestimonials() {
  const [playingId, setPlayingId] = useState(null);
  const trackRef = useRef(null);

  const handlePlay = (id) => {
    setPlayingId(id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setPlayingId(null);
  };

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const cardWidth = 300;
    const offset = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
    trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className={styles.section} id="student-video-reviews">
      <div className={styles.glowOrb} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>Real Student Stories</span>
          </div>

          <h2 className={styles.title}>
            Watch Verified <span className={styles.highlight}>Student Reviews</span> & Testimonials
          </h2>

          <p className={styles.description}>
            Don&apos;t just take our word for it. Hear directly from real students who learned data science,
            built hands-on projects, and launched their careers with NIDADS.
          </p>

          {/* Trust Highlights */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⭐</span>
              <span><strong>4.9 / 5</strong> Student Satisfaction</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🎯</span>
              <span><strong>25,000+</strong> Trained Learners</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>💼</span>
              <span><strong>100%</strong> Practical Placement Support</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🏢</span>
              <span><strong>18+</strong> Top Hiring Partners</span>
            </div>
          </div>
        </div>

        {/* Slider Controls Header */}
        <div className={styles.sliderHeader}>
          <div className={styles.sliderHint}>
            <span>👉</span>
            <span>Click any video to play directly right here</span>
          </div>
          <div className={styles.controls}>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("left")}
              aria-label="Scroll reviews left"
            >
              ❮
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("right")}
              aria-label="Scroll reviews right"
            >
              ❯
            </button>
          </div>
        </div>

        {/* Video Track */}
        <div className={styles.sliderTrack} ref={trackRef}>
          {VIDEOS.map((item) => {
            const isPlaying = playingId === item.id;
            const embedUrl = `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1${
              item.startTime ? `&start=${item.startTime}` : ""
            }`;

            return (
              <div
                key={item.id}
                className={`${styles.videoCard} ${isPlaying ? styles.videoCardActive : ""}`}
                onClick={() => !isPlaying && handlePlay(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePlay(item.id);
                  }
                }}
                aria-label={`Play video review of ${item.name}`}
              >
                {isPlaying ? (
                  <div className={styles.playerFrameWrapper}>
                    <button
                      className={styles.closePlayerBtn}
                      onClick={handleClose}
                      aria-label="Close video player"
                    >
                      ✕ Close
                    </button>
                    <iframe
                      className={styles.iframePlayer}
                      src={embedUrl}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className={styles.thumbWrap}>
                    <img
                      className={styles.thumbImg}
                      src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className={styles.gradientOverlay} />

                    {/* Top Badges */}
                    <div className={styles.cardTopRow}>
                      <span className={styles.tagBadge}>{item.badge}</span>
                      <span className={styles.shortIconBadge}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        Short
                      </span>
                    </div>

                    {/* Glowing Play Button */}
                    <div className={styles.playBtnWrapper}>
                      <div className={styles.playCircle}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className={styles.playTextHint}>Tap to Play</span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className={styles.cardBottom}>
                      <div className={styles.stars}>{"★".repeat(item.rating)}</div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <div className={styles.cardMeta}>
                        <span>{item.name}</span>
                        <span className={styles.cardCourse}>{item.course}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <p className={styles.bottomText}>
            Want to transform your career like these learners? <strong>Talk to our mentors today.</strong>
          </p>
          <PopupButton className="btn btn--primary" style={{ padding: "14px 34px", fontSize: "16px" }}>
            Book Free Career Counselling →
          </PopupButton>
        </div>
      </div>
    </section>
  );
}
