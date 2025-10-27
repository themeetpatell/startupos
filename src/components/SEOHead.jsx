import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "StartupOS - The Complete Operating System for Startups",
  description = "Transform your startup with StartupOS - the all-in-one platform featuring AI copilots, fractional CXO services, process automation, and expert networks.",
  keywords = "startup platform, AI copilot, fractional CXO, startup operations, process automation",
  image = "https://startupos.com/og-image.jpg",
  url = "https://startupos.com",
  type = "website",
  noIndex = false
}) => {
  useEffect(() => {
    // Update page title for better UX
    document.title = title;
  }, [title]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="StartupOS" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@startupos" />
      <meta name="twitter:creator" content="@startupos" />
    </Helmet>
  );
};

export default SEOHead;
