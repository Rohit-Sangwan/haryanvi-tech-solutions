import React from "react";

export const OrganizationSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareCompany",
    "name": "HARYANVI DEVELOPER",
    "alternateName": "HaryanviDeveloper",
    "url": "https://haryanvideveloper.tech",
    "logo": "https://haryanvideveloper.tech/haryanvideveloperlogo.jpg",
    "founder": {
      "@type": "Person",
      "name": "Rohit Sangwan",
      "url": "https://haryanvideveloper.tech/about"
    },
    "employee": {
      "@type": "Person",
      "name": "Rohit Sangwan",
      "jobTitle": "Founder & Developer",
      "sameAs": "https://www.instagram.com/haryanvihacker"
    },
    "sameAs": [
      "https://github.com/haryanvideveloper",
      "https://www.instagram.com/haryanvideveloper",
      "https://www.youtube.com/@haryanvi_developer"
    ],
    "description":
      "HARYANVI DEVELOPER is a software and IT services firm by Rohit Sangwan, offering advanced OSINT tools, web development, and ethical hacking solutions.",
    "foundingDate": "2020-03-14",
    "foundingLocation": {
      "@type": "Place",
      "name": "Charkhi Dadri, Haryana, India"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "465",
      "addressLocality": "Charkhi Dadri",
      "addressRegion": "Haryana",
      "postalCode": "127306",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "haryanvideveloper@gmail.com",
      "contactType": "customer support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "OSINT Search Tool",
        "description": "Advanced phone/email lookup and leak detection tool."
      }
    },
    "award": "Featured as Top OSINT Tool on  GitHub in 2025"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
