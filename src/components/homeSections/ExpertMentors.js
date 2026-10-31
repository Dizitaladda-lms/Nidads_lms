"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ExpertMentors.module.css";
import PopupButton from "@/components/PopupButton";

const mentors = [
  {
    name: "Miss Shagun shrivastav",
    role: "Lead Data Science Trainer · ML & AI",
    headline:
      "3 years of industry experience in Machine Learning, Deep Learning, and AI. Specializes in building end-to-end ML pipelines and deploying models at scale.",
    stats: "4.9 ★ 320+ reviews",
    chips: ["ML & Deep Learning", "1:1 Doubt Support"],
    img: "/shagun.png",
    hasVideoDemo: true,
  },
  {
    name: "Mr. Deepanshu Soni",
    role: "Senior Data Analyst · BI & Visualisation",
    headline:
      "3 years of experience in Data Analytics, Power BI, Tableau, and SQL. Expert in turning raw datasets into actionable business insights.",
    stats: "4.8 ★ 280+ reviews",
    chips: ["Power BI & Tableau", "SQL & Python"],
    img: "/deepanshu.jpeg",
  },
  {
    name: "Gulshan Kumar",
    role: "Founder",
    headline:
      "Dr. Gulshan Kumar is the Founder and Head Trainer at DizitalAdda, with over 10 years of hands-on experience in Education Industry. He holds a doctoral qualification and has spent his career at the intersection of marketing strategy, content writing, and AI-driven analytics.",
    img: "/about/gulshan-kumar.webp",
    chips: ["Education", "Career Counseling"],
  },
];

const TRAINER_VIDEO_ID = "GX9GQUE0xjo";

export default function ExpertMentors() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPlay = () => {
    setIsPlaying(true);
    const elem = document.getElementById("trainer-spotlight-video");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className={styles.section} id="expert-mentors">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.overline}>Learn Directly from</p>
          <h2 className={styles.title}>
            Our <span style={{ color: "#38b6ff" }}>Expert Market</span> Mentors
          </h2>
          <p className={styles.subtitle}>
            At NIDADS, you learn from active industry professionals who build, deploy, and scale real-world Data Science and AI solutions every day.
          </p>
        </div>

        <div className={styles.grid}>
          {mentors.map((mentor) => (
            <article key={mentor.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={mentor.img}
                    alt={mentor.name}
                    className={styles.avatar}
                    width={96}
                    height={96}
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className={styles.cardTag}>Market Mentor</p>
                  <h3 className={styles.cardName}>{mentor.name}</h3>
                  <p className={styles.cardRole}>{mentor.role}</p>
                </div>
              </div>

              <p className={styles.cardText}>{mentor.headline}</p>

              <div className={styles.chipRow}>
                {mentor.chips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>

              {mentor.hasVideoDemo && (
                <button
                  type="button"
                  className={styles.watchDemoBtn}
                  onClick={handleStartPlay}
                  aria-label="Watch Miss Shagun's teaching demo"
                >
                  <span>Watch Teaching Demo</span>
                </button>
              )}
            </article>
          ))}
        </div>

        {/* Featured Large Trainer Spotlight Video Banner */}
        <div className={styles.spotlightBanner} id="trainer-spotlight-video">
          <div className={styles.spotlightContent}>
            <span className={styles.spotlightBadge}>
              LIVE TRAINER CHALLENGE
            </span>
            <h3 className={styles.spotlightTitle}>
              &ldquo;Is Your Data Knowledge Enough for a Job? Take This 60-Sec Test!&rdquo;
            </h3>
            <p className={styles.spotlightText}>
              Watch <strong>Miss Shagun Shrivastav</strong> (Lead Data Science Trainer) walk through real-world data analyst interview questions. Experience our practical, student-first teaching methodology right now.
            </p>
            <div className={styles.spotlightActions}>
              <button
                type="button"
                className={styles.playActionBtn}
                onClick={() => setIsPlaying(true)}
              >
                {isPlaying ? "Video Playing" : "Watch Assessment Video"}
              </button>
              <PopupButton
                className="btn btn--secondary"
                style={{
                  padding: "14px 28px",
                  fontSize: "15px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontWeight: "600",
                }}
              >
                Join Next Batch
              </PopupButton>
            </div>
          </div>

          {/* Large Interactive Playable Video Card */}
          <div
            className={styles.spotlightCard}
            onClick={() => !isPlaying && setIsPlaying(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
            }}
            aria-label="Play trainer skill test video"
          >
            {isPlaying ? (
              <>
                <button
                  type="button"
                  className={styles.spotlightCloseBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                  }}
                  aria-label="Close video"
                >
                  Close
                </button>
                <iframe
                  className={styles.spotlightIframe}
                  src={`https://www.youtube-nocookie.com/embed/${TRAINER_VIDEO_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                  title="Is your data knowledge enough for a job? - Miss Shagun NIDADS"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </>
            ) : (
              <>
                <img
                  className={styles.spotlightThumb}
                  src={`https://i.ytimg.com/vi/${TRAINER_VIDEO_ID}/hqdefault.jpg`}
                  alt="Miss Shagun - Data Knowledge Test"
                  loading="lazy"
                />
                <div className={styles.spotlightOverlay} />
                <div className={styles.spotlightPlayPill}>
                  <span>PLAY VIDEO</span>
                </div>
                <div className={styles.spotlightCardLabel}>
                  <span>Click to Play Demo</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
