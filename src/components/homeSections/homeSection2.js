"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./homeSection2.module.css";
import PopupButton from "@/components/PopupButton";

export default function HomeSection2() {
  return (
    <section className={styles.container}>
      <div className={styles.leftImagePlaceholder}>
        <Image
          src="/teem photos.webp"
          alt="NIDADS team and students"
          className={styles.leftImage}
          width={480}
          height={480}
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          quality={80}
        />
      </div>

      <div className={styles.rightContent}>
        <h2 className={styles.heading}>
          <span style={{ color: "white" }}>Empowering</span>
          <br />
          <span style={{ color: "#38b6ff" }}>Data Science</span> Careers
        </h2>

        <p className={styles.subheading} style={{ textAlign: "justify" }}>
          From foundational statistics to advanced AI, NIDADS offers hands-on
          programs in Data Science, Machine Learning, Data Analytics, and AI
          Engineering. We nurture talent and transform aspiring analysts into
          industry leaders.
        </p>

        <ul className={styles.featureList}>
          <li>Why 25,000+ Learners Chose Us</li>
        </ul>

        <div className={styles.courseActions}>
          <PopupButton className={styles.exploreBtn}>
            Book My Free Counseling Call
          </PopupButton>
          <PopupButton className={styles.careerBtn}>
            Help Me Choose the Right Course
          </PopupButton>
        </div>
      </div>
    </section>
  );
}
