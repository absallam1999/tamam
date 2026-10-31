import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  Store,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Navigation,
  Download,
  Receipt,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { apiClient } from "../../lib/api-client";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";

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
    openBg: "rgba(34,197,94,0.12)",
    openBorder: "rgba(34,197,94,0.28)",
    openText: "#4ade80",
    closedBg: "rgba(239,68,68,0.12)",
    closedBorder: "rgba(239,68,68,0.28)",
    closedText: "#f87171",
    newBg: "rgba(59,130,246,0.12)",
    newBorder: "rgba(59,130,246,0.28)",
    newText: "#60a5fa",
    chipBg: "rgba(255,255,255,0.03)",
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
    openBg: "rgba(34,197,94,0.08)",
    openBorder: "rgba(34,197,94,0.22)",
    openText: "#16a34a",
    closedBg: "rgba(239,68,68,0.08)",
    closedBorder: "rgba(239,68,68,0.22)",
    closedText: "#dc2626",
    newBg: "rgba(59,130,246,0.08)",
    newBorder: "rgba(59,130,246,0.22)",
    newText: "#2563eb",
    chipBg: "rgba(0,0,0,0.02)",
    shadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
};

const ACCENT = "var(--accent-500, #22c55e)";

/* =========================================================
   HELPERS
   ========================================================= */

function extractStore(response) {
  if (!response) return null;
  let payload = response;
  if (
    payload.data !== undefined &&
    (payload.status !== undefined ||
      payload.headers !== undefined ||
      payload.config !== undefined)
  ) {
    payload = payload.data;
  }
  // wrapped envelope
  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "success" in payload &&
    "data" in payload
  ) {
    payload = payload.data;
  }
  return payload;
}

/** "00:00:00" → "00:00". */
function trimTime(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null;
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
}

/** Store type / menu category label — works for strings AND objects. */
function localizedLabel(item, isRTL) {
  if (item == null) return null;
  if (typeof item === "string") return item;
  if (typeof item === "object") {
    return isRTL
      ? item.nameAr || item.nameEn || item.titleAr || item.titleEn || null
      : item.nameEn || item.nameAr || item.titleEn || item.titleAr || null;
  }
  return null;
}

/* =========================================================
   COMPONENT
   ========================================================= */

