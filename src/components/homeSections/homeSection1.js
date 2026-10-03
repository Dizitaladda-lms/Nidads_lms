'use client';
import BrainCanvas from "../BrainCanvas";
import Style from "./homeSection.module.css";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import PopupButton from "@/components/PopupButton";

const Silk = dynamic(
  () => import('../Silk'),
  { ssr: false }
);

export default function Banner() {
  return (
    <section className={Style.BannerContainer}>

      {/* SILK BACKGROUND */}
      <div className={Style.ditherBg}>
        <Silk
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#271E37"
          hoverColor="#222222"
        />
      </div>

      {/* CONTENT WRAPPER */}
      <div className={Style.contentWrapper}>
        <div className={Style.rightContent}>
          <h1 className={Style.heading}>Master <span style={{color:"hsla(202, 100%, 61%, 1.00)"}}>Data Science</span><span style={{color:"#ffffff"}}> &</span>  <span style={{color:"#38b6ff"}}>Data Analytics</span> <span style={{color:"#ffffff"}}>with</span> <span style={{color:"#38b6ff"}}>AI</span></h1>
          
          <p className={Style.description}>
            Delhi&apos;s best <strong>Data Science and Data Analytics course with placement</strong> — covering Python for Data Science, Business Analytics, Big Data, SQL, Power BI, and AI through live industry projects. Online &amp; offline batches available for beginners and working professionals.
          </p>
<div className={Style.spanButton}>
     <span className={Style.mode}>Online</span>
            <span className={Style.mode}>Offline</span>
</div>
          <div className={Style.courseActions}>
            <Link href="/course#course-programs" className={Style.exploreBtn}>
              Explore Our Courses
            </Link>
            <PopupButton className={Style.careerBtn}>
              Talk to a Career Expert
            </PopupButton>
          </div>

          {/* SOCIAL PROOF */}
          <div className={Style.socialProof}>
            {/* Enrolled Students */}
            <div className={Style.statBlock}>
              <div className={Style.avatarGroup}>
                <Image src={encodeURI("/studentImages/Abhishek Rawat .png")} alt="Student 1" className={Style.avatar} width={40} height={40} priority sizes="40px" />
                <Image src={encodeURI("/studentImages/Pallavi Yadav .webp")} alt="Student 2" className={Style.avatar} width={40} height={40} priority sizes="40px" />
                <Image src={encodeURI("/studentImages/Priya Data .webp")} alt="Student 3" className={Style.avatar} width={40} height={40} priority sizes="40px" />
              </div>
              <span className={Style.statText}>25,000+ enrolled</span>
            </div>

            {/* Google Reviews */}
            <div className={Style.statBlock}>
              <Image src="/google (1).svg" alt="Google" className={Style.googleLogo} width={20} height={20} priority />
              <div className={Style.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={Style.star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className={Style.statText}>4.9/5 (12,872 ratings)</span>
            </div>
          </div>

          {/* KEY STATISTICS SECTION */}
<div className={Style.keyStatsSection}>
  <div className={`${Style.statCard} ${Style.statCard1}`}>
    <div className={Style.statIcon}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/>
        <path d="M12 7V12L15.5 14.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <div className={Style.statText}>
      <span className={Style.statLabel}>Students Trained</span>
      <span className={Style.statValue}>15,000+</span>
    </div>
  </div>

  <div className={`${Style.statCard} ${Style.statCard2}`}>
    <div className={Style.statIcon}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#fff"/>
      </svg>
    </div>
    <div className={Style.statText}>
      <span className={Style.statLabel}>Success Rate</span>
      <span className={Style.statValue}>98%</span>
    </div>
  </div>

  <div className={`${Style.statCard} ${Style.statCard3}`}>
    <div className={Style.statIcon}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className={Style.statText}>
      <span className={Style.statLabel}>Years Experience</span>
      <span className={Style.statValue}>15+</span>
    </div>
  </div>
</div>
  </div>
    </div>
    </main>
  );
}
