import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  Store,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Navigation,
  X,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useAllStores } from "../../hooks/useBrowse";
import { useTranslation } from "react-i18next";

/* =========================================================
   APP DOWNLOAD LINKS
   ========================================================= */
const APP_DOWNLOAD = {
  ios: "https://apps.apple.com/app/tamam/id0000000000",
  android:
    "https://play.google.com/store/apps/details?id=net.tamamapp.customer",
};

/* =========================================================
   SHARED DESIGN TOKENS
   ========================================================= */
const TOKENS = {
  dark: {
    text: "#f4f4f5",
    textStrong: "#fafafa",
    textMuted: "#a1a1aa",
    textFaint: "#71717a",
    border: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.10)",
    surface: "rgba(24, 24, 27, 0.72)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(24,24,27,0.72) 0%, rgba(15,15,17,0.60) 100%)",
    surfaceSolid: "#18181b",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeBorder: "rgba(34,197,94,0.28)",
    chipBg: "rgba(255,255,255,0.03)",
    closedBg: "rgba(239,68,68,0.12)",
    closedBorder: "rgba(239,68,68,0.28)",
    closedText: "#f87171",
    newBg: "rgba(59,130,246,0.12)",
    newBorder: "rgba(59,130,246,0.28)",
    newText: "#60a5fa",
    shadow:
      "0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  light: {
    text: "#18181b",
    textStrong: "#09090b",
    textMuted: "#52525b",
    textFaint: "#71717a",
    border: "rgba(0,0,0,0.06)",
    borderStrong: "rgba(0,0,0,0.10)",
    surface: "rgba(255,255,255,0.85)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(250,250,250,0.75) 100%)",
    surfaceSolid: "#ffffff",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.22)",
    chipBg: "rgba(0,0,0,0.02)",
    closedBg: "rgba(239,68,68,0.08)",
    closedBorder: "rgba(239,68,68,0.22)",
    closedText: "#dc2626",
    newBg: "rgba(59,130,246,0.08)",
    newBorder: "rgba(59,130,246,0.22)",
    newText: "#2563eb",
    shadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
};

const ACCENT = "var(--accent-500, #22c55e)";
const DISMISS_KEY = "tamam_download_cta_dismissed";

const SHOW_DELAY_MS = 900;
const SHOW_STAGGER_MS = 40;
const EXIT_DURATION_MS = 650;
const SHOW_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const HIDE_EASE = "cubic-bezier(0.5, 0, 0.75, 0)";

