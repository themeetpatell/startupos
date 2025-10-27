import React from 'react';
import SEOHead from './SEOHead';
import StructuredData from './StructuredData';
import { generateStructuredData, generateBreadcrumbStructuredData } from '../utils/seoUtils';

const PageSEO = ({ 
  page, 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = "website",
  breadcrumbs = [],
  additionalStructuredData = {},
  noIndex = false 
}) => {
  const pageTitle = title || `StartupOS - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
  const pageDescription = description || `Access powerful ${page} tools and resources with StartupOS.`;
  const pageKeywords = keywords || `startup platform, ${page}, business tools, entrepreneurship`;
  const pageUrl = url || `https://startupos.com/${page}`;
  const pageImage = image || 'https://startupos.com/og-image.jpg';

  // Generate structured data
  const structuredData = generateStructuredData(page, additionalStructuredData);
  const breadcrumbData = breadcrumbs.length > 0 ? generateBreadcrumbStructuredData(breadcrumbs) : null;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        image={pageImage}
        url={pageUrl}
        type={type}
        noIndex={noIndex}
      />
      
      <StructuredData data={structuredData} />
      {breadcrumbData && <StructuredData data={breadcrumbData} />}
    </>
  );
};

export default PageSEO;
