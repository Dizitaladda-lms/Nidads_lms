"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero9.module.css";
import PopupButton from "@/components/PopupButton";

const testimonials = [
  {
    text: "The project-based training at NIDADS helped me build a portfolio that landed me a data analyst role within three months of graduation.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Amit Sharma",
    role: "Data Analyst",
  },
  
  {
    text: "Hands-on mentorship and real industry projects gave me the confidence to transition into machine learning engineering.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Rahul Verma",
    role: "Machine Learning Engineer",
  },

  {
    text: "The supportive faculty and living labs made learning complex concepts enjoyable and practical.",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "Priya Singh",
    role: "Data Scientist",
  },
  {
    text: "From basics to advanced analytics, the structured curriculum gave me clarity and career direction.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Suresh Kumar",
    role: "Business Intelligence Analyst",
  },
  {
    text: "The placement cell's mock interviews and resume reviews were key to securing my first job offer.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Neha Patel",
    role: "Data Engineer",
  },
  {
    text: "I loved the community and peer learning – we kept each other motivated through every project.",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    name: "Anjali Mehra",
    role: "Analytics Consultant",
  },
  {
    text: "NIDADS’ campus environment made it easy to balance theory with hands-on practice every day.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "Vikram Joshi",
    role: "Data Science Trainer",
  },
  {
    text: "The real-world datasets we worked on prepared me for the kinds of problems companies actually solve.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    name: "Sneha Rao",
    role: "AI Researcher",
  },
  {
    text: "The network I built here continues to open doors in the data industry for me.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "Rohan Desai",
    role: "Product Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialCard = ({ text, image, name, role }) => (
  <div className={styles.card}>
    <p className={styles.text}>{text}</p>
    <div className={styles.author}>
      <img src={image} alt={name} className={styles.avatar} width={44} height={44} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>{role}</div>
      </div>
    </div>
  </div>
);

const TestimonialsColumn = ({ testimonials, speed, isPaused }) => {
  const columnRef = useRef(null);

  useEffect(() => {
    const column = columnRef.current;
    if (!column || window.matchMedia("(max-width: 768px)").matches) return;

    let animationId = null;
    let translateY = 0;
    let isVisible = false;

    const shouldAnimate = () => isVisible && !isPaused && !document.hidden;
    const stopAnimation = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const animate = () => {
      animationId = null;
      if (!shouldAnimate()) return;

      translateY += speed;

      if (translateY >= column.scrollHeight / 2) {
        translateY = 0;
      }

      column.style.transform = `translateY(-${translateY}px)`;

      if (shouldAnimate()) animationId = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      if (shouldAnimate() && animationId === null) {
        animationId = requestAnimationFrame(animate);
      } else if (!shouldAnimate()) {
        stopAnimation();
      }
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncAnimation();
    });
    visibilityObserver.observe(column);

    const handleVisibilityChange = () => syncAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [speed, isPaused]);

  return (
    <div className={styles.column}>
      <div ref={columnRef} className={styles.columnContent}>
        {[...Array(2)].map((_, index) => (
          <div key={index}>
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={`${index}-${i}`} {...testimonial} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero9 = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>Testimonials</span>
          </div>
          <h2 className={styles.title}>What <span style={{color:"#38b6ff"}}>Learners Say</span></h2>
          <p className={styles.description}>
            See what our customers have to say about us.
          </p>
        </div>

        <div className={styles.testimonialsWrapper}>
          <div className={styles.testimonialsGrid}>
            <TestimonialsColumn
              testimonials={firstColumn}
              speed={1.2}
              isPaused={isPaused}
            />
            <TestimonialsColumn
              testimonials={secondColumn}
              speed={1.5}
              isPaused={isPaused}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              speed={1.8}
              isPaused={isPaused}
            />
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <PopupButton className={styles.ctaButton}>
            Kickstart Your Career
          </PopupButton>
        </div>
      </div>
    </section>
  );
};

export default Hero9;