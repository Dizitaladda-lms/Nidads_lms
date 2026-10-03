import styles from "./aboutSection1.module.css";

const philosophyImg = "/whyChooseUs/growth partners.webp";

export default function AboutSection1() {
  return (
    <section className={styles.wrapper} aria-labelledby="about-hero-title">
      <div className={styles.topGrid}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>National Institute of Data Analytics and Data Science</p>
          <h1 id="about-hero-title" className={styles.heading}>ABOUT<br />NIDADS</h1>
          <div className={styles.leftDesc}>
            <div className={styles.detail}>
              Build the skills that move the future forward.
            </div>
            <div className={styles.subdesc}>
              NIDADS is a career-focused data science institute in New Delhi,
              <br /> helping learners turn curiosity into practical expertise in
              <br /> Data Analytics, Data Science, AI, and Machine Learning.
            </div>
          </div>
        </div>
        <div className={styles.middle}>
        
        </div>
        <div className={styles.right}>
          <img src={philosophyImg} alt="Our Philosophy" className={styles.philosophyImg} width={420} height={288} />
          <div className={styles.philosophyTextBlock}>
            <div className={styles.philosophyTitle}>Our Mission</div>
            <div className={styles.philosophyText}>
              At NIDADS, we believe in practical, career-driven education.<br />
              Our goal is to transform learners into job-ready data professionals<br />
              through hands-on projects, industry tools, and expert guidance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
