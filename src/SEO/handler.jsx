import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import SEO from "./index";
import { seoData } from "./data";

const SEOHandler = ({ storeData = null }) => {
  const location = useLocation();
  const params = useParams();

  const seoProps = useMemo(() => {
    const path = location.pathname;

    // Home page
    if (path === "/") return seoData.home;

    // Static routes
    if (path === "/about") return seoData.about;
    if (path === "/stores") return seoData.stores;
    if (path === "/apps") return seoData.apps;
    if (path === "/apps/customer" || path === "/download")
      return seoData.customerApp;
    if (path === "/apps/courier") return seoData.courierApp;
    if (path === "/apps/store") return seoData.storeApp;
    if (path === "/apps/fleet") return seoData.fleetApp;
    if (path === "/partnership") return seoData.partnership;
    if (path === "/contact") return seoData.contact;
    if (path === "/privacy") return seoData.privacy;
    if (path === "/terms") return seoData.terms;
    if (path === "/cookies") return seoData.cookies;
    if (path === "/gdpr") return seoData.gdpr;
    if (path === "/faq") return seoData.faq;

    // Dynamic store detail page
    if (path.startsWith("/stores/") && storeData) {
      const storeName = storeData.nameEn || storeData.nameAr || "Store";
      return {
        title: `${storeName} - Order Online`,
        description:
          storeData.descriptionEn ||
          storeData.descriptionAr ||
          `Order from ${storeName}. Check menu, delivery time, and more.`,
        keywords: `${storeName.toLowerCase()}, store, delivery, order online${
          storeData.city ? `, ${storeData.city}` : ""
        }`,
        ogType: "website",
      };
    }

    // Default fallback
    return seoData.notFound;
  }, [location.pathname, storeData]);

  return <SEO {...seoProps} />;
};

export default SEOHandler;