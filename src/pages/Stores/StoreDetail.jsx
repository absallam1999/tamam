import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Star,
  MapPin,
  Clock,
  Store,
  ArrowLeft,
  ArrowRight,
  Phone,
  Globe,
  ShoppingBag,
  Package,
  UtensilsCrossed,
  Pill,
  Zap,
  Shield,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { apiClient } from "../../lib/api-client";

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
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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
        setStore(response.data);
      } catch (err) {
        setError(err.message || "Failed to load store");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStore();
  }, [id]);

  const dir = isRTL ? "rtl" : "ltr";

  // Glassmorphism base style
  const glassStyle = {
    background: darkMode ? "rgba(24, 24, 27, 0.6)" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: darkMode
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: darkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
      : "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
  };

  // Loading Skeleton
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
          {/* Back Button Skeleton */}
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

          {/* Hero Skeleton */}
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
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  // Error State
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
            {/* Icon Container */}
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

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 28px)",
                fontWeight: 800,
                color: darkMode ? "#f4f4f5" : "#18181b",
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

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(13px, 1.6vw, 15px)",
                color: darkMode ? "#a1a1aa" : "#52525b",
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

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(10px, 1.5vw, 14px)",
                flexWrap: "wrap",
              }}
            >
              {/* Primary Action - Browse Stores */}
              <Link
                to="/"
                style={{
                  ...glassStyle,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                  borderRadius: "clamp(12px, 2vw, 14px)",
                  color: darkMode ? "#f4f4f5" : "#18181b",
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
                  e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                }}
              >
                {isRTL ? (
                  <ArrowRight size={isMobile ? 14 : 16} />
                ) : (
                  <ArrowLeft size={isMobile ? 14 : 16} />
                )}
                <span>{isRTL ? "الرئيسية" : "Home"}</span>
              </Link>

              {/* Secondary Action - Go Home */}
              <Link
                to="/stores"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                  borderRadius: "clamp(12px, 2vw, 14px)",
                  backgroundColor: "var(--accent-500)",
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
                <Store size={isMobile ? 16 : 18} />
                <span>{isRTL ? "تصفح المتاجر" : "Browse Stores"}</span>
                {isRTL ? (
                  <ArrowLeft size={isMobile ? 14 : 16} />
                ) : (
                  <ArrowRight size={isMobile ? 14 : 16} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const storeName = isRTL ? store.nameAr : store.nameEn;
  const storeDescription = isRTL
    ? store.descriptionAr || ""
    : store.descriptionEn || "";

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
        {/* Back Navigation */}
        <Link
          to="/stores"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(6px, 1vw, 8px)",
            color: darkMode ? "#a1a1aa" : "#71717a",
            textDecoration: "none",
            fontSize: "clamp(13px, 1.5vw, 14px)",
            fontWeight: 500,
            marginBottom: "clamp(28px, 4vw, 40px)",
            transition: "color 0.2s ease",
            direction: dir,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--accent-500)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = darkMode ? "#a1a1aa" : "#71717a")
          }
        >
          {isRTL ? (
            <ArrowRight size={isMobile ? 14 : 16} />
          ) : (
            <ArrowLeft size={isMobile ? 14 : 16} />
          )}
          <span>{isRTL ? "العودة للمتاجر" : "Back to Stores"}</span>
        </Link>

        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile || isTablet ? "column" : "row",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "flex-start",
            marginBottom: "clamp(48px, 8vw, 72px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Store Cover Image */}
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
                width: "100%",
                aspectRatio: "16/11",
                borderRadius: "clamp(20px, 3vw, 28px)",
                overflow: "hidden",
                border: darkMode
                  ? "2px solid rgba(255,255,255,0.08)"
                  : "2px solid rgba(0,0,0,0.06)",
                boxShadow: darkMode
                  ? "0 24px 60px rgba(0,0,0,0.6)"
                  : "0 24px 60px rgba(0,0,0,0.12)",
                position: "relative",
                background: darkMode
                  ? "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)"
                  : "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
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
                    flexDirection: "column",
                    gap: "clamp(8px, 1vw, 12px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(80px, 12vw, 120px)",
                      height: "clamp(80px, 12vw, 120px)",
                      borderRadius: "clamp(20px, 3vw, 28px)",
                      background: darkMode
                        ? "rgba(34,197,94,0.1)"
                        : "rgba(34,197,94,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <Store
                      size={isMobile ? 48 : 64}
                      style={{
                        color: darkMode ? "#3f3f46" : "rgba(5,150,105,0.3)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Glass Overlay Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Rating Badge */}
              {store.rating > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(12px, 2vw, 16px)",
                    [isRTL ? "left" : "right"]: "clamp(12px, 2vw, 16px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "clamp(7px, 1.2vw, 10px) clamp(14px, 2.2vw, 20px)",
                    borderRadius: "100px",
                    background: darkMode
                      ? "rgba(0,0,0,0.65)"
                      : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(20px)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(255,255,255,0.5)",
                    boxShadow: darkMode
                      ? "0 8px 24px rgba(0,0,0,0.4)"
                      : "0 8px 24px rgba(0,0,0,0.1)",
                    zIndex: 2,
                  }}
                >
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span
                    style={{
                      fontSize: "clamp(13px, 1.5vw, 15px)",
                      fontWeight: 700,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                    }}
                  >
                    {store.rating.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Delivery Time Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(12px, 2vw, 16px)",
                  [isRTL ? "right" : "left"]: "clamp(12px, 2vw, 16px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "clamp(7px, 1.2vw, 10px) clamp(14px, 2.2vw, 20px)",
                  borderRadius: "100px",
                  background: "var(--accent-500)",
                  backdropFilter: "blur(20px)",
                  boxShadow: darkMode
                    ? "0 8px 24px rgba(34,197,94,0.4)"
                    : "0 8px 24px rgba(34,197,94,0.3)",
                  zIndex: 2,
                }}
              >
                <Clock size={14} color="#ffffff" />
                <span
                  style={{
                    fontSize: "clamp(12px, 1.4vw, 13px)",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {store.estimatedPreparationMinutes
                    ? `${store.estimatedPreparationMinutes} ${isRTL ? "دقيقة" : "min"}`
                    : isRTL
                      ? "20-30 دقيقة"
                      : "20-30 min"}
                </span>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div
            style={{
              flex: 1,
              direction: dir,
            }}
          >
            {/* Store Type Badge */}
            {store.type && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "clamp(5px, 0.8vw, 6px) clamp(12px, 1.8vw, 16px)",
                  borderRadius: "100px",
                  backgroundColor: darkMode
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(34,197,94,0.08)",
                  border: darkMode
                    ? "1px solid rgba(34,197,94,0.2)"
                    : "1px solid rgba(34,197,94,0.15)",
                  color: "var(--accent-500)",
                  fontSize: "clamp(11px, 1.3vw, 12px)",
                  fontWeight: 600,
                  marginBottom: "clamp(14px, 2vw, 20px)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Store size={13} style={{ flexShrink: 0 }} />
                <span>
                  {isRTL
                    ? store.typeAr || store.type
                    : store.typeEn || store.type}
                </span>
              </div>
            )}

            <h1
              style={{
                fontSize: "clamp(28px, 5.5vw, 48px)",
                fontWeight: 800,
                color: darkMode ? "#f4f4f5" : "#09090b",
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
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  lineHeight: 1.75,
                  marginBottom: "clamp(24px, 4vw, 32px)",
                }}
              >
                {storeDescription}
              </p>
            )}

            {/* Quick Info Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "clamp(10px, 1.8vw, 14px)",
                marginBottom: "clamp(24px, 4vw, 32px)",
              }}
            >
              {/* Delivery Time Card */}
              <div
                style={{
                  ...glassStyle,
                  padding: "clamp(14px, 2.2vw, 18px)",
                  borderRadius: "clamp(14px, 2.2vw, 18px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(10px, 1.5vw, 14px)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 16px 40px rgba(0,0,0,0.4)"
                    : "0 16px 40px rgba(0,0,0,0.08)";
                  e.currentTarget.style.background = darkMode
                    ? "rgba(24, 24, 27, 0.8)"
                    : "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  e.currentTarget.style.background = glassStyle.background;
                }}
              >
                <div
                  style={{
                    width: "clamp(36px, 5vw, 44px)",
                    height: "clamp(36px, 5vw, 44px)",
                    borderRadius: "clamp(10px, 1.5vw, 14px)",
                    background: darkMode
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(34,197,94,0.1)",
                    border: darkMode
                      ? "1px solid rgba(34,197,94,0.25)"
                      : "1px solid rgba(34,197,94,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={isMobile ? 18 : 20} color="var(--accent-500)" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "clamp(10px, 1.2vw, 11px)",
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      marginBottom: "2px",
                    }}
                  >
                    {isRTL ? "وقت التوصيل" : "Delivery Time"}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(14px, 1.6vw, 16px)",
                      fontWeight: 700,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                    }}
                  >
                    {store.estimatedPreparationMinutes
                      ? `${store.estimatedPreparationMinutes} ${isRTL ? "دقيقة" : "min"}`
                      : isRTL
                        ? "20-30 دقيقة"
                        : "20-30 min"}
                  </div>
                </div>
              </div>

              {/* Delivery Fee Card */}
              <div
                style={{
                  ...glassStyle,
                  padding: "clamp(14px, 2.2vw, 18px)",
                  borderRadius: "clamp(14px, 2.2vw, 18px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(10px, 1.5vw, 14px)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 16px 40px rgba(0,0,0,0.4)"
                    : "0 16px 40px rgba(0,0,0,0.08)";
                  e.currentTarget.style.background = darkMode
                    ? "rgba(24, 24, 27, 0.8)"
                    : "rgba(255, 255, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  e.currentTarget.style.background = glassStyle.background;
                }}
              >
                <div
                  style={{
                    width: "clamp(36px, 5vw, 44px)",
                    height: "clamp(36px, 5vw, 44px)",
                    borderRadius: "clamp(10px, 1.5vw, 14px)",
                    background: darkMode
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(245,158,11,0.1)",
                    border: darkMode
                      ? "1px solid rgba(245,158,11,0.25)"
                      : "1px solid rgba(245,158,11,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShoppingBag size={isMobile ? 18 : 20} color="#f59e0b" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "clamp(10px, 1.2vw, 11px)",
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      marginBottom: "2px",
                    }}
                  >
                    {isRTL ? "رسوم التوصيل" : "Delivery Fee"}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(14px, 1.6vw, 16px)",
                      fontWeight: 700,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                    }}
                  >
                    {store.deliveryFee > 0
                      ? `${store.deliveryFee} ${isRTL ? "ج.م" : "EGP"}`
                      : isRTL
                        ? "مجاناً"
                        : "Free"}
                  </div>
                </div>
              </div>

              {/* Location Card */}
              {store.city && (
                <div
                  style={{
                    ...glassStyle,
                    padding: "clamp(14px, 2.2vw, 18px)",
                    borderRadius: "clamp(14px, 2.2vw, 18px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(10px, 1.5vw, 14px)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 16px 40px rgba(0,0,0,0.4)"
                      : "0 16px 40px rgba(0,0,0,0.08)";
                    e.currentTarget.style.background = darkMode
                      ? "rgba(24, 24, 27, 0.8)"
                      : "rgba(255, 255, 255, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                    e.currentTarget.style.background = glassStyle.background;
                  }}
                >
                  <div
                    style={{
                      width: "clamp(36px, 5vw, 44px)",
                      height: "clamp(36px, 5vw, 44px)",
                      borderRadius: "clamp(10px, 1.5vw, 14px)",
                      background: darkMode
                        ? "rgba(59,130,246,0.15)"
                        : "rgba(59,130,246,0.1)",
                      border: darkMode
                        ? "1px solid rgba(59,130,246,0.25)"
                        : "1px solid rgba(59,130,246,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={isMobile ? 18 : 20} color="#3b82f6" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "clamp(10px, 1.2vw, 11px)",
                        color: darkMode ? "#71717a" : "#a1a1aa",
                        marginBottom: "2px",
                      }}
                    >
                      {isRTL ? "الموقع" : "Location"}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(14px, 1.6vw, 16px)",
                        fontWeight: 700,
                        color: darkMode ? "#f4f4f5" : "#18181b",
                      }}
                    >
                      {store.city}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "clamp(10px, 1.5vw, 14px)",
                flexWrap: "wrap",
              }}
            >
              {store.websiteUrl && (
                <a
                  href={store.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "clamp(8px, 1.2vw, 10px)",
                    padding:
                      "clamp(12px, 1.8vw, 16px) clamp(22px, 3.5vw, 32px)",
                    borderRadius: "clamp(14px, 2vw, 16px)",
                    backgroundColor: "var(--accent-500)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "clamp(14px, 1.6vw, 15px)",
                    fontWeight: 600,
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    flex: isMobile ? "1 1 auto" : "0 0 auto",
                    justifyContent: "center",
                    boxShadow: darkMode
                      ? "0 8px 24px rgba(34,197,94,0.35)"
                      : "0 8px 24px rgba(34,197,94,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 16px 36px rgba(34,197,94,0.5)"
                      : "0 16px 36px rgba(34,197,94,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 8px 24px rgba(34,197,94,0.35)"
                      : "0 8px 24px rgba(34,197,94,0.25)";
                  }}
                >
                  <ExternalLink size={isMobile ? 17 : 18} />
                  <span>{isRTL ? "زيارة الموقع" : "Visit Website"}</span>
                </a>
              )}

              {store.phoneNumber && (
                <a
                  href={`tel:${store.phoneNumber}`}
                  style={{
                    ...glassStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "clamp(8px, 1.2vw, 10px)",
                    padding:
                      "clamp(12px, 1.8vw, 16px) clamp(22px, 3.5vw, 32px)",
                    borderRadius: "clamp(14px, 2vw, 16px)",
                    color: darkMode ? "#f4f4f5" : "#18181b",
                    textDecoration: "none",
                    fontSize: "clamp(14px, 1.6vw, 15px)",
                    fontWeight: 600,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    flex: isMobile ? "1 1 auto" : "0 0 auto",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 16px 40px rgba(0,0,0,0.3)"
                      : "0 16px 40px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = glassStyle.background;
                    e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  }}
                >
                  <Phone
                    size={isMobile ? 17 : 18}
                    style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                  />
                  <span>{isRTL ? "اتصل بنا" : "Call Us"}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        {store.address && (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            <div
              style={{
                ...glassStyle,
                padding: "clamp(24px, 4vw, 32px)",
                borderRadius: "clamp(20px, 3vw, 28px)",
                direction: dir,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode
                  ? "rgba(24, 24, 27, 0.8)"
                  : "rgba(255, 255, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = glassStyle.background;
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(17px, 2.2vw, 20px)",
                  fontWeight: 700,
                  color: darkMode ? "#f4f4f5" : "#18181b",
                  marginBottom: "clamp(10px, 1.5vw, 14px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "clamp(32px, 4vw, 36px)",
                    height: "clamp(32px, 4vw, 36px)",
                    borderRadius: "clamp(8px, 1vw, 10px)",
                    background: darkMode
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(34,197,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={18} color="var(--accent-500)" />
                </div>
                {isRTL ? "العنوان" : "Address"}
              </h3>
              <p
                style={{
                  fontSize: "clamp(14px, 1.6vw, 15px)",
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  lineHeight: 1.7,
                  margin: 0,
                  paddingLeft: isRTL ? "0" : "clamp(42px, 5vw, 46px)",
                  paddingRight: isRTL ? "clamp(42px, 5vw, 46px)" : "0",
                }}
              >
                {store.address}
              </p>
            </div>
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

export default StoreDetail;
