import Section1About from "@/components/AboutSection/section1about";
import AboutSection2 from "@/components/AboutSection/AboutSection2";
import AboutSection3 from "@/components/AboutSection/AboutSection3";
import FounderSection from "@/components/AboutSection/FounderSection";
import { buildMeta, buildLocalBusinessSchema } from "@/lib/seo";
import Expert from "../../components/homeSections/ExpertMentors"
import Gallery from "../../components/homeSections/gallerySection"
import MissionSection from "@/components/AboutSection/MissionSection"
import StatsSection from "@/components/AboutSection/StatsSection"
import CertificationsSection from "@/components/AboutSection/CertificationsSection"
import Form from "../../components/homeSections/formend"
import "@/styles/blog.css";

export const metadata = buildMeta({
  title: "About Us | Best Data Science & Analytics Institute in Delhi",
  description:
    "Meet the team behind our Data Science & Data Analytics Course. Learn our mission, mentors, and proven track record of student success worldwide.",
  path: "/about",
  keywords: [
    "about nidads",
    "data science and data analytics institute",
    "Best institute for data science and data analytics course",
    "best data science training institute",
    "Best Data Science Institute",
    "Best Data Analytics Institute",
    "Data Science Institute with Placement",
    "Data Analytics Institute with Placement",
    "Data Science Certification Program",
    "Data Analytics Certification Program",
    "Advanced Data Science Program",
    "best data science institute near me",
    "best data analytics institute near me",
  ],
});

const localBusinessSchema = buildLocalBusinessSchema();

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home Page",
      "item": "https://www.nidads.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Page",
      "item": "https://www.nidads.com/about"
    }
  ]
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

export default function AboutPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeOrUniversitySchema) }} />
      <Section1About />
      <AboutSection2 />
      <AboutSection3 />
      <FounderSection />
      <Expert />
      <CertificationsSection />
      <Gallery />
      <StatsSection />
      <MissionSection />
      <Form />
    </main>
  );
}
