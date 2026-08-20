import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noIndex = false,
}) => {
  const location = useLocation();
  const siteName = "Tamam";
  const baseUrl = window.location.origin;
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Set document title
    document.title = title ? `${title} | ${siteName}` : siteName;

    // Helper to set or update meta tags
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to remove meta tag
    const removeMetaTag = (name, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      const element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) {
        element.remove();
      }
    };

    // Set link tags
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Basic Meta Tags
    setMetaTag("description", description);

    if (keywords) {
      setMetaTag("keywords", keywords);
    } else {
      removeMetaTag("keywords");
    }

    // Robots
    if (noIndex) {
      setMetaTag("robots", "noindex, nofollow");
    } else {
      setMetaTag("robots", "index, follow");
    }

    // Open Graph Tags
    setMetaTag("og:title", title || siteName, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:url", currentUrl, true);
    setMetaTag("og:site_name", siteName, true);

    if (ogImage) {
      setMetaTag("og:image", ogImage, true);
    } else {
      setMetaTag("og:image", `${baseUrl}/social/og-image.png`, true); // Default OG image
    }

    // Twitter Card Tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title || siteName);
    setMetaTag("twitter:description", description);
    if (ogImage) {
      setMetaTag("twitter:image", ogImage);
    }

    // Canonical URL
    setLinkTag("canonical", currentUrl);

    // Language alternates (if you have multiple languages)
    // Uncomment and modify if needed:
    // const lang = document.documentElement.lang || "en";
    // setLinkTag("alternate", `${baseUrl}/ar${location.pathname}`);
    // setMetaTag("og:locale", lang === "ar" ? "ar_EG" : "en_US", true);

    return () => {
      // Cleanup (optional - usually not needed as next page will override)
    };
  }, [
    title,
    description,
    keywords,
    ogImage,
    ogType,
    canonicalUrl,
    noIndex,
    location.pathname,
    baseUrl,
    siteName,
    currentUrl,
  ]);

  return null; // This component doesn't render anything
};

export default SEO;
