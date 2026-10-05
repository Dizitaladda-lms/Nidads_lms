"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./newsection.module.css";

const successStories = [
  {
    id: 1,
    name: "Abhishek Rawat",
    role: "Data Engineer",
    location: "Bangalore",
    company: "TechNova Analytics",
    image: encodeURI("/studentImages/Abhishek Rawat .png"),
    quote:
      "NIDADS' project-based approach and mock interviews helped me switch careers confidently. I'm now working as a Data Engineer."
  },
  {
    id: 2,
    name: "Mohit Kumar",
    role: "Data Analyst",
    location: "Pune",
    company: "DeepVision Labs",
    image: encodeURI("/studentImages/Mohit Kumar- .webp"),
    quote:
      "Hands-on projects and mentorship helped me build a strong portfolio. I cracked interviews faster than expected."
  },
  {
    id: 3,
    name: "Pallavi Yadav",
    role: "ML Engineer",
    location: "Gurgaon",
    company: "FinAI Solutions",
    image: encodeURI("/studentImages/Pallavi Yadav .webp"),
    quote:
      "The structured roadmap and placement guidance made all the difference. This felt like real industry training."
  },
  {
    id: 4,
    name: "Priya",
    role: "Business Analyst",
    location: "Noida",
    company: "Insight Grid",
    image: encodeURI("/studentImages/Priya Data .webp"),
    quote:
      "From SQL practice to interview drills, every step was aligned to the job I wanted. The transition felt realistic and fast."
  },
  {
    id: 5,
    name: "Shubham Negi",
    role: "Data Analyst Intern",
    location: "New Delhi",
    company: "DizitalAdda ",
    image: encodeURI("/studentImages/Shubham Negi .webp"),
    quote:
      "The placement cell kept me accountable, and the live projects gave me proof of work that recruiters immediately understood."
  },
  {
    id: 6,
    name: "Divyanshu Mishra",
    role: "Analytics Intern",
    location: "Delhi NCR",
    company: "DizitalAdda ",
    image: encodeURI("/studentImages/Divyanshu Mishra  .png"),
    quote:
      "I came in with theory and left with execution skills. That shift is what helped me convert interviews into offers."
  }
];

export default function NewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % successStories.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentStory = successStories[currentIndex];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          <span className={styles.badge}>PLACEMENT SUCCESS</span>

          <h2 className={styles.heading}>
            Delhi&apos;s Best{" "}
            <span style={{color:"#38b6ff"}}>Data Science &amp; Data Analytics Course with Placement</span>
          </h2>

          <p className={styles.subtext}>
            Our Data Science and Data Analytics courses are built around one goal: your first offer.
            Live industry projects, mock interviews, and a dedicated placement cell help
            you go from learning to hired — whether you&apos;re a beginner or a working professional.
          </p>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>96%</h3>
              <p>Placement Rate</p>
              <span>Within 6 Months</span>
            </div>

            <div className={styles.statCard}>
              <h3>₹22 LPA</h3>
              <p>Highest Package</p>
              <span>International Role</span>
            </div>

            <div className={styles.statCard}>
              <h3>₹9.5 LPA</h3>
              <p>Average Package</p>
              <span>Recent Batches</span>
            </div>
          </div>

          <ul className={styles.points}>
            <li>1:1 mock interviews for Data Science &amp; Analytics roles</li>
            <li>Resume &amp; portfolio reviews for Data Analyst and Data Scientist positions</li>
            <li>Interview prep covering Python, SQL, Machine Learning, Big Data &amp; case studies</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <h3 className={styles.rightTitle}>Student Success Stories</h3>
          <p className={styles.rightSubtitle}>
            Real offers. Real companies. Real career shifts.
          </p>

          <div className={styles.testimonials}>
            <article key={currentStory.id} className={styles.card}>
              <div className={styles.imageFrame}>
                <Image
                  src={currentStory.image}
                  alt={`${currentStory.name} success story portrait`}
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                  className={styles.studentImage}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.profile}>
                  <h4>{currentStory.name}</h4>
                  <span>
                    {currentStory.role} · {currentStory.location}
                  </span>
                  <small>{currentStory.company}</small>
                </div>

                <p>&ldquo;{currentStory.quote}&rdquo;</p>
              </div>
            </article>

            <div className={styles.indicators}>
              {successStories.map((story, index) => (
                <button
                  key={story.id}
                  type="button"
                  className={`${styles.indicator} ${
                    index === currentIndex ? styles.indicatorActive : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show success story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
