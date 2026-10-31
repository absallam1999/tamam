import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SEO from "./index";
import { seoData } from "./data";

const SEOHandler = ({ storeData = null }) => {
  const location = useLocation();

  const seoProps = useMemo(() => {
    const path = location.pathname;

    // ── static routes ────────────────────────────────────
    switch (path) {
      case "/":
        return seoData.home;
      case "/about":
        return seoData.about;
      case "/stores":
        return seoData.stores;
      case "/apps":
        return seoData.apps;
      case "/apps/customer":
      case "/download":
        return seoData.customerApp;
      case "/apps/courier":
        return seoData.courierApp;
      case "/apps/store":
        return seoData.storeApp;
      case "/apps/fleet":
        return seoData.fleetApp;
      case "/partnership":
        return seoData.partnership;
      case "/contact":
        return seoData.contact;
      case "/privacy":
        return seoData.privacy;
      case "/terms":
        return seoData.terms;
      case "/cookies":
        return seoData.cookies;
      case "/gdpr":
        return seoData.gdpr;
      case "/faq":
        return seoData.faq;
    }

    // ── dynamic: store detail ────────────────────────────
    if (path.startsWith("/stores/")) {
      if (storeData) {
        const storeName =
          storeData.nameEn || storeData.nameAr || "Store";
        const description =
          storeData.descriptionEn ||
          storeData.descriptionAr ||
          `Order from ${storeName}. Check menu, delivery time, and more.`;
        const keywords = [
          storeName.toLowerCase(),
          "store",
          "delivery",
          "order online",
          storeData.city,
        ]
          .filter(Boolean)
          .join(", ");
        return {
          title: `${storeName}`,
          description,
          keywords,
          ogType: "website",
          ogImage: storeData.coverUrl || undefined,
        };
      }
      // No data yet
      return seoData.storeDetail;
    }

    // ── fallback ─────────────────────────────────────────
    return seoData.notFound;
  }, [location.pathname, storeData]);

  return <SEO {...seoProps} />;
};

export default SEOHandler;