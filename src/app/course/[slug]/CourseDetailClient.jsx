"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const PopupEnquiryForm = dynamic(() => import("@/components/PopupEnquiryForm.jsx"), { ssr: false });
import Link from "next/link";
import { courses } from "@/data/courses";
import styles from "./courseDetail.module.css";
import ExpertMentors from "../../../components/homeSections/ExpertMentors";
import WhyLearnWithNidads from "../../../components/homeSections/WhyLearnWithNidads";
import ProjectComparison from "../../../components/homeSections/ProjectComparison";
import ProjectShowcase from "../../../components/homeSections/ProjectShowcase";
import Hero from "../../../components/homeSections/Hero9";
import Formend from "../../../components/homeSections/formend";
import Hero8 from "../../../components/homeSections/Hero8";
import Gallery from "../../../components/homeSections/gallerySection";

export default function CourseDetailClient({ course }) {
  const [expandedModule, setExpandedModule] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>Course not found</h1>
        <Link href="/course">Back to courses</Link>
      </div>
    );
  }

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  // Recommended: all other courses except the current one
  const recommended = courses.filter((c) => c.id !== course.id).slice(0, 4);

  return (
    <>
      {/* MAIN 2-column page */}
      <main className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT COLUMN */}
          <div className={styles.leftColumn}>
            {/* HERO CARD */}
            <section className={styles.heroSection}>
              <div className={styles.heroCard}>
                <div className={styles.heroImageWrap}>
                  {course.level === "certificate" && (
                    <span className={styles.bestsellerBadge}>Bestseller</span>
                  )}
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.heroImage}
                  />
                </div>

                <div className={styles.heroBody}>
                  <h1 className={styles.heroTitle}>{course.title}</h1>
                  <p className={styles.heroSubtitle}>{course.description}</p>

                  <div className={styles.heroMetaRow}>
                    <div className={styles.heroMetaItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span>{course.duration}</span>
                    </div>

                    <div className={styles.heroMetaItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="currentColor" />
                      </svg>
                      <span>{course.rating} ({course.students.toLocaleString()})</span>
                    </div>

                    <div className={styles.heroMetaItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>{course.instructor?.name || "Shagun"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WHAT YOU'LL LEARN */}
            <section className={styles.section}>
              <div className={styles.sectionBox}>
                <h2 className={styles.sectionTitle}>{"What you'll learn"}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                  {course.whatYouWillLearn?.map((item, index) => (
                    <div key={index} style={{ background: "rgba(6,26,43,0.7)", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "flex-start", gap: "14px", boxShadow: "0 2px 8px rgba(30,41,59,0.08)" }}>
                      <span style={{ color: "#4ade80", fontSize: "22px", marginTop: "2px" }}>✔️</span>
                      <span style={{ color: "#c7ddff", fontSize: "15px", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* MODULES */}
            <section className={styles.section}>
              <div className={styles.sectionBox}>
                <div className={styles.modulesHeader}>
                  <h2 className={styles.sectionTitle}>Modules by Month</h2>
                  <span className={styles.moduleCount}>{course.curriculum?.length || 12} modules</span>
                </div>

                {course.curriculum && course.curriculum.length > 0 && (
                  <ul className={styles.moduleSummaryList}>
                    {course.curriculum.map((module, idx) => (
                      <li key={idx} className={styles.moduleSummaryChip}>
                        Module {idx + 1}: {module.section}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.modulesList}>
                  {course.curriculum?.map((module, index) => (
                    <div key={index} className={styles.moduleItem}>
                      <button className={styles.moduleHeader} onClick={() => toggleModule(index)}>
                        <div className={styles.moduleInfo}>
                          <h3 className={styles.moduleTitle}>Module {index + 1}: {module.section}</h3>
                          <p className={styles.moduleSubtitle}>Month {index + 1} • {module.lectures?.length || 0} milestones</p>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`${styles.moduleIcon} ${expandedModule === index ? styles.moduleIconOpen : ""}`}>
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {expandedModule === index && module.lectures && (
                        <div className={styles.moduleContent}>
                          {module.lectures.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className={styles.lectureItem}>
                              <div className={styles.lectureIcon}>📄</div>
                              <div className={styles.lectureInfo}>
                                <h4 className={styles.lectureTitle}>{lecture.title}</h4>
                                <p className={styles.lectureDuration}>{lecture.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – FULL CARD */}
          <aside className={styles.courseCard}>
            <img src={course.image} alt={course.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <div className={styles.cardMetaItem}>
                  <span className={styles.metaLabel}>Duration</span>
                  <span className={styles.metaValue}>{course.duration}</span>
                </div>
                <div className={styles.cardMetaItem}>
                  <span className={styles.metaLabel}>Rating</span>
                  <span className={styles.metaValue}>
                    <span className={styles.starIcon}>★</span> {course.rating} ({course.students.toLocaleString()})
                  </span>
                </div>
              </div>
              <button className={styles.enrollButton} onClick={() => setShowEnquiry(true)}>Enroll Now</button>
              {showEnquiry && (
                <PopupEnquiryForm
                  open={showEnquiry}
                  onClose={() => setShowEnquiry(false)}
                  selectedCourseId={course.id}
                  lockCourse={true}
                />
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* FULL-WIDTH SECTIONS */}
      <section className={styles.fullWidthSection}>
        <div className={styles.fullWidthInner}>
          <h3 className={styles.recommendedSectionTitle}>Recommended courses</h3>
          <p className={styles.recommendedSubtitle}>Continue your path with related programs tailored for you.</p>
          <div className={styles.recommendedGrid}>
            {recommended.map((c) => (
              <Link key={c.id} href={`/course/${c.slug}`} className={styles.recoCard} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles.recoImageWrap}>
                  <img src={c.image} alt={c.title} className={styles.recoImage} />
                  {c.level === "certificate" && <span className={styles.recoBadge}>BESTSELLER</span>}
                </div>
                <div className={styles.recoBody}>
                  <h4 className={styles.recoTitle}>{c.title}</h4>
                  <p className={styles.recoProvider}>NIDADS Academy</p>
                  <div className={styles.recoMetaRow}>
                    <span>⭐ {c.rating}</span>
                    <span>•</span>
                    <span>{c.students} learners</span>
                  </div>
                  <div className={styles.recoMetaRow}>
                    <span className={styles.recoDurationChip}>{c.duration}</span>
                  </div>
                  <button className={styles.recoViewBtn} style={{ width: "100%", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 600, fontSize: 15, cursor: "pointer", letterSpacing: "0.5px" }} tabIndex={0} aria-label={`View details for ${c.title}`}>
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <ExpertMentors />
        <WhyLearnWithNidads />
        <ProjectComparison />
        <ProjectShowcase />
        <Gallery />
        <Hero />
        <Formend />
        <Hero8 />
      </section>
    </>
  );
}
