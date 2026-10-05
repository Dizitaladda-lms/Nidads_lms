import CareerPrograms from "@/components/homeSections/CareerPrograms";
import GallerySection from "@/components/homeSections/gallerySection";
import Hero8 from "@/components/homeSections/Hero8";
import Hero9 from "@/components/homeSections/Hero9";
import HomeSection1 from "@/components/homeSections/homeSection1";
import HomeSection2 from "@/components/homeSections/homeSection2";
import TrustedCompanies from "@/components/homeSections/TrustedCompanies";
import WhyLearnWithNidads from "@/components/homeSections/WhyLearnWithNidads";
import ExpertMentors from "@/components/homeSections/ExpertMentors";
import WhatYouWillLearn from "@/components/homeSections/WhatYouWillLearn";
import NewSection from "@/components/homeSections/placement";
import TechStackMarquee from "@/components/homeSections/TechStackMarquee";

import Videostest from "@/components/homeSections/videostest";
// import CourseCardsSection from "@/components/homeSections/CourseCardsSection";
import ProjectComparison from "@/components/homeSections/ProjectComparison";
import ProjectsShowcase from "@/components/homeSections/ProjectShowcase";
import PostGraduationProgram from "@/components/homeSections/PostGraduationProgram";
import CertificateSection from "@/components/homeSections/CertificateSection";
import FormEnd from "@/components/homeSections/formend.jsx";
import CourseSection2 from "../components/CourseSection/CourseSection2"
import { buildMeta } from "@/lib/seo";

const _baseMeta = buildMeta({
  title: "Data Science & Analytics Course | Learn & Get Hired",
  description:
    "Master Data Science & Data Analytics with hands-on projects. Learn Python, ML & SQL from experts. Job-ready in weeks. Enroll now — limited seats!",
  path: "/",
  keywords: [
    "Data Science and Data Analytics Course",
    "data science course",
    "data analytics course",
    "python for data science",
    "artificial intelligence and data science",
    "data science course for beginners",
    "data analytics course for beginners",
    "Data Science Course with Placement",
    "Data Analytics Course with Placement",
    "data science Course in Delhi",
    "data analyst course in delhi",
    "data science institute in delhi",
    "data analytics institute in delhi",
  ],
});

export const metadata = {
  ..._baseMeta,
  title: {
    absolute: "Data Science & Analytics Course | Learn & Get Hired",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Nidads",
  "image": "https://www.nidads.com/Nidads-2.webp",
  "@id": "https://maps.app.goo.gl/jKRJLQA2zwRaeJMu9",
  "url": "",
  "telephone": "919205436796",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Savitri Cinema, Space time building, Greater Kailash II",
    "addressLocality": "New Delhi",
    "postalCode": "110048",
    "addressCountry": "IN"
  }
};

const collegeOrUniversitySchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "National institute of data analytics and data science",
  "alternateName": "nidads",
  "url": "https://www.nidads.com/",
  "logo": "https://www.nidads.com/Nidads-2.webp",
  "sameAs": [
    "https://www.instagram.com/nidads_official/",
    "https://in.linkedin.com/in/national-institute-of-data-analytics-and-data-science-28b709381"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is included in the NIDADS Data Science and AI course?", "acceptedAnswer": { "@type": "Answer", "text": "The course includes live instructor-led sessions, real-world project work, Python and SQL training, machine learning modules, Power BI analytics, and career support. It is designed as a full-stack data science and AI training program for job-ready skills." } },
    { "@type": "Question", "name": "How long does the best data science course at NIDADS take to complete?", "acceptedAnswer": { "@type": "Answer", "text": "The NIDADS Data Science course is typically completed in 6 to 9 months depending on your batch and pace. This timeline includes project-based learning, live classes, mentorship, and placement preparation." } },
    { "@type": "Question", "name": "Can working professionals join the online data analytics course?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer online batches, weekend classes, and flexible schedules so working professionals can learn data analytics and machine learning without disrupting their current job." } },
    { "@type": "Question", "name": "Is prior programming experience required for the AI course?", "acceptedAnswer": { "@type": "Answer", "text": "No prior programming experience is required. The course starts with foundational Python, SQL, and data analysis concepts, then advances into machine learning and AI model development." } },
    { "@type": "Question", "name": "What certifications will I get after completing the course?", "acceptedAnswer": { "@type": "Answer", "text": "You receive an industry-recognized NIDADS completion certificate, project certificates for real-world assignments, and preparation for external data science certifications if you choose to pursue them." } },
    { "@type": "Question", "name": "Does the program include placement support and interview preparation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIDADS provides placement support, mock interviews, resume reviews, and company-specific job preparation to help learners transition into data science and analytics roles." } },
    { "@type": "Question", "name": "What tools and technologies are covered in the course?", "acceptedAnswer": { "@type": "Answer", "text": "The curriculum covers Python, SQL, Power BI, Excel, Tableau, TensorFlow, machine learning libraries, and industry-standard analytics tools used by data professionals." } },
    { "@type": "Question", "name": "How many real-world projects are part of the program?", "acceptedAnswer": { "@type": "Answer", "text": "Students complete multiple real-world projects across analytics, machine learning, AI, and business intelligence domains. These projects are designed to strengthen your portfolio for interviews and job applications." } },
    { "@type": "Question", "name": "What career roles can I apply for after this course?", "acceptedAnswer": { "@type": "Answer", "text": "Graduates can pursue roles such as Data Analyst, Business Analyst, Data Scientist, Machine Learning Engineer, AI Specialist, and Analytics Consultant in tech and finance companies." } },
    { "@type": "Question", "name": "How is the course syllabus aligned with industry requirements?", "acceptedAnswer": { "@type": "Answer", "text": "The syllabus is updated with current industry trends, recruiter expectations, and real market use cases, ensuring the learning path matches what hiring managers look for in data science candidates." } },
    { "@type": "Question", "name": "Can I access course recordings after live sessions?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All live session recordings are available in your student portal so you can revisit lessons, revise concepts, and complete projects at your own pace." } },
    { "@type": "Question", "name": "Do I get mentorship from experienced industry experts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The program includes mentorship and guidance from market professionals who work with live data, trade strategies, and analytics models in real corporate environments." } },
    { "@type": "Question", "name": "What is the average salary benefit after course completion?", "acceptedAnswer": { "@type": "Answer", "text": "Learners often see significant salary growth after completing the course, with many landing roles offering higher packages due to strong project experience and applied data science skills." } },
    { "@type": "Question", "name": "How does NIDADS ensure practical learning for data science?", "acceptedAnswer": { "@type": "Answer", "text": "The program emphasizes hands-on learning through case studies, project work, live datasets, simulations, and tool-based assignments that mirror real business analytics workflows." } },
    { "@type": "Question", "name": "Is the course suitable for entry-level students?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The course is structured for beginners as well as professionals, with foundational modules, step-by-step guidance, and advanced topics for learners with some prior experience." } },
    { "@type": "Question", "name": "What is the difference between the data analytics and AI training at NIDADS?", "acceptedAnswer": { "@type": "Answer", "text": "Data analytics focuses on SQL, BI tools, reporting, and insights, while AI training covers machine learning, model building, and predictive analytics. NIDADS blends both so students gain a full data science skill set." } },
    { "@type": "Question", "name": "How do I apply for the NIDADS data science course?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply through the website by filling out the enquiry form or contacting the admissions team for a free course consultation and batch availability details." } },
    { "@type": "Question", "name": "Are there any scholarships or discounts available?", "acceptedAnswer": { "@type": "Answer", "text": "NIDADS occasionally offers early-bird discounts, referral benefits, and scholarship schemes for eligible students. Contact admissions for current offers and eligibility criteria." } },
    { "@type": "Question", "name": "Does the course cover both data science and business analytics?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The curriculum covers data science, machine learning, and business analytics to ensure you understand both technical modeling and business decision-making with data." } },
    { "@type": "Question", "name": "What makes NIDADS one of the top data analytics courses online?", "acceptedAnswer": { "@type": "Answer", "text": "NIDADS stands out for its project-driven curriculum, expert mentorship, live market simulations, placement support, and strong focus on practical skills that hiring teams demand in analytics and AI roles." } }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeOrUniversitySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeSection1 />
      <HomeSection2 />
      <TrustedCompanies />
      <WhyLearnWithNidads />
      <ExpertMentors />
      <WhatYouWillLearn />
      <TechStackMarquee />
      <CourseSection2 />
      {/* <CourseCardsSection/> */}
      <NewSection />
      <CareerPrograms />
      <ProjectComparison />
      <ProjectsShowcase />
      <CertificateSection />
      <PostGraduationProgram />
      <GallerySection />
      <Videostest />

      <Hero9 />
      <FormEnd />
      <Hero8 />
    </>
  );
}