const Stores = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const {
    stores,
    cities,
    search,
    selectedCityId,
    page,
    totalPages,
    total,
    storesLoading,
    storesError,
    handleSearch,
    handleCityChange,
    handlePageChange,
    pageSize,
  } = useAllStores();

  const [mountedDownloadCard, setMountedDownloadCard] = useState(false);
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [downloadCardDismissed, setDownloadCardDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (
      downloadCardDismissed ||
      storesLoading ||
      storesError ||
      stores.length === 0
    ) {
      return;
    }
    let showTimer;
    const mountTimer = setTimeout(() => {
      setMountedDownloadCard(true);
      showTimer = setTimeout(() => setShowDownloadCard(true), SHOW_STAGGER_MS);
    }, SHOW_DELAY_MS);

    return () => {
      clearTimeout(mountTimer);
      if (showTimer) clearTimeout(showTimer);
    };
  }, [downloadCardDismissed, storesLoading, storesError, stores.length]);

  const dismissDownloadCard = () => {
    setShowDownloadCard(false);
    setDownloadCardDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setTimeout(() => setMountedDownloadCard(false), EXIT_DURATION_MS);
  };

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  const glassStyle = {
    background: c.surfaceGradient,
    border: `1px solid ${c.border}`,
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const getStoreName = (store) =>
    isRTL ? store.nameAr || store.nameEn : store.nameEn || store.nameAr;

  const getStoreDescription = (store) =>
    isRTL
      ? store.descriptionAr || store.descriptionEn
      : store.descriptionEn || store.descriptionAr;

  const getStoreAddress = (store) => {
    const street = isRTL
      ? store.streetAr || store.streetEn
      : store.streetEn || store.streetAr;
    const parts = [street, store.city].filter(Boolean);
    return parts.join(" • ");
  };

  const isStoreOpen = (store) => store.isOpen !== false;
  const hasRating = (store) =>
    (store.ratingCount || 0) > 0 || (store.rating || 0) > 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: showDownloadCard ? "150px" : 0,
        transition: `padding-bottom 600ms ${SHOW_EASE}`,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding:
            "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
        }}
      >
        {/* ============ HEADER ============ */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            direction: dir,
            marginBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          <div style={{ marginBottom: "clamp(16px, 2vw, 24px)" }}>
            <nav
              aria-label="Breadcrumb"
              style={{ direction: dir, display: "inline-block" }}
            >
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  ...glassStyle,
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = ACCENT;
                  e.currentTarget.style.transform = `translateX(${
                    isRTL ? 4 : -4
                  }px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = c.textMuted;
                  e.currentTarget.style.transform = "none";
                }}
              >
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                <span>{t("common.back") || (isRTL ? "الرئيسية" : "Home")}</span>
              </Link>
            </nav>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: c.badgeBg,
              border: `1px solid ${c.badgeBorder}`,
              color: ACCENT,
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            <Store size={14} />
            <span>{isRTL ? "المتاجر المعتمدة" : "Verified Outlets"}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: c.textStrong,
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "clamp(6px, 1vw, 8px)",
            }}
          >
            {isRTL ? "جميع المتاجر" : "All Stores"}
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.8vw, 16px)",
              color: c.textMuted,
            }}
          >
            {isRTL
              ? `تصفح ${total} متجر في جميع المناطق`
              : `Browse ${total} stores across all areas`}
          </p>
        </div>

        {/* ============ DOWNLOAD APP ============ */}
        {mountedDownloadCard && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 90,
              padding: "0 12px 12px",
              pointerEvents: showDownloadCard ? "auto" : "none",
            }}
          >
            <div
              role="banner"
              aria-hidden={!showDownloadCard}
              style={{
                width: "100%",
                transform: showDownloadCard
                  ? "translateY(0) scale(1)"
                  : "translateY(105%) scale(0.94)",
                opacity: showDownloadCard ? 1 : 0,
                transition: showDownloadCard
                  ? `transform 700ms ${SHOW_EASE}, opacity 400ms ${SHOW_EASE}`
                  : `transform 500ms ${HIDE_EASE}, opacity 320ms ${HIDE_EASE}`,
                willChange: "transform, opacity",
                // ── visual ──
                display: "flex",
                alignItems: "center",
                gap: "clamp(10px, 2vw, 16px)",
                padding: "clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 20px)",
                borderRadius: "22px",
                background: darkMode
                  ? "linear-gradient(135deg, rgba(24,24,27,0.94) 0%, rgba(15,15,17,0.94) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(250,250,250,0.97) 100%)",
                border: `1px solid ${c.borderStrong}`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: darkMode
                  ? "0 24px 60px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 24px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                flexWrap: "wrap",
                direction: dir,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #16a34a 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 8px 20px ${
                    darkMode ? "rgba(34,197,94,0.35)" : "rgba(34,197,94,0.25)"
                  }`,
                }}
              >
                <Smartphone size={22} color="#ffffff" />
              </div>

              {/* Copy */}
              <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: "clamp(13px, 1.6vw, 15px)",
                    fontWeight: 700,
                    color: c.text,
                    margin: 0,
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isRTL
                    ? "اطلب الآن من تطبيق تمام"
                    : "Order now on the Tamam app"}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(11px, 1.3vw, 12.5px)",
                    color: c.textMuted,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isRTL
                    ? "توصيل أسرع + عروض حصرية لمستخدمي التطبيق"
                    : "Faster delivery + app-only exclusive offers"}
                </p>
              </div>

              {/* Store buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexShrink: 0,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={APP_DOWNLOAD.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    backgroundColor: darkMode ? "#ffffff" : "#000000",
                    color: darkMode ? "#000000" : "#ffffff",
                    textDecoration: "none",
                    border: darkMode
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "1px solid rgba(255,255,255,0.1)",
                    minWidth: "138px",
                    justifyContent: "center",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple"
                    style={{
                      width: "16px",
                      height: "18px",
                      flexShrink: 0,
                      filter: darkMode ? "none" : "invert(1)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      textAlign: "start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 500,
                        opacity: 0.7,
                        lineHeight: 1,
                      }}
                    >
                      {isRTL ? "حمّل من" : "Download on the"}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      App Store
                    </span>
                  </div>
                </a>

                <a
                  href={APP_DOWNLOAD.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    backgroundColor: darkMode ? "#ffffff" : "#000000",
                    color: darkMode ? "#000000" : "#ffffff",
                    textDecoration: "none",
                    border: darkMode
                      ? "1px solid rgba(0,0,0,0.06)"
                      : "1px solid rgba(255,255,255,0.1)",
                    minWidth: "138px",
                    justifyContent: "center",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png"
                    alt="Google Play"
                    style={{ width: "22px", height: "14px", flexShrink: 0 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      textAlign: "start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 500,
                        opacity: 0.7,
                        lineHeight: 1,
                      }}
                    >
                      {isRTL ? "حمّل من" : "GET IT ON"}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              {/* Dismiss */}
              <button
                onClick={dismissDownloadCard}
                aria-label={isRTL ? "إغلاق" : "Dismiss"}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: c.chipBg,
                  color: c.textFaint,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)";
                  e.currentTarget.style.color = c.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = c.chipBg;
                  e.currentTarget.style.color = c.textFaint;
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ============ SEARCH & FILTER BAR ============ */}
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 1.5vw, 12px)",
            marginBottom: "clamp(24px, 4vw, 36px)",
            flexWrap: "wrap",
            direction: dir,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <div style={{ flex: "1", minWidth: "240px", position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: c.textFaint,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={
                isRTL
                  ? "ابحث عن مطعم أو متجر..."
                  : "Search for a restaurant or store..."
              }
              style={{
                width: "100%",
                padding: isRTL ? "12px 42px 12px 16px" : "12px 16px 12px 42px",
                borderRadius: "14px",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                color: c.text,
                fontSize: "clamp(13px, 1.5vw, 14px)",
                outline: "none",
                fontFamily: "inherit",
                direction: dir,
                transition: "all 0.25s ease",
                boxShadow: darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(34,197,94,0.5)"
                  : "rgba(34,197,94,0.4)";
                e.target.style.boxShadow = darkMode
                  ? "0 0 0 3px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 0 0 3px rgba(34,197,94,0.1), 0 2px 8px rgba(0,0,0,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.target.style.boxShadow = darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)";
              }}
            />
          </div>

          <div style={{ position: "relative", minWidth: "170px" }}>
            <MapPin
              size={14}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: c.textFaint,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 38px 12px 38px",
                borderRadius: "14px",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                color: c.text,
                fontSize: "clamp(13px, 1.5vw, 14px)",
                outline: "none",
                fontFamily: "inherit",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                direction: dir,
                transition: "all 0.25s ease",
                boxShadow: darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(34,197,94,0.5)"
                  : "rgba(34,197,94,0.4)";
                e.target.style.boxShadow = darkMode
                  ? "0 0 0 3px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 0 0 3px rgba(34,197,94,0.1), 0 2px 8px rgba(0,0,0,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.target.style.boxShadow = darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)";
              }}
            >
              <option
                value=""
                style={{ backgroundColor: c.surfaceSolid, color: c.text }}
              >
                {isRTL ? "جميع المناطق" : "All Areas"}
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                  style={{ backgroundColor: c.surfaceSolid, color: c.text }}
                >
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              style={{
                position: "absolute",
                [isRTL ? "left" : "right"]: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: c.textFaint,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* ============ RESULTS COUNT ============ */}
        {!storesLoading && !storesError && stores.length > 0 && (
          <div
            style={{
              direction: dir,
              marginBottom: "clamp(16px, 2vw, 20px)",
              fontSize: "clamp(12px, 1.3vw, 13px)",
              color: c.textFaint,
              opacity: isVisible ? 1 : 0,
              transition: "all 0.5s ease 0.2s",
            }}
          >
            {isRTL
              ? `عرض ${(page - 1) * pageSize + 1}-${Math.min(
                  page * pageSize,
                  total,
                )} من ${total} متجر`
              : `Showing ${(page - 1) * pageSize + 1}-${Math.min(
                  page * pageSize,
                  total,
                )} of ${total} stores`}
          </div>
        )}

        {/* ============ STORE GRID ============ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "clamp(12px, 2vw, 16px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          {storesLoading ? (
            Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "20px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  border: `1px solid ${
                    darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"
                  }`,
                  overflow: "hidden",
                  direction: dir,
                }}
              >
                <div
                  style={{
                    height: "120px",
                    backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                    animation: "pulse 2s infinite",
                  }}
                />
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      height: "16px",
                      width: "75%",
                      backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{
                      height: "12px",
                      width: "50%",
                      backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "12px",
                        width: "40%",
                        backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                        borderRadius: "8px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <div
                      style={{
                        height: "12px",
                        width: "25%",
                        backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                        borderRadius: "8px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : storesError ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store
                size={48}
                style={{
                  color: darkMode ? "#52525b" : "#d4d4d8",
                  marginBottom: "16px",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: c.textMuted,
                }}
              >
                {isRTL ? "تعذر تحميل المتاجر" : "Unable to load stores"}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: c.textFaint,
                  marginTop: "4px",
                }}
              >
                {isRTL
                  ? "يرجى المحاولة مرة أخرى لاحقاً"
                  : "Please try again later"}
              </p>
            </div>
          ) : stores.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store
                size={48}
                style={{
                  color: darkMode ? "#52525b" : "#d4d4d8",
                  marginBottom: "16px",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: c.textMuted,
                }}
              >
                {isRTL ? "لا توجد متاجر متاحة" : "No stores available"}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: c.textFaint,
                  marginTop: "4px",
                }}
              >
                {isRTL
                  ? "جرب البحث عن منطقة أخرى"
                  : "Try searching for a different area"}
              </p>
            </div>
          ) : (
            stores.map((store) => {
              const open = isStoreOpen(store);
              const showRating = hasRating(store);
              const address = getStoreAddress(store);
              const description = getStoreDescription(store);
              const minOrder = Number(store.minimumOrderAmount) || 0;
              const distance = Number(store.distanceKm) || 0;
              const deliveryFee = Number(store.deliveryFee) || 0;

              return (
                <Link
                  key={store.id}
                  to={`/stores/${store.id}`}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${
                      darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"
                    }`,
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                    direction: dir,
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    opacity: open ? 1 : 0.72,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = darkMode
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(34,197,94,0.15)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 16px 40px rgba(0,0,0,0.3)"
                      : "0 16px 40px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = darkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      height: "120px",
                      background: darkMode
                        ? "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)"
                        : "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {store.coverUrl ? (
                      <img
                        src={store.coverUrl}
                        alt={getStoreName(store)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <Store
                        size={40}
                        style={{
                          color: darkMode ? "#52525b" : "rgba(5,150,105,0.4)",
                        }}
                      />
                    )}

                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        [isRTL ? "left" : "right"]: "10px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        backgroundColor: open
                          ? darkMode
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.85)"
                          : c.closedBg,
                        border: open ? "none" : `1px solid ${c.closedBorder}`,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: open
                          ? darkMode
                            ? "#d4d4d8"
                            : "#3f3f46"
                          : c.closedText,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        direction: dir,
                      }}
                    >
                      {open ? (
                        <>
                          <Clock size={10} />
                          {store.estimatedPreparationMinutes
                            ? `${store.estimatedPreparationMinutes} ${
                                isRTL ? "دقيقة" : "min"
                              }`
                            : isRTL
                              ? "20-30 دقيقة"
                              : "20-30 min"}
                        </>
                      ) : (
                        <>{isRTL ? "مغلق الآن" : "Closed Now"}</>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: c.text,
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getStoreName(store)}
                        </h3>
                      </div>
                      {showRating ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            padding: "3px 8px",
                            borderRadius: "8px",
                            backgroundColor: darkMode
                              ? "rgba(234,179,8,0.15)"
                              : "rgba(234,179,8,0.12)",
                            flexShrink: 0,
                          }}
                        >
                          <Star size={12} fill="#eab308" color="#eab308" />
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              color: darkMode ? "#facc15" : "#ca8a04",
                            }}
                          >
                            {(store.rating || 0).toFixed(1)}
                          </span>
                          {store.ratingCount > 0 && (
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 500,
                                color: darkMode ? "#facc15" : "#ca8a04",
                                opacity: 0.8,
                              }}
                            >
                              ({store.ratingCount})
                            </span>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: "3px 8px",
                            borderRadius: "8px",
                            backgroundColor: c.newBg,
                            border: `1px solid ${c.newBorder}`,
                            color: c.newText,
                            fontSize: "10px",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {isRTL ? "جديد" : "NEW"}
                        </div>
                      )}
                    </div>

                    {description && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: c.textMuted,
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          lineHeight: 1.4,
                        }}
                      >
                        {description}
                      </p>
                    )}

                    {address && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "12px",
                          color: c.textMuted,
                          minWidth: 0,
                        }}
                      >
                        <MapPin
                          size={12}
                          color={ACCENT}
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {address}
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginTop: "auto",
                        paddingTop: "4px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: deliveryFee === 0 ? ACCENT : c.textMuted,
                          }}
                        >
                          {deliveryFee === 0
                            ? isRTL
                              ? "توصيل مجاني"
                              : "Free Delivery"
                            : `${deliveryFee} ${isRTL ? "ج.م توصيل" : "EGP"}`}
                        </span>
                        {minOrder > 0 && (
                          <span
                            style={{ fontSize: "11px", color: c.textFaint }}
                          >
                            {isRTL
                              ? `الحد الأدنى ${minOrder} ج.م`
                              : `Min ${minOrder} EGP`}
                          </span>
                        )}
                      </div>
                      {distance > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            color: c.textFaint,
                          }}
                        >
                          <Navigation size={11} />
                          <span>
                            {distance < 1
                              ? isRTL
                                ? `${Math.round(distance * 1000)} م`
                                : `${Math.round(distance * 1000)} m`
                              : isRTL
                                ? `${distance.toFixed(1)} كم`
                                : `${distance.toFixed(1)} km`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* ============ PAGINATION ============ */}
        {!storesLoading && !storesError && totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(4px, 1vw, 6px)",
              marginTop: "clamp(36px, 5vw, 48px)",
              direction: dir,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "clamp(8px, 1vw, 10px) clamp(12px, 2vw, 16px)",
                borderRadius: "12px",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                }`,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff",
                color: page === 1 ? (darkMode ? "#52525b" : "#d4d4d8") : c.text,
                fontSize: "clamp(12px, 1.3vw, 14px)",
                fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: page === 1 ? 0.5 : 1,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (page !== 1) {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(34,197,94,0.2)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(34,197,94,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)";
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff";
              }}
            >
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              <span>{isRTL ? "السابق" : "Previous"}</span>
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  minWidth: "clamp(36px, 4vw, 40px)",
                  height: "clamp(36px, 4vw, 40px)",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor:
                    page === pageNum
                      ? "var(--accent-500)"
                      : darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                  color:
                    page === pageNum
                      ? "#ffffff"
                      : darkMode
                        ? "#a1a1aa"
                        : "#71717a",
                  fontSize: "clamp(13px, 1.4vw, 14px)",
                  fontWeight: page === pageNum ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.backgroundColor = darkMode
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(34,197,94,0.08)";
                    e.currentTarget.style.color = "var(--accent-500)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.backgroundColor = darkMode
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)";
                    e.currentTarget.style.color = darkMode
                      ? "#a1a1aa"
                      : "#71717a";
                  }
                }}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "clamp(8px, 1vw, 10px) clamp(12px, 2vw, 16px)",
                borderRadius: "12px",
                border: `1px solid ${
                  darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
                }`,
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff",
                color:
                  page === totalPages
                    ? darkMode
                      ? "#52525b"
                      : "#d4d4d8"
                    : c.text,
                fontSize: "clamp(12px, 1.3vw, 14px)",
                fontWeight: 500,
                cursor: page === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: page === totalPages ? 0.5 : 1,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (page !== totalPages) {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(34,197,94,0.2)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(34,197,94,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)";
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff";
              }}
            >
              <span>{isRTL ? "التالي" : "Next"}</span>
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Stores;
