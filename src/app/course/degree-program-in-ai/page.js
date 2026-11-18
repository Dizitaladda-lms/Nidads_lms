"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./degreeProgram.module.css";

const PopupEnquiryForm = dynamic(
  () => import("@/components/PopupEnquiryForm.jsx"),
  { ssr: false }
);

// ── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "3 Years", label: "Duration" },
  { value: "6", label: "Semesters" },
  { value: "94%", label: "Placement Rate" },
  { value: "1,200+", label: "Students" },
];

const WHY_REASONS = [
  {
    title: "UGC-Approved Degree",
    desc: "Graduate with a government-recognized degree accepted by employers, higher-education institutions, and government sectors across India.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: "Dual Institution Choice",
    desc: "Select DU SOL (government university) or Amity University Online (private, NAAC A+). Both offer a full degree backed by NIDADS AI specialization.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "300+ Hours of AI Training",
    desc: "Beyond your degree syllabus receive exclusive NIDADS training in Python, ML, Deep Learning, Computer Vision, NLP, and cloud AI deployment.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Industry Expert Faculty",
    desc: "Learn From AI engineers and data scientists who are actively working at top companies like Google, Microsoft, and leading Indian tech startups.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Guaranteed Placement Support",
    desc: "Dedicated placement cell with 500+ hiring partners, resume reviews, mock interviews, and direct referrals to AI and ML roles at top companies.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    title: "Vibrant Campus Life",
    desc: "Weekly day trips, annual out-of-station business expeditions, social impact projects, and active student clubs make this a complete college experience.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const DUSOL_FEATURES = [
  "Bachelor of Science — Computer Science (AI Specialization)",
  "UGC recognized | backed by University of Delhi legacy",
  "NIDADS AI curriculum layered on top of degree syllabus",
  "Flexible weekend batches for working professionals",
  "Government fee structure — more affordable tuition",
  "Dual certificate: DU SOL Degree + NIDADS AI Certification",
];

const AMITY_FEATURES = [
  "BCA with AI & Data Science Specialization",
  "NAAC A+ accredited | industry-aligned modern curriculum",
  "Live online classes with dedicated LMS access",
  "Stronger elective credits in AI, Cloud, and DevOps",
  "Global alumni network across 22 countries",
  "Dual certificate: Amity Degree + NIDADS AI Certification",
];

const SEMESTERS = [
  {
    num: "Semester 1 — Year 1",
    title: "Foundations of AI & Computing",
    subjects: [
      "Python Programming Foundations",
      "Mathematics for AI (Linear Algebra, Calculus, Probability)",
      "Fundamentals of Computer Science",
      "English Communication & Professional Development",
      "NIDADS AI Lab: Introduction to Data & AI Tools",
    ],
  },
  {
    num: "Semester 2 — Year 1",
    title: "Data Structures, Statistics & Databases",
    subjects: [
      "Data Structures & Algorithms",
      "Statistics & Probability for Machine Learning",
      "Database Management Systems (SQL + NoSQL)",
      "Operating Systems & Cloud Fundamentals",
      "NIDADS AI Lab: SQL & Exploratory Data Analysis Projects",
    ],
  },
  {
    num: "Semester 3 — Year 2",
    title: "Machine Learning & Web Technologies",
    subjects: [
      "Machine Learning Foundations (Supervised & Unsupervised)",
      "Data Preprocessing & Feature Engineering",
      "Web Technologies & REST API Development",
      "Research Methods & Technical Writing",
      "NIDADS AI Lab: End-to-End ML Pipeline Projects",
    ],
  },
  {
    num: "Semester 4 — Year 2",
    title: "Deep Learning, Vision & NLP",
    subjects: [
      "Deep Learning & Neural Network Architectures",
      "Computer Vision & Image Processing",
      "Natural Language Processing (NLP)",
      "Big Data Technologies (Spark, Hadoop)",
      "NIDADS AI Lab: Deep Learning Capstone",
    ],
  },
  {
    num: "Semester 5 — Year 3",
    title: "Advanced AI & Cloud Deployment",
    subjects: [
      "Advanced AI Systems & Model Architectures",
      "MLOps & Model Deployment (Docker, CI/CD)",
      "Cloud AI Platforms — AWS / GCP / Azure",
      "AI Ethics, Policy & Responsible AI",
      "NIDADS AI Lab: Production-Grade AI Project",
    ],
  },
  {
    num: "Semester 6 — Year 3",
    title: "Capstone, Internship & Career Launch",
    subjects: [
      "AI Product Capstone Development (Team Project)",
      "Industry Internship (8-week minimum)",
      "Entrepreneurship & AI Startup Fundamentals",
      "Interview Preparation & Career Strategy",
      "NIDADS Final Portfolio Review & Placement Drive",
    ],
  },
];

const CAMPUS_LIFE = [
  {
    title: "Weekly Learning Trips",
    desc: "Every weekend the batch explores Delhi NCR's tech ecosystem — startup offices, innovation labs, government AI research centers, and major tech parks. Real exposure beyond the classroom.",
    tags: ["Startup Visits", "Tech Parks", "Innovation Labs", "Delhi NCR"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: "Annual Business Expedition",
    desc: "Every year the entire batch takes a 4–5 day immersive trip to Bangalore, Hyderabad, or Mumbai — visiting top AI companies, attending industry conferences, and building a professional network.",
    tags: ["Bangalore", "Hyderabad", "Company Visits", "Conferences", "Networking"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "Social Impact Projects",
    desc: "Each semester the cohort runs AI-for-Good initiatives — digital literacy workshops in underserved schools, AI tools built for NGOs, senior-citizen tech onboarding, and community data projects.",
    tags: ["Community Service", "NGO Partnerships", "AI for Good", "Social Work"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Student Clubs & Activities",
    desc: "Six active clubs keep campus life thriving: AI Innovation Club (hackathons & research), Photography & Media, Debate & Public Speaking, Sports & Wellness, Entrepreneurship Club, and Music & Arts.",
    tags: ["AI Hackathons", "Photography", "Debate", "Sports", "Entrepreneurship"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const GALLERY = [
  { img: "/center/6.webp", label: "Breakout zone" },
  { img: "/center/7.webp", label: "Mentor pod" },
  { img: "/center/IMG_4066.webp", label: "Design studio" },
  { img: "/center/IMG_4067.webp", label: "Learning bays" },
  { img: "/center/IMG_4068.webp", label: "Workshop zone" },
  { img: "/center/IMG_4071.webp", label: "Collaboration space" },
];

const TESTIMONIALS = [
  {
    text: "The dual-degree approach gave me the credibility of a DU degree and the practical AI skills that impressed every interviewer. I was placed at Microsoft India before graduation.",
    name: "Arjun Sharma",
    role: "Software Engineer, Microsoft India",
    program: "B.Sc. AI via DU SOL, Batch 2024",
    initials: "AS",
  },
  {
    text: "The annual Bangalore trip changed everything for me. Visiting AI labs at top companies gave me clarity on my career path. NIDADS does not just teach — it connects you.",
    name: "Priya Gupta",
    role: "Data Scientist, Razorpay",
    program: "BCA AI via Amity Online, Batch 2024",
    initials: "PG",
  },
  {
    text: "Our AI Innovation Club hackathon project became my entire interview portfolio. Three companies hired from that project alone. The club experience was as valuable as the curriculum.",
    name: "Rohit Verma",
    role: "ML Engineer, Samsung R&D",
    program: "B.Sc. AI via DU SOL, Batch 2023",
    initials: "RV",
  },
  {
    text: "Weekly trips and social work taught me how to apply AI in the real world before I even finished my degree. I now lead the CSR AI team at my company.",
    name: "Ananya Singh",
    role: "AI Project Lead, Infosys",
    program: "BCA AI via Amity Online, Batch 2023",
    initials: "AS",
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

function ArrowRightIcon({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function DegreeProgramPage() {
  const [activeSem, setActiveSem] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <main className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          {/* LEFT — headline + CTAs */}
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              Degree Program &bull; 3 Years
            </div>

            <h1 className={styles.heroTitle}>
              Degree Program in<br />
              <span>Artificial Intelligence</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Earn a UGC-approved university degree while mastering cutting-edge AI skills. Choose from DU SOL or Amity University Online — backed by 300+ hours of NIDADS AI specialization.
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
            <h2 className={styles.sectionTitle}>Why Degree with <span>NIDADS</span>?</h2>
            <p className={styles.sectionDesc}>
              We combine the credibility of a recognised university degree with India&apos;s most focused AI specialization program.
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
            <span className={styles.eyebrow}>Degree Options</span>
            <h2 className={styles.sectionTitle}>Choose Your <span>Institution</span></h2>
            <p className={styles.sectionDesc}>
              Two pathways — one government university, one private. Both include the full NIDADS AI specialization. You choose what fits your goals.
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
                B.Sc. Computer Science (AI Specialization)
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
                Enquire — DU SOL Pathway
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
              <p className={styles.instDesc}>NAAC A+ Accredited &nbsp;|&nbsp; Industry-aligned modern curriculum with global alumni network</p>
              <div className={styles.instDegreeTitle}>
                <BookIcon />
                BCA with AI &amp; Data Science Specialization
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
                Enquire — Amity Pathway
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
            <h2 className={styles.sectionTitle}>3-Year <span>Curriculum</span></h2>
            <p className={styles.sectionDesc}>
              Six semesters of structured AI education — from programming fundamentals to production-grade AI systems and a real industry internship.
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
                    <ArrowRightIcon open={activeSem === i} />
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
            <span className={styles.eyebrow}>Campus Life</span>
            <h2 className={styles.sectionTitle}>A Complete <span>College Experience</span></h2>
            <p className={styles.sectionDesc}>
              Technical learning is just one part. At NIDADS we build well-rounded professionals through exploration, community, and real-world exposure.
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
            <h2 className={styles.sectionTitle}>Built for <span>Learning & Making</span></h2>
            <p className={styles.sectionDesc}>
              Acoustic-treated studios, breakout zones for quick huddles, and dedicated bays for sprints and critiques — all under one roof.
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
            <span className={styles.eyebrow}>Student Stories</span>
            <h2 className={styles.sectionTitle}>Graduates Who <span>Transformed</span></h2>
            <p className={styles.sectionDesc}>
              Hear from students who combined a university degree with NIDADS AI training to land roles they are proud of.
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
                    <p className={styles.testimonialRole} style={{ color: "#8bbcff", fontSize: "0.76rem" }}>{t.program}</p>
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
              <div className={styles.trainerBadge}>Lead Instructor &bull; AI & Data Science</div>
              <h3 className={styles.trainerName}>Miss. Shagun</h3>
              <p className={styles.trainerTitle}>PhD in Artificial Intelligence &nbsp;|&nbsp; 15+ Years Industry Experience</p>
              <p className={styles.trainerBio}>
                A multidisciplinary AI educator and practitioner with deep expertise in machine learning, computer vision, and large language models. Shagun has trained 30,000+ learners and collaborated with top research institutions. As program director for the Degree in AI, she ensures every student graduates with skills that are immediately applicable in the industry.
              </p>
              <div className={styles.trainerTags}>
                <span className={styles.trainerTag}>Machine Learning</span>
                <span className={styles.trainerTag}>Deep Learning</span>
                <span className={styles.trainerTag}>NLP & LLMs</span>
                <span className={styles.trainerTag}>Mentorship</span>
                <span className={styles.trainerTag}>Career Coaching</span>
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
        <h2 className={styles.ctaTitle}>Ready to Start Your<br /><span style={{ color: "#38b6ff" }}>AI Degree Journey</span>?</h2>
        <p className={styles.ctaDesc}>
          Applications are open. Join the batch, choose your university pathway, and start building the career you have been planning.
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
