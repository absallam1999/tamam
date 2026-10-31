import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * <SEO /> — imperative meta-tag manager.
 */
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
  const siteName = "Tamam App";
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl =
    canonicalUrl || `${baseUrl}${location.pathname || ""}`;

  useEffect(() => {
    if (typeof document === "undefined") return;

    // ── <title> — avoid double "| Tamam App" ──
    const brandSuffix = ` | ${siteName}`;
    document.title = title
      ? title.includes(siteName)
        ? title
        : `${title}${brandSuffix}`
      : siteName;

    // ── helpers ──
    const setMetaTag = (name, content, isProperty = false) => {
      if (content == null || content === "") return;
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const removeMetaTag = (name, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      const element = document.querySelector(
        `meta[${attribute}="${name}"]`,
      );
      if (element) element.remove();
    };

    const setLinkTag = (rel, href, extraAttrs = {}) => {
      if (!href) return;
      const selector = extraAttrs.hreflang
        ? `link[rel="${rel}"][hreflang="${extraAttrs.hreflang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        Object.entries(extraAttrs).forEach(([k, v]) =>
          element.setAttribute(k, v),
        );
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // ── basic meta ──
    setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    else removeMetaTag("keywords");

    // ── robots ──
    setMetaTag(
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow",
    );

    // ── Open Graph ──
    setMetaTag("og:title", title || siteName, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:url", currentUrl, true);
    setMetaTag("og:site_name", siteName, true);
    setMetaTag(
      "og:image",
      ogImage || `${baseUrl}/social/og-image.png`,
      true,
    );
    const lang =
      (typeof document !== "undefined" &&
        document.documentElement.lang) ||
      "en";
    setMetaTag("og:locale", lang === "ar" ? "ar_EG" : "en_US", true);
    setMetaTag(
      "og:locale:alternate",
      lang === "ar" ? "en_US" : "ar_EG",
      true,
    );

    // ── Twitter / X ──
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title || siteName);
    setMetaTag("twitter:description", description);
    setMetaTag(
      "twitter:image",
      ogImage || `${baseUrl}/social/og-image.png`,
    );

    // ── canonical ──
    setLinkTag("canonical", currentUrl);

    return () => {
      // No cleanup — the next <SEO /> that mounts will overwrite.
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
    currentUrl,
  ]);

  return null;
};

export default SEO;