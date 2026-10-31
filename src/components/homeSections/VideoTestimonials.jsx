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
    rating: "5.0 Rating",
  },
  {
    id: "miVSa95wPdg",
    name: "Pranjal",
    role: "Data Science Aspirant",
    title: "Happy Learning Journey in Data Science",
    badge: "Alumni Story",
    course: "Data Science & Analytics",
    startTime: 0,
    rating: "5.0 Rating",
  },
  {
    id: "GAphkSNI1Ao",
    name: "NIDADS Learner",
    role: "Machine Learning Student",
    title: "Practical Learning & Real Projects",
    badge: "Verified Review",
    course: "Data Science & ML",
    startTime: 0,
    rating: "5.0 Rating",
  },
  {
    id: "fKCxptOFfic",
    name: "Palak",
    role: "Data Science Student",
    title: "Palak's Learning Experience & Mentorship",
    badge: "Student Testimonial",
    course: "Data Science Master Program",
    startTime: 0,
    rating: "5.0 Rating",
  },
  {
    id: "4N0PKy5xj2o",
    name: "Founder & Mentors",
    role: "Inside NIDADS Campus",
    title: "Founder Challenges Trainers & Students",
    badge: "Campus & Mentorship",
    course: "Practical Industry Training",
    startTime: 11, // Starts at 0:11 (11s) as requested
    rating: "5.0 Rating",
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
    const cardWidth = 340;
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
            <span className={styles.badgeText}>Real Stories & Trainer Insights</span>
          </div>

          <h2 className={styles.title}>
            Watch Our <span className={styles.highlight}>Trainers & Students</span> in Action
          </h2>

          <p className={styles.description}>
            Don&apos;t just take our word for it. Watch how our expert mentors teach and hear directly from real students who transformed their careers with NIDADS.
          </p>

          {/* Trust Highlights */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <span><strong>4.9 / 5</strong> Student Rating</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span><strong>25,000+</strong> Trained Learners</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span><strong>100%</strong> Practical Placement Support</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span><strong>18+</strong> Top Hiring Partners</span>
            </div>
          </div>
        </div>

        {/* Slider Controls Header */}
        <div className={styles.sliderHeader}>
          <div className={styles.sliderHint}>
            <span>Select any video to play directly right here</span>
          </div>
          <div className={styles.controls}>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              Previous
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              Next
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
                aria-label={`Play video of ${item.name}`}
              >
                {isPlaying ? (
                  <div className={styles.playerFrameWrapper}>
                    <button
                      className={styles.closePlayerBtn}
                      onClick={handleClose}
                      aria-label="Close video player"
                    >
                      Close
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
                      <span className={styles.shortIconBadge}>Shorts</span>
                    </div>

                    {/* Clean Play Pill Button */}
                    <div className={styles.playBtnWrapper}>
                      <div className={styles.playPill}>PLAY</div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className={styles.cardBottom}>
                      <div className={styles.ratingTag}>{item.rating}</div>
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
            Book Free Career Counselling
          </PopupButton>
        </div>
      </div>
    </section>
  );
}