const StoreDetail = () => {
  const { id } = useParams();
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [isRTL]);

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/api/browse/stores/${id}`);
        const parsed = extractStore(response);
        if (!parsed) {
          setError(isRTL ? "المتجر غير موجود" : "Store not found");
          setStore(null);
        } else {
          setStore(parsed);
        }
      } catch (err) {
        setError(err?.message || "Failed to load store");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStore();
  }, [id, isRTL]);

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  const glassStyle = {
    background: c.surfaceGradient,
    border: `1px solid ${c.border}`,
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding:
              "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "120px",
              backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
              borderRadius: "8px",
              marginBottom: "clamp(28px, 4vw, 40px)",
              animation: "pulse 2s infinite",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: isMobile || isTablet ? "column" : "row",
              gap: "clamp(32px, 6vw, 80px)",
              marginBottom: "clamp(40px, 6vw, 60px)",
            }}
          >
            <div
              style={{
                flex: 1,
                height: isMobile ? "200px" : "300px",
                borderRadius: "clamp(16px, 2.5vw, 24px)",
                backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                animation: "pulse 2s infinite",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: "clamp(28px, 4vw, 36px)",
                  width: "60%",
                  backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  animation: "pulse 2s infinite",
                }}
              />
              <div
                style={{
                  height: "16px",
                  width: "40%",
                  backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                  borderRadius: "8px",
                  marginBottom: "24px",
                  animation: "pulse 2s infinite",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "clamp(60px, 10vw, 80px)",
                      backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </div>
    );
  }

  /* ---------- Error / Not Found ---------- */
  if (error || !store) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding:
              "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <div
            style={{
              ...glassStyle,
              padding: "clamp(40px, 8vw, 64px) clamp(24px, 5vw, 40px)",
              borderRadius: "clamp(20px, 3vw, 32px)",
              textAlign: "center",
              maxWidth: "480px",
              width: "100%",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                width: "clamp(72px, 12vw, 96px)",
                height: "clamp(72px, 12vw, 96px)",
                borderRadius: "clamp(18px, 3vw, 24px)",
                background: darkMode
                  ? "rgba(239, 68, 68, 0.12)"
                  : "rgba(239, 68, 68, 0.08)",
                border: darkMode
                  ? "1px solid rgba(239, 68, 68, 0.2)"
                  : "1px solid rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto clamp(20px, 3vw, 28px)",
                backdropFilter: "blur(12px)",
                boxShadow: darkMode
                  ? "0 12px 32px rgba(239, 68, 68, 0.15)"
                  : "0 12px 32px rgba(239, 68, 68, 0.1)",
              }}
            >
              <Store
                size={isMobile ? 32 : 40}
                color={darkMode ? "#fca5a5" : "#ef4444"}
              />
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 28px)",
                fontWeight: 800,
                color: c.textStrong,
                letterSpacing: isRTL ? "0" : "-0.02em",
                marginBottom: "clamp(8px, 1.5vw, 12px)",
              }}
            >
              {error
                ? isRTL
                  ? "حدث خطأ"
                  : "Something Went Wrong"
                : isRTL
                  ? "المتجر غير موجود"
                  : "Store Not Found"}
            </h2>

            <p
              style={{
                fontSize: "clamp(13px, 1.6vw, 15px)",
                color: c.textMuted,
                lineHeight: 1.7,
                marginBottom: "clamp(24px, 4vw, 32px)",
                maxWidth: "360px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {error
                ? isRTL
                  ? "عذراً، حدث خطأ أثناء تحميل بيانات المتجر. يرجى المحاولة مرة أخرى."
                  : "Sorry, an error occurred while loading the store data. Please try again."
                : isRTL
                  ? "عذراً، لم نتمكن من العثور على هذا المتجر. ربما تمت إزالته أو الرابط غير صحيح."
                  : "Sorry, we couldn't find this store. It may have been removed or the link is incorrect."}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(10px, 1.5vw, 14px)",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/"
                style={{
                  ...glassStyle,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                  borderRadius: "clamp(12px, 2vw, 14px)",
                  color: c.text,
                  textDecoration: "none",
                  fontSize: "clamp(13px, 1.5vw, 14px)",
                  fontWeight: 600,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 12px 32px rgba(0,0,0,0.3)"
                    : "0 12px 32px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = glassStyle.background;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                <span>{isRTL ? "الرئيسية" : "Home"}</span>
              </Link>

              <Link
                to="/stores"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                  borderRadius: "clamp(12px, 2vw, 14px)",
                  backgroundColor: ACCENT,
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(13px, 1.5vw, 14px)",
                  fontWeight: 600,
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: darkMode
                    ? "0 8px 24px rgba(34,197,94,0.3)"
                    : "0 8px 24px rgba(34,197,94,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 14px 32px rgba(34,197,94,0.4)"
                    : "0 14px 32px rgba(34,197,94,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 8px 24px rgba(34,197,94,0.3)"
                    : "0 8px 24px rgba(34,197,94,0.2)";
                }}
              >
                <Store size={18} />
                <span>{isRTL ? "تصفح المتاجر" : "Browse Stores"}</span>
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Derived values from the store ---------- */
  const storeName = isRTL
    ? store.nameAr || store.nameEn
    : store.nameEn || store.nameAr;
  const storeDescription = isRTL
    ? store.descriptionAr || store.descriptionEn
    : store.descriptionEn || store.descriptionAr;
  const storeStreet = isRTL
    ? store.streetAr || store.streetEn
    : store.streetEn || store.streetAr;
  const fullAddress = [storeStreet, store.city].filter(Boolean).join(" • ");

  const isOpen = store.isOpen !== false;
  const hasRating = (store.ratingCount || 0) > 0 || (store.rating || 0) > 0;
  const deliveryFee = Number(store.deliveryFee) || 0;
  const minOrder = Number(store.minimumOrderAmount) || 0;
  const distance = Number(store.distanceKm) || 0;

  const openAt = trimTime(store.openingTime);
  const closeAt = trimTime(store.closingTime);
  const hoursLabel =
    openAt && closeAt
      ? openAt === "00:00" && closeAt === "00:00"
        ? isRTL
          ? "٢٤ ساعة"
          : "24 hours"
        : `${openAt} – ${closeAt}`
      : null;

  const storeTypeChips = Array.isArray(store.storeTypes)
    ? store.storeTypes
        .map((tItem) => localizedLabel(tItem, isRTL))
        .filter(Boolean)
    : [];

  const menuCategories = Array.isArray(store.menuCategories)
    ? store.menuCategories
    : [];

  const formatDistance = () => {
    if (distance <= 0) return null;
    if (distance < 1) {
      const m = Math.round(distance * 1000);
      return isRTL ? `${m} م` : `${m} m`;
    }
    const km = distance.toFixed(1);
    return isRTL ? `${km} كم` : `${km} km`;
  };

  const distanceLabel = formatDistance();

  return (
    <>
      <SEO
        title={`${storeName}`}
        description={
          storeDescription ||
          `Order from ${storeName}. Check menu, delivery time, and more.`
        }
        keywords={[
          storeName.toLowerCase(),
          "store",
          "delivery",
          "order online",
          store.city,
        ]
          .filter(Boolean)
          .join(", ")}
        ogImage={store.coverUrl || undefined}
        ogType="website"
      />
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding:
              "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
          }}
        >
          {/* ============ BACK NAV ============ */}
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: "36px",
              direction: dir,
              display: "inline-block",
            }}
          >
            <Link
              to="/stores"
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
              <span>
                {t("common.back") || (isRTL ? "جميع المتاجر" : "All Stores")}
              </span>
            </Link>
          </nav>

          {/* ============ HERO ============ */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile || isTablet ? "column" : "row",
              gap: "clamp(32px, 6vw, 80px)",
              alignItems: "flex-start",
              marginBottom: "clamp(40px, 6vw, 60px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Visual / placeholder */}
            <div
              style={{
                flex: 1,
                width: isMobile || isTablet ? "100%" : "50%",
                maxWidth: isMobile || isTablet ? "100%" : "600px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/11",
                  borderRadius: "clamp(20px, 3vw, 28px)",
                  overflow: "hidden",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "2px solid rgba(0,0,0,0.06)",
                  boxShadow: darkMode
                    ? "0 28px 70px rgba(0,0,0,0.7), 0 12px 32px rgba(0,0,0,0.45), 0 0 80px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 24px 60px rgba(0,0,0,0.12)",
                  background: darkMode
                    ? "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)"
                    : "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                }}
              >
                {store.coverUrl ? (
                  <img
                    src={store.coverUrl}
                    alt={storeName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(80px, 12vw, 120px)",
                        height: "clamp(80px, 12vw, 120px)",
                        borderRadius: "clamp(20px, 3vw, 28px)",
                        background: darkMode
                          ? "radial-gradient(circle, rgba(34,197,94,0.20) 0%, rgba(34,197,94,0.06) 100%)"
                          : "rgba(34,197,94,0.08)",
                        border: darkMode
                          ? "1px solid rgba(34,197,94,0.28)"
                          : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: darkMode
                          ? "0 8px 32px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.12)"
                          : "none",
                      }}
                    >
                      <Store
                        size={isMobile ? 48 : 64}
                        style={{
                          color: darkMode
                            ? "rgba(74,222,128,0.55)"
                            : "rgba(5,150,105,0.3)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Dark-mode: gradient border overlay (1px ring via mask trick) */}
                {darkMode && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      padding: "1px",
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.45) 0%, rgba(255,255,255,0.16) 35%, rgba(255,255,255,0.06) 65%, rgba(59,130,246,0.35) 100%)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  />
                )}

                {/* Dark-mode: bottom depth gradient */}
                {darkMode && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Dark-mode: top glass highlight */}
                {darkMode && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "15%",
                      right: "15%",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                      zIndex: 4,
                    }}
                  />
                )}

                {/* Status badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(12px, 2vw, 16px)",
                    [isRTL ? "left" : "right"]: "clamp(12px, 2vw, 16px)",
                    padding: "clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px)",
                    borderRadius: "100px",
                    background: darkMode
                      ? isOpen
                        ? "linear-gradient(135deg, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.10) 100%)"
                        : "linear-gradient(135deg, rgba(239,68,68,0.25) 0%, rgba(239,68,68,0.10) 100%)"
                      : isOpen
                        ? c.openBg
                        : c.closedBg,
                    border: darkMode
                      ? `1px solid ${
                          isOpen
                            ? "rgba(74,222,128,0.42)"
                            : "rgba(248,113,113,0.42)"
                        }`
                      : `1px solid ${isOpen ? c.openBorder : c.closedBorder}`,
                    color: isOpen ? c.openText : c.closedText,
                    fontSize: "clamp(11px, 1.3vw, 12px)",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backdropFilter: darkMode
                      ? "blur(24px) saturate(180%)"
                      : "blur(12px)",
                    WebkitBackdropFilter: darkMode
                      ? "blur(24px) saturate(180%)"
                      : "blur(12px)",
                    boxShadow: darkMode
                      ? `0 10px 28px rgba(0,0,0,0.45), 0 0 22px ${
                          isOpen
                            ? "rgba(34,197,94,0.20)"
                            : "rgba(239,68,68,0.20)"
                        }, inset 0 1px 0 rgba(255,255,255,0.22)`
                      : "none",
                    zIndex: 5,
                    direction: dir,
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: isOpen ? c.openText : c.closedText,
                      boxShadow: darkMode
                        ? `0 0 10px ${isOpen ? c.openText : c.closedText}`
                        : "none",
                    }}
                  />
                  {isOpen
                    ? isRTL
                      ? "مفتوح الآن"
                      : "Open Now"
                    : isRTL
                      ? "مغلق الآن"
                      : "Closed Now"}
                </div>

                {/* Rating badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(12px, 2vw, 16px)",
                    [isRTL ? "right" : "left"]: "clamp(12px, 2vw, 16px)",
                    padding: "clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px)",
                    borderRadius: "100px",
                    background: darkMode
                      ? "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)"
                      : "rgba(255,255,255,0.9)",
                    backdropFilter: darkMode
                      ? "blur(24px) saturate(180%)"
                      : "blur(20px)",
                    WebkitBackdropFilter: darkMode
                      ? "blur(24px) saturate(180%)"
                      : "blur(20px)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.22)"
                      : "1px solid rgba(255,255,255,0.5)",
                    boxShadow: darkMode
                      ? "0 10px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)"
                      : "0 8px 24px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 5,
                    direction: dir,
                  }}
                >
                  {hasRating ? (
                    <>
                      <Star
                        size={14}
                        fill="#f59e0b"
                        color="#f59e0b"
                        style={
                          darkMode
                            ? {
                                filter:
                                  "drop-shadow(0 0 4px rgba(245,158,11,0.65))",
                              }
                            : undefined
                        }
                      />
                      <span
                        style={{
                          fontSize: "clamp(12px, 1.4vw, 13px)",
                          fontWeight: 700,
                          color: darkMode ? "#fafafa" : c.textStrong,
                        }}
                      >
                        {(store.rating || 0).toFixed(1)}
                      </span>
                      {store.ratingCount > 0 && (
                        <span
                          style={{
                            fontSize: "clamp(10px, 1.2vw, 11px)",
                            fontWeight: 500,
                            color: darkMode
                              ? "rgba(255,255,255,0.65)"
                              : c.textMuted,
                          }}
                        >
                          ({store.ratingCount})
                        </span>
                      )}
                    </>
                  ) : (
                    <span
                      style={{
                        fontSize: "clamp(10px, 1.2vw, 11px)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        color: darkMode ? "#fafafa" : c.textStrong,
                      }}
                    >
                      {isRTL ? "جديد" : "NEW"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div style={{ flex: 1, direction: dir }}>
              {/* Store type chips */}
              {storeTypeChips.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  {storeTypeChips.map((label, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "5px 12px",
                        borderRadius: "100px",
                        background: c.badgeBg,
                        border: `1px solid ${c.badgeBorder}`,
                        color: ACCENT,
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      <Store size={11} />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  color: c.textStrong,
                  letterSpacing: isRTL ? "0" : "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "clamp(10px, 1.5vw, 16px)",
                }}
              >
                {storeName}
              </h1>

              {storeDescription && (
                <p
                  style={{
                    fontSize: "clamp(14px, 1.7vw, 16px)",
                    color: c.textMuted,
                    lineHeight: 1.75,
                    marginBottom: "clamp(24px, 3vw, 28px)",
                  }}
                >
                  {storeDescription}
                </p>
              )}

              {/* Info cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "clamp(10px, 1.6vw, 14px)",
                  marginBottom: "clamp(24px, 3vw, 28px)",
                }}
              >
                {/* Delivery Time */}
                <div
                  style={{
                    ...glassStyle,
                    padding: "clamp(12px, 2vw, 16px)",
                    borderRadius: "clamp(12px, 2vw, 16px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px, 1.4vw, 12px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(34px, 4.5vw, 40px)",
                      height: "clamp(34px, 4.5vw, 40px)",
                      borderRadius: "clamp(9px, 1.4vw, 12px)",
                      background: darkMode
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(34,197,94,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={isMobile ? 16 : 18} color={ACCENT} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "clamp(9px, 1.1vw, 10px)",
                        color: c.textFaint,
                        marginBottom: "1px",
                      }}
                    >
                      {isRTL ? "وقت التحضير" : "Prep Time"}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 15px)",
                        fontWeight: 700,
                        color: c.text,
                      }}
                    >
                      {store.estimatedPreparationMinutes
                        ? `${store.estimatedPreparationMinutes} ${
                            isRTL ? "د" : "min"
                          }`
                        : isRTL
                          ? "20-30 د"
                          : "20-30 min"}
                    </div>
                  </div>
                </div>

                {/* Delivery Fee */}
                <div
                  style={{
                    ...glassStyle,
                    padding: "clamp(12px, 2vw, 16px)",
                    borderRadius: "clamp(12px, 2vw, 16px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px, 1.4vw, 12px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(34px, 4.5vw, 40px)",
                      height: "clamp(34px, 4.5vw, 40px)",
                      borderRadius: "clamp(9px, 1.4vw, 12px)",
                      background: darkMode
                        ? "rgba(245,158,11,0.15)"
                        : "rgba(245,158,11,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ShoppingBag size={isMobile ? 16 : 18} color="#f59e0b" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "clamp(9px, 1.1vw, 10px)",
                        color: c.textFaint,
                        marginBottom: "1px",
                      }}
                    >
                      {isRTL ? "رسوم التوصيل" : "Delivery Fee"}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 15px)",
                        fontWeight: 700,
                        color: c.text,
                      }}
                    >
                      {deliveryFee > 0
                        ? `${deliveryFee} ${isRTL ? "ج.م" : "EGP"}`
                        : isRTL
                          ? "مجاناً"
                          : "Free"}
                    </div>
                  </div>
                </div>

                {/* Min Order (only if > 0) */}
                {minOrder > 0 && (
                  <div
                    style={{
                      ...glassStyle,
                      padding: "clamp(12px, 2vw, 16px)",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px, 1.4vw, 12px)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(34px, 4.5vw, 40px)",
                        height: "clamp(34px, 4.5vw, 40px)",
                        borderRadius: "clamp(9px, 1.4vw, 12px)",
                        background: darkMode
                          ? "rgba(168,85,247,0.15)"
                          : "rgba(168,85,247,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Receipt size={isMobile ? 16 : 18} color="#a855f7" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.1vw, 10px)",
                          color: c.textFaint,
                          marginBottom: "1px",
                        }}
                      >
                        {isRTL ? "الحد الأدنى" : "Min Order"}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(13px, 1.5vw, 15px)",
                          fontWeight: 700,
                          color: c.text,
                        }}
                      >
                        {minOrder} {isRTL ? "ج.م" : "EGP"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Distance (only if > 0) */}
                {distanceLabel && (
                  <div
                    style={{
                      ...glassStyle,
                      padding: "clamp(12px, 2vw, 16px)",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px, 1.4vw, 12px)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(34px, 4.5vw, 40px)",
                        height: "clamp(34px, 4.5vw, 40px)",
                        borderRadius: "clamp(9px, 1.4vw, 12px)",
                        background: darkMode
                          ? "rgba(6,182,212,0.15)"
                          : "rgba(6,182,212,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Navigation size={isMobile ? 16 : 18} color="#06b6d4" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.1vw, 10px)",
                          color: c.textFaint,
                          marginBottom: "1px",
                        }}
                      >
                        {isRTL ? "المسافة" : "Distance"}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(13px, 1.5vw, 15px)",
                          fontWeight: 700,
                          color: c.text,
                        }}
                      >
                        {distanceLabel}
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {store.city && (
                  <div
                    style={{
                      ...glassStyle,
                      padding: "clamp(12px, 2vw, 16px)",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px, 1.4vw, 12px)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(34px, 4.5vw, 40px)",
                        height: "clamp(34px, 4.5vw, 40px)",
                        borderRadius: "clamp(9px, 1.4vw, 12px)",
                        background: darkMode
                          ? "rgba(59,130,246,0.15)"
                          : "rgba(59,130,246,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={isMobile ? 16 : 18} color="#3b82f6" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.1vw, 10px)",
                          color: c.textFaint,
                          marginBottom: "1px",
                        }}
                      >
                        {isRTL ? "الموقع" : "Location"}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(13px, 1.5vw, 15px)",
                          fontWeight: 700,
                          color: c.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {store.city}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hours (only if set) */}
                {hoursLabel && (
                  <div
                    style={{
                      ...glassStyle,
                      padding: "clamp(12px, 2vw, 16px)",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(8px, 1.4vw, 12px)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(34px, 4.5vw, 40px)",
                        height: "clamp(34px, 4.5vw, 40px)",
                        borderRadius: "clamp(9px, 1.4vw, 12px)",
                        background: darkMode
                          ? "rgba(99,102,241,0.15)"
                          : "rgba(99,102,241,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={isMobile ? 16 : 18} color="#6366f1" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "clamp(9px, 1.1vw, 10px)",
                          color: c.textFaint,
                          marginBottom: "1px",
                        }}
                      >
                        {isRTL ? "ساعات العمل" : "Hours"}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(13px, 1.5vw, 15px)",
                          fontWeight: 700,
                          color: c.text,
                        }}
                      >
                        {hoursLabel}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============ MENU CATEGORIES (only when non-empty) ============ */}
          {menuCategories.length > 0 && (
            <div
              style={{
                marginBottom: "clamp(40px, 5vw, 56px)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s ease 0.15s",
                direction: dir,
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(20px, 2.8vw, 26px)",
                  fontWeight: 800,
                  color: c.textStrong,
                  letterSpacing: isRTL ? "0" : "-0.02em",
                  marginBottom: "clamp(16px, 2vw, 20px)",
                }}
              >
                {isRTL ? "الفئات" : "Categories"}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "clamp(10px, 1.6vw, 14px)",
                }}
              >
                {menuCategories.map((cat, i) => {
                  const label = localizedLabel(cat, isRTL);
                  if (!label) return null;
                  return (
                    <div
                      key={cat.id || i}
                      style={{
                        ...glassStyle,
                        padding: "clamp(14px, 2vw, 18px)",
                        borderRadius: "clamp(12px, 2vw, 16px)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: c.badgeBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Receipt size={16} color={ACCENT} />
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: c.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============ DOWNLOAD CTA BANNER ============ */}
          <div
            style={{
              ...glassStyle,
              borderRadius: "clamp(20px, 3vw, 28px)",
              padding: "clamp(24px, 4vw, 32px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "clamp(16px, 3vw, 28px)",
              flexWrap: "wrap",
              direction: dir,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(14px, 2vw, 18px)",
                flex: "1 1 280px",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "clamp(52px, 6vw, 60px)",
                  height: "clamp(52px, 6vw, 60px)",
                  borderRadius: "clamp(14px, 2vw, 16px)",
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #16a34a 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 8px 24px ${
                    darkMode ? "rgba(34,197,94,0.35)" : "rgba(34,197,94,0.25)"
                  }`,
                }}
              >
                <Download size={26} color="#ffffff" />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: "clamp(15px, 2vw, 18px)",
                    fontWeight: 700,
                    color: c.text,
                    margin: 0,
                    marginBottom: "4px",
                  }}
                >
                  {isRTL ? `اطلب من ${storeName}` : `Order from ${storeName}`}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(12px, 1.4vw, 13px)",
                    color: c.textMuted,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {isRTL
                    ? "حمّل تطبيق تمام واستمتع بتوصيل أسرع وعروض حصرية"
                    : "Download the Tamam app for faster delivery and exclusive offers"}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              {/* App Store */}
              <a
                href={APP_DOWNLOAD.ios}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  minWidth: "150px",
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
                    width: "18px",
                    height: "20px",
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
                      fontSize: "10px",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                    }}
                  >
                    {isRTL ? "حمّل من" : "Download on the"}
                  </span>
                  <span
                    style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1 }}
                  >
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href={APP_DOWNLOAD.android}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  minWidth: "150px",
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
                  style={{ width: "24px", height: "15px", flexShrink: 0 }}
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
                      fontSize: "10px",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                    }}
                  >
                    {isRTL ? "حمّل من" : "GET IT ON"}
                  </span>
                  <span
                    style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1 }}
                  >
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      </div>
    </>
  );
};

export default StoreDetail;
