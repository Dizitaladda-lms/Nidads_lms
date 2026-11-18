import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Degree Program in Artificial Intelligence | Career",
  description:
    "Enroll in our Degree Program in Artificial Intelligence and gain AI skills, hands-on projects, industry certification, and placement support.",
  path: "/course/degree-program-in-ai",
  ogImage: "https://www.nidads.com/TensorFlow%20(1)/Diploma%20in%20Data%20Analytics%20&%20AI%20(12%20Months)%20SQL.png",
  keywords: [
    "artificial intelligence degree program",
    "artificial intelligence degree",
    "artificial intelligence course",
    "ai degree program",
    "artificial intelligence certification",
    "ai certification",
    "ai course",
    "artificial intelligence and machine learning",
    "ai engineering course",
    "btech artificial intelligence",
    "artificial intelligence course with placement",
    "ai certificate course",
    "artificial intelligence engineering",
    "machine learning and ai course",
    "generative ai course",
    "professional ai certification",
    "advanced artificial intelligence course",
    "artificial intelligence training",
    "ai career program",
    "artificial intelligence program",
    "ai and machine learning certification",
    "artificial intelligence online degree",
    "job oriented ai course",
    "ai training institute",
    "ai training with internship",
    "degree program in artificial intelligence",
    "degree program in AI",
    "UGC approved AI degree",
    "DU SOL AI",
    "Amity University AI",
    "NIDADS degree",
    "artificial intelligence degree Delhi",
  ],
});

const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Degree Program in Artificial Intelligence",
  image:
    "https://www.nidads.com/TensorFlow%20(1)/Diploma%20in%20Data%20Analytics%20&%20AI%20(12%20Months)%20SQL.png",
  description:
    "Earn a UGC-approved university degree while mastering cutting-edge AI skills. Choose from DU SOL or Amity University Online — backed by 300+ hours of NIDADS AI specialization.",
  brand: { "@type": "Brand", name: "NIDADS" },
  offers: {
    "@type": "AggregateOffer",
    url: "https://www.nidads.com/course/degree-program-in-ai",
    priceCurrency: "",
    lowPrice: "",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "1043",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nidads.com/" },
    { "@type": "ListItem", position: 2, name: "Course", item: "https://www.nidads.com/course/degree-program-in-ai" },
    { "@type": "ListItem", position: 3, name: "Degree Program in Artificial Intelligence", item: "https://www.nidads.com/course/degree-program-in-ai" },
  ],
};

export default function DegreeLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
