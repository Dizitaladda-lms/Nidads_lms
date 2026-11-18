"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./pgProgram.module.css";

const PopupEnquiryForm = dynamic(
  () => import("@/components/PopupEnquiryForm.jsx"),
  { ssr: false }
);

// ── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2 Years", label: "Duration" },
  { value: "4", label: "Semesters" },
  { value: "96%", label: "Placement Rate" },
  { value: "600+", label: "Graduates" },
];

const WHY_REASONS = [
  {
    title: "Master's Level Credential",
    desc: "Graduate with a postgraduate degree recognized across India — elevating your profile for senior roles, research positions, and global opportunities.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Two Pathways — DU SOL & Amity",
    desc: "Choose a government university route via DU SOL or a private NAAC A+ route via Amity University Online. Both come with the full NIDADS Advanced AI curriculum.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Research-Backed AI Curriculum",
    desc: "Go beyond tutorials — study Generative AI, LLMs, Reinforcement Learning, and Edge AI with a curriculum co-designed with industry researchers.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Senior Industry Mentors",
    desc: "Get paired with AI leads, research scientists, and CTOs at top firms for 1-on-1 mentorship, research guidance, and direct referrals.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Thesis or Industry Dissertation",
    desc: "Final semester is spent on an in-depth research thesis or an industry dissertation project — publishable work that sets you apart in interviews.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "PG Campus Life",
    desc: "Weekly research colloquia, annual out-of-station tech expeditions, AI-for-Good social projects, and advanced student clubs for a rich postgrad experience.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const DUSOL_FEATURES = [
  "M.Sc. Computer Science (Advanced AI Specialization)",
  "UGC recognized | backed by University of Delhi legacy",
  "PG-level AI curriculum on top of M.Sc. syllabus",
  "Research methodology and thesis writing support",
  "Government fee structure — affordable PG education",
  "Dual certificate: DU SOL PG Degree + NIDADS Advanced AI Cert",
];

const AMITY_FEATURES = [
  "MCA with Advanced AI & Machine Learning Specialization",
  "NAAC A+ accredited | research-forward modern curriculum",
  "Live online sessions + dedicated postgrad LMS",
  "Stronger elective credits in GenAI, LLMs, and Cloud AI",
  "Access to Amity's global PG alumni and research network",
  "Dual certificate: Amity MCA Degree + NIDADS Advanced AI Cert",
];

const SEMESTERS = [
  {
    num: "Semester 1 — Year 1",
    title: "Advanced Foundations & Research Methods",
    subjects: [
      "Advanced Python & Scientific Computing",
      "Statistical Modelling & Bayesian Inference",
      "Advanced Machine Learning Algorithms",
      "Research Methodology & Academic Writing",
      "NIDADS Lab: Research Paper Implementation",
    ],
  },
  {
    num: "Semester 2 — Year 1",
    title: "Deep Learning, Vision & Language",
    subjects: [
      "Advanced Deep Learning Architectures (Transformers, Attention)",
      "Computer Vision & Generative Models (GANs, Diffusion)",
      "Natural Language Processing & Large Language Models",
      "Responsible AI — Ethics, Fairness & Regulation",
      "NIDADS Lab: Specialization Domain Deep Dive Project",
    ],
  },
  {
    num: "Semester 3 — Year 2",
    title: "Generative AI, Reinforcement Learning & Edge AI",
    subjects: [
      "Generative AI & Prompt Engineering for Production",
      "Reinforcement Learning & Autonomous Systems",
      "Edge AI, TinyML & Deployment Optimization",
      "AI for Domain (Healthcare / Finance / Legal — Elective)",
      "NIDADS Lab: Advanced Industry-Grade AI System",
    ],
  },
  {
    num: "Semester 4 — Year 2",
    title: "Research Thesis / Dissertation & Career Launch",
    subjects: [
      "Research Thesis or Industry Dissertation (Major Project)",
      "AI Entrepreneurship & Startup Strategy",
      "Leadership & Communication for AI Professionals",
      "Senior Placement Drive & Mock Interviews",
      "NIDADS Final Mentorship & Portfolio Showcase",
    ],
  },
];

const CAMPUS_LIFE = [
  {
    title: "Weekly Research Excursions",
    desc: "Each week the cohort visits research institutions, AI labs, and innovation centers across Delhi NCR — IIT Delhi AI lab, NASSCOM AI hubs, and early-stage AI startups.",
    tags: ["IIT Delhi", "NASSCOM Hub", "AI Labs", "Research Institutes"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: "Annual AI Industry Expedition",
    desc: "Every year the PG batch takes a 5-day immersive trip — attending NeurIPS or ICLR India sessions, visiting Google DeepMind, Flipkart AI, or NVIDIA's India offices, and building a lifelong professional network.",
    tags: ["Bangalore", "Hyderabad", "NVIDIA", "Google AI", "Conferences"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "AI for Social Good Projects",
    desc: "Each cohort leads a semester-long AI-for-Good project — building predictive tools for public health, NLP tools for underserved languages, or AI dashboards for government welfare schemes.",
    tags: ["Public Health", "Regional Languages", "Policy AI", "Social Work"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "PG Clubs & Colloquia",
    desc: "Advanced research reading groups, a Generative AI club, an AI Entrepreneurship Cell, weekly colloquia where students present papers, and a Speaker Series bringing industry leaders to campus.",
    tags: ["Research Groups", "GenAI Club", "Speaker Series", "Entrepreneurship Cell"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const GALLERY = [
  { img: "/center/IMG_4072.webp", label: "Mentor pod" },
  { img: "/center/IMG_4076.webp", label: "Library nook" },
  { img: "/center/IMG_4077.webp", label: "Studio hall" },
  { img: "/center/IMG_4066.webp", label: "Design studio" },
  { img: "/center/IMG_4067.webp", label: "Learning bays" },
  { img: "/center/IMG_4068.webp", label: "Workshop zone" },
];

const TESTIMONIALS = [
  {
    text: "Coming with 3 years of work experience, the PG program was the accelerator I needed. My research thesis on multimodal AI became the foundation of my startup. NIDADS gave me the depth, not just the breadth.",
    name: "Vikram Nair",
    role: "Co-founder, NeuroStack AI",
    program: "M.Sc. AI via DU SOL, Batch 2024",
    initials: "VN",
  },
  {
    text: "The annual trip to Bangalore's AI ecosystem, specifically the visit to a GenAI startup, led to a direct interview call. I joined them two months before graduating. The network NIDADS builds is unmatched.",
    name: "Sneha Rao",
    role: "AI Research Engineer, Sarvam AI",
    program: "MCA AI via Amity, Batch 2024",
    initials: "SR",
  },
  {
    text: "The research colloquium and speaker series brought world-class AI researchers to our classroom every week. My final dissertation was co-supervised by an IIT professor I met through NIDADS.",
    name: "Karan Mehta",
    role: "ML Research Scientist, Adobe India",
    program: "M.Sc. AI via DU SOL, Batch 2023",
    initials: "KM",
  },
  {
    text: "Social impact projects challenged me to think beyond benchmarks. I built an NLP system for a regional dialect with almost no digital data. That project won a national AI-for-Good award.",
    name: "Divya Krishnan",
    role: "Senior Data Scientist, HDFC Bank AI",
    program: "MCA AI via Amity, Batch 2023",
    initials: "DK",
  },
];

// ── ICON HELPERS ──────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function PGProgramPage() {
  const [activeSem, setActiveSem] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <main className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          {/* LEFT */}
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Post Graduation Program &bull; 2 Years
            </div>

            <h1 className={styles.heroTitle}>
              Post Graduation Program in<br />
              <span>Artificial Intelligence</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Advance from practitioner to expert. A 2-year postgraduate program combining a UGC-approved master&apos;s degree with NIDADS&apos; advanced AI curriculum — built for professionals and ambitious graduates.
            </p>

            <div className={styles.institutionBadges}>
              <div className={styles.institutionBadge}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                DU SOL — University of Delhi
              </div>
              <div className={styles.institutionBadge}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Amity University Online (NAAC A+)
              </div>
            </div>

            <div className={styles.heroActions}>
              <button className={styles.primaryBtn} onClick={() => setShowEnquiry(true)}>
                Apply Now
              </button>
              <Link href="/contact-us" className={styles.secondaryBtn}>
                Talk to an Advisor
              </Link>
            </div>
          </div>

          {/* RIGHT — floating stats panel */}
          <div className={styles.heroRight}>
            <div className={styles.heroPanel}>
              <div className={styles.heroPanelHeader}>
                <div className={styles.heroPanelDot} />
                <span className={styles.heroPanelHeaderText}>Program Overview</span>
              </div>
              <div className={styles.heroPanelStats}>
                {STATS.map((s) => (
                  <div className={styles.heroPanelStat} key={s.label}>
                    <span className={styles.heroStatValue}>{s.value}</span>
                    <span className={styles.heroStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.heroPanelFooter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Admissions Open — Limited seats
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY DEGREE WITH US ── */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Why PG with <span>NIDADS</span>?</h2>
            <p className={styles.sectionDesc}>
              A master&apos;s degree alone gets you in the room. Our advanced AI specialization gets you the offer.
            </p>
          </div>
          <div className={styles.whyGrid}>
            {WHY_REASONS.map((r, i) => (
              <div className={styles.whyCard} key={i} data-index={String(i + 1).padStart(2, "0")}>
                <div className={styles.whyIcon}>{r.icon}</div>
                <h3 className={styles.whyCardTitle}>{r.title}</h3>
                <p className={styles.whyCardDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT DEGREE WE PROVIDE ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>PG Degree Options</span>
            <h2 className={styles.sectionTitle}>Choose Your <span>Institution</span></h2>
            <p className={styles.sectionDesc}>
              Two postgraduate pathways — both UGC-approved, both paired with NIDADS&apos; advanced AI curriculum.
            </p>
          </div>

          <div className={styles.institutionsGrid}>
            {/* DU SOL */}
            <div className={styles.institutionCard}>
              <div className={styles.instCardBand} />
              <div className={styles.instCardBody}>
              <div className={styles.instTagRow}>
                <span className={styles.instTag}>Government University</span>
                <span className={styles.instTag}>UGC Approved</span>
              </div>
              <h3 className={styles.instName}>DU SOL</h3>
              <p className={styles.instDesc}>University of Delhi — School of Open Learning &nbsp;|&nbsp; 100+ year legacy, trusted nationwide</p>
              <div className={styles.instDegreeTitle}>
                <BookIcon />
                M.Sc. Computer Science (Advanced AI Specialization)
              </div>
              <ul className={styles.instFeatures}>
                {DUSOL_FEATURES.map((f, i) => (
                  <li className={styles.instFeature} key={i}>
                    <span className={styles.instFeatureIcon}><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={styles.instCta} onClick={() => setShowEnquiry(true)}>
                Enquire — DU SOL PG Pathway
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              </div>
            </div>

            {/* Amity */}
            <div className={`${styles.institutionCard} ${styles.featuredCard}`}>
              <div className={styles.instCardBand} />
              <div className={styles.instCardBody}>
              <div className={styles.instTagRow}>
                <span className={styles.instTag}>Private University</span>
                <span className={`${styles.instTag} ${styles.tagHighlight}`}>NAAC A+</span>
              </div>
              <h3 className={styles.instName}>Amity University Online</h3>
              <p className={styles.instDesc}>NAAC A+ Accredited &nbsp;|&nbsp; Research-forward PG curriculum with global alumni network</p>
              <div className={styles.instDegreeTitle}>
                <BookIcon />
                MCA with Advanced AI &amp; ML Specialization
              </div>
              <ul className={styles.instFeatures}>
                {AMITY_FEATURES.map((f, i) => (
                  <li className={styles.instFeature} key={i}>
                    <span className={styles.instFeatureIcon}><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={styles.instCta} onClick={() => setShowEnquiry(true)}>
                Enquire — Amity PG Pathway
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>Semester Plan</span>
            <h2 className={styles.sectionTitle}>2-Year <span>PG Curriculum</span></h2>
            <p className={styles.sectionDesc}>
              Four intensive semesters — from advanced research methods to Generative AI systems and a publishable thesis or industry dissertation.
            </p>
          </div>

          <div className={styles.curriculumWrap}>
            {SEMESTERS.map((sem, i) => (
              <div
                key={i}
                className={`${styles.semesterItem} ${activeSem === i ? styles.semesterItemActive : ""}`}
              >
                <button
                  className={styles.semesterHeader}
                  onClick={() => setActiveSem(activeSem === i ? null : i)}
                  aria-expanded={activeSem === i}
                >
                  <div className={styles.semesterMeta}>
                    <span className={styles.semesterNum}>{sem.num}</span>
                    <span className={styles.semesterTitle}>{sem.title}</span>
                  </div>
                  <span className={styles.semesterArrow}>
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: activeSem === i ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>
                {activeSem === i && (
                  <div className={styles.semesterContent}>
                    <ul className={styles.subjectList}>
                      {sem.subjects.map((sub, j) => (
                        <li className={styles.subjectItem} key={j}>
                          <span className={styles.subjectIcon}><CheckIcon /></span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS LIFE ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>PG Campus Life</span>
            <h2 className={styles.sectionTitle}>Beyond the <span>Classroom</span></h2>
            <p className={styles.sectionDesc}>
              A postgrad experience that combines rigorous academics with real-world exposure, professional networking, and meaningful community work.
            </p>
          </div>
          <div className={styles.campusGrid}>
            {CAMPUS_LIFE.map((item, i) => (
              <div className={styles.campusCard} key={i}>
                <div className={styles.campusIcon}>{item.icon}</div>
                <h3 className={styles.campusCardTitle}>{item.title}</h3>
                <p className={styles.campusCardDesc}>{item.desc}</p>
                <div className={styles.campusTags}>
                  {item.tags.map((t) => (
                    <span className={styles.campusTag} key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>Our Campus</span>
            <h2 className={styles.sectionTitle}>Designed for <span>Research & Collaboration</span></h2>
            <p className={styles.sectionDesc}>
              Dedicated research pods, seminar rooms, collaborative breakout zones, and a curated library — all built for postgraduate-level work.
            </p>
          </div>
          <div className={styles.galleryGrid}>
            {GALLERY.map((item, i) => (
              <div className={styles.galleryItem} key={i}>
                <img src={item.img} alt={item.label} />
                <span className={styles.galleryLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>Alumni Stories</span>
            <h2 className={styles.sectionTitle}>What Our PG <span>Alumni Say</span></h2>
            <p className={styles.sectionDesc}>
              Research scientists, startup founders, and senior practitioners — hear from those who made the leap with NIDADS.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div className={styles.testimonialCard} key={i}>
                <svg className={styles.quoteIcon} width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialFooter}>
                  <div className={styles.testimonialAvatar}>{t.initials}</div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                    <p className={styles.testimonialRole} style={{ color: "#c4b5fd", fontSize: "0.76rem" }}>{t.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINER ── */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionCenter}>
            <span className={styles.eyebrow}>Faculty</span>
            <h2 className={styles.sectionTitle}>Meet Your <span>Lead Trainer</span></h2>
          </div>
          <div className={styles.trainerCard}>
            <div>
              <div className={styles.trainerBadge}>PG Program Director &bull; AI Research</div>
              <h3 className={styles.trainerName}>Miss. Shagun</h3>
              <p className={styles.trainerTitle}>PhD in Artificial Intelligence &nbsp;|&nbsp; AI Researcher &amp; Educator</p>
              <p className={styles.trainerBio}>
                Doctoral researcher in AI with 15+ years of combined industry and academic experience. Shagun has published research in areas of computer vision and NLP, collaborated with IIT and ISB faculty, and designed postgraduate AI curricula that bridge the gap between academic rigor and enterprise application. As PG Program Director at NIDADS she ensures every student graduates capable of conducting independent research or leading AI teams.
              </p>
              <div className={styles.trainerTags}>
                <span className={styles.trainerTag}>Generative AI</span>
                <span className={styles.trainerTag}>LLM Research</span>
                <span className={styles.trainerTag}>Computer Vision</span>
                <span className={styles.trainerTag}>Research Guidance</span>
                <span className={styles.trainerTag}>Senior Placement</span>
              </div>
            </div>
            <div className={styles.trainerAvatarWrap}>
              <UserIcon />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Advance Your<br /><span style={{ color: "#a78bfa" }}>AI Career</span>?</h2>
        <p className={styles.ctaDesc}>
          PG applications are open. Join the batch, choose your university, and take the next step in your AI career.
        </p>
        <div className={styles.ctaActions}>
          <button className={styles.primaryBtn} onClick={() => setShowEnquiry(true)}>
            Apply Now — Free Counselling
          </button>
          <Link href="/contact-us" className={styles.secondaryBtn}>
            Schedule a Campus Visit
          </Link>
        </div>
      </section>

      {showEnquiry && (
        <PopupEnquiryForm
          open={showEnquiry}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </main>
  );
}
