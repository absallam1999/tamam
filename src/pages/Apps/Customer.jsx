import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin,
  CreditCard,
  Bell,
  ShoppingBag,
  Clock,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useTranslation } from "react-i18next";

const CustomerAppPage = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  const dir = isRTL ? "rtl" : "ltr";

  const features = [
    { icon: MapPin, key: "tracking" },
    { icon: CreditCard, key: "payments" },
    { icon: Bell, key: "notifications" },
    { icon: ShoppingBag, key: "selection" },
    { icon: Clock, key: "history" },
    { icon: Heart, key: "favorites" },
  ];

  const highlights = [
    t("customerApp.highlights.tracking"),
    t("customerApp.highlights.payments"),
    t("customerApp.highlights.reviews"),
    t("customerApp.highlights.fastDelivery"),
    t("customerApp.highlights.support"),
  ];

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
          to="/apps"
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
          <span>{t("customerApp.backToApps")}</span>
        </Link>

        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile || isTablet ? "column" : "row",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
            marginBottom: "clamp(60px, 10vw, 100px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* App Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              direction: dir,
              flex: 1,
            }}
          >
            {/* App Icon */}
            <div
              style={{
                width: "clamp(72px, 10vw, 100px)",
                height: "clamp(72px, 10vw, 100px)",
                borderRadius: "clamp(18px, 2.5vw, 24px)",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: darkMode
                  ? "0 12px 36px rgba(34,197,94,0.35)"
                  : "0 12px 36px rgba(34,197,94,0.2)",
                marginBottom: "clamp(16px, 2.5vw, 20px)",
                position: "relative",
                flexShrink: 0,
                marginLeft: isRTL ? "auto" : "0",
                marginRight: isRTL ? "0" : "auto",
              }}
            >
              <Smartphone size={isMobile ? 34 : 46} color="#ffffff" />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "clamp(18px, 2.5vw, 24px)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(4px, 0.8vw, 6px)",
                padding: "clamp(4px, 0.6vw, 5px) clamp(10px, 1.5vw, 14px)",
                borderRadius: "100px",
                backgroundColor: darkMode
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(34,197,94,0.08)",
                color: "var(--accent-500)",
                fontSize: "clamp(10px, 1.2vw, 11px)",
                fontWeight: 600,
                letterSpacing: isRTL ? "0" : "-0.01em",
                marginBottom: "clamp(12px, 2vw, 16px)",
                marginLeft: isRTL ? "auto" : "0",
                marginRight: isRTL ? "0" : "auto",
              }}
            >
              <Smartphone size={isMobile ? 11 : 12} style={{ flexShrink: 0 }} />
              <span>{t("customerApp.hero.badge")}</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 44px)",
                fontWeight: 800,
                color: darkMode ? "#f4f4f5" : "#09090b",
                letterSpacing: isRTL ? "0" : "-0.02em",
                lineHeight: 1.15,
                marginBottom: "clamp(6px, 1vw, 8px)",
              }}
            >
              {t("customerApp.hero.seoTitle")}
            </h1>

            <p
              style={{
                fontSize: "clamp(14px, 1.8vw, 16px)",
                color: darkMode ? "#a1a1aa" : "#52525b",
                lineHeight: 1.65,
                marginBottom: "clamp(16px, 2.5vw, 20px)",
                maxWidth: "460px",
              }}
            >
              {t("customerApp.hero.description")}
            </p>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(6px, 1vw, 8px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={isMobile ? 13 : 15}
                    fill="var(--accent-500)"
                    color="var(--accent-500)"
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "clamp(13px, 1.5vw, 14px)",
                  fontWeight: 700,
                  color: darkMode ? "#f4f4f5" : "#18181b",
                }}
              >
                4.9
              </span>
              <span
                style={{
                  fontSize: "clamp(11px, 1.3vw, 13px)",
                  color: darkMode ? "#71717a" : "#a1a1aa",
                }}
              >
                {t("customerApp.hero.ratingText")}
              </span>
            </div>

            {/* Highlights */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px, 1vw, 8px)",
                marginBottom: "clamp(20px, 3vw, 28px)",
                width: "100%",
              }}
            >
              {highlights.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(8px, 1vw, 10px)",
                  }}
                >
                  <CheckCircle2
                    size={isMobile ? 13 : 15}
                    color="var(--accent-500)"
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 13px)",
                      color: darkMode ? "#d4d4d8" : "#3f3f46",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div
              style={{
                display: "flex",
                gap: "clamp(10px, 1.5vw, 14px)",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {/* App Store */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(9px, 1.2vw, 11px) clamp(16px, 2.5vw, 22px)",
                  borderRadius: "clamp(12px, 1.8vw, 14px)",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  flex: isMobile ? "1 1 auto" : "0 0 auto",
                  minWidth: "clamp(130px, 30vw, 160px)",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 12px 28px rgba(0,0,0,0.12)"
                      : "0 12px 28px rgba(0,0,0,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  style={{
                    width: "clamp(16px, 2vw, 20px)",
                    height: "clamp(18px, 2.2vw, 22px)",
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
                      fontSize: "clamp(8px, 1vw, 10px)",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                      letterSpacing: isRTL ? "0" : "0.02em",
                    }}
                  >
                    {t("customerApp.hero.downloadAppStore")}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(13px, 1.8vw, 15px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: isRTL ? "0" : "-0.01em",
                    }}
                  >
                    {t("customerApp.hero.appStore")}
                  </span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(9px, 1.2vw, 11px) clamp(16px, 2.5vw, 22px)",
                  borderRadius: "clamp(12px, 1.8vw, 14px)",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  flex: isMobile ? "1 1 auto" : "0 0 auto",
                  minWidth: "clamp(130px, 30vw, 160px)",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 12px 28px rgba(0,0,0,0.12)"
                      : "0 12px 28px rgba(0,0,0,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png"
                  alt="Google Play"
                  style={{
                    width: "clamp(24px, 3vw, 30px)",
                    height: "clamp(14px, 1.8vw, 18px)",
                    flexShrink: 0,
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
                      fontSize: "clamp(8px, 1vw, 10px)",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                      letterSpacing: isRTL ? "0" : "0.02em",
                    }}
                  >
                    {t("customerApp.hero.getItOn")}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(13px, 1.8vw, 15px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: isRTL ? "0" : "-0.01em",
                    }}
                  >
                    {t("customerApp.hero.googlePlay")}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Screenshots - Below info on mobile/tablet, beside on desktop */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile
                ? "clamp(4px, 2vw, 6px)"
                : "clamp(8px, 1.5vw, 12px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
              transition: "all 0.8s ease",
              transitionDelay: "0.2s",
              perspective: "1000px",
              marginTop: isMobile || isTablet ? "clamp(24px, 4vw, 40px)" : 0,
              flex: isMobile || isTablet ? "0 0 auto" : 1,
              width: isMobile || isTablet ? "100%" : "auto",
            }}
          >
            {/* Side Screenshot - Left */}
            <div
              style={{
                width: isMobile
                  ? "clamp(80px, 25vw, 100px)"
                  : isTablet
                    ? "clamp(100px, 18vw, 130px)"
                    : "clamp(110px, 15vw, 150px)",
                aspectRatio: "1 / 2.1",
                borderRadius: isMobile
                  ? "clamp(10px, 2vw, 14px)"
                  : "clamp(14px, 2vw, 20px)",
                border: darkMode
                  ? "2px solid rgba(255,255,255,0.08)"
                  : "2px solid rgba(0,0,0,0.08)",
                backgroundColor: darkMode ? "#18181b" : "#ffffff",
                padding: isMobile
                  ? "clamp(3px, 1vw, 4px)"
                  : "clamp(4px, 0.8vw, 6px)",
                overflow: "hidden",
                boxShadow: darkMode
                  ? "0 16px 40px rgba(0,0,0,0.4)"
                  : "0 16px 40px rgba(0,0,0,0.08)",
                transform: isMobile
                  ? "rotate(-2deg) translateY(4px)"
                  : "rotate(-3deg) translateY(8px)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "35%",
                  height: isMobile
                    ? "clamp(6px, 1.5vw, 8px)"
                    : "clamp(8px, 1vw, 10px)",
                  backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                  borderRadius: "0 0 6px 6px",
                  margin: "0 auto clamp(3px, 1vw, 6px)",
                }}
              />
              <div
                style={{
                  height: "calc(100% - 16px)",
                  borderRadius: isMobile
                    ? "clamp(8px, 1.5vw, 10px)"
                    : "clamp(10px, 1.5vw, 14px)",
                  background:
                    "linear-gradient(180deg, var(--accent-500) 0%, #15803d 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBag
                    size={isMobile ? 16 : isTablet ? 22 : 28}
                    color="rgba(255,255,255,0.5)"
                  />
                </div>
              </div>
            </div>

            {/* Main Screenshot - Center */}
            <div
              style={{
                width: isMobile
                  ? "clamp(100px, 30vw, 120px)"
                  : isTablet
                    ? "clamp(120px, 22vw, 160px)"
                    : "clamp(140px, 20vw, 190px)",
                aspectRatio: "1 / 2.1",
                borderRadius: isMobile
                  ? "clamp(12px, 2.5vw, 16px)"
                  : "clamp(16px, 2.5vw, 24px)",
                border: darkMode
                  ? "3px solid rgba(255,255,255,0.12)"
                  : "3px solid rgba(0,0,0,0.12)",
                backgroundColor: darkMode ? "#18181b" : "#ffffff",
                padding: isMobile
                  ? "clamp(4px, 1vw, 6px)"
                  : "clamp(6px, 1vw, 8px)",
                overflow: "hidden",
                boxShadow: darkMode
                  ? "0 20px 50px rgba(0,0,0,0.5)"
                  : "0 20px 50px rgba(0,0,0,0.12)",
                flexShrink: 0,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "35%",
                  height: isMobile
                    ? "clamp(8px, 1.5vw, 10px)"
                    : "clamp(10px, 1.2vw, 12px)",
                  backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                  borderRadius: "0 0 8px 8px",
                  margin: "0 auto clamp(4px, 1vw, 8px)",
                }}
              />
              <div
                style={{
                  height: "calc(100% - 20px)",
                  borderRadius: isMobile
                    ? "clamp(8px, 1.8vw, 12px)"
                    : "clamp(12px, 1.8vw, 16px)",
                  background:
                    "linear-gradient(180deg, var(--accent-500) 0%, #15803d 100%)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Smartphone
                    size={isMobile ? 18 : isTablet ? 26 : 32}
                    color="rgba(255,255,255,0.6)"
                  />
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: isMobile
                        ? "clamp(7px, 1.5vw, 8px)"
                        : "clamp(9px, 1vw, 10px)",
                      fontWeight: 600,
                      marginTop: "clamp(4px, 1vw, 8px)",
                    }}
                  >
                    {t("common.brand")}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Screenshot - Right */}
            <div
              style={{
                width: isMobile
                  ? "clamp(80px, 25vw, 100px)"
                  : isTablet
                    ? "clamp(100px, 18vw, 130px)"
                    : "clamp(110px, 15vw, 150px)",
                aspectRatio: "1 / 2.1",
                borderRadius: isMobile
                  ? "clamp(10px, 2vw, 14px)"
                  : "clamp(14px, 2vw, 20px)",
                border: darkMode
                  ? "2px solid rgba(255,255,255,0.08)"
                  : "2px solid rgba(0,0,0,0.08)",
                backgroundColor: darkMode ? "#18181b" : "#ffffff",
                padding: isMobile
                  ? "clamp(3px, 1vw, 4px)"
                  : "clamp(4px, 0.8vw, 6px)",
                overflow: "hidden",
                boxShadow: darkMode
                  ? "0 16px 40px rgba(0,0,0,0.4)"
                  : "0 16px 40px rgba(0,0,0,0.08)",
                transform: isMobile
                  ? "rotate(2deg) translateY(4px)"
                  : "rotate(3deg) translateY(8px)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "35%",
                  height: isMobile
                    ? "clamp(6px, 1.5vw, 8px)"
                    : "clamp(8px, 1vw, 10px)",
                  backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                  borderRadius: "0 0 6px 6px",
                  margin: "0 auto clamp(3px, 1vw, 6px)",
                }}
              />
              <div
                style={{
                  height: "calc(100% - 16px)",
                  borderRadius: isMobile
                    ? "clamp(8px, 1.5vw, 10px)"
                    : "clamp(10px, 1.5vw, 14px)",
                  background:
                    "linear-gradient(180deg, var(--accent-500) 0%, #15803d 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin
                    size={isMobile ? 16 : isTablet ? 22 : 28}
                    color="rgba(255,255,255,0.5)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(22px, 3.5vw, 30px)",
              fontWeight: 700,
              color: darkMode ? "#f4f4f5" : "#18181b",
              marginBottom: "clamp(8px, 1.5vw, 12px)",
              letterSpacing: isRTL ? "0" : "-0.02em",
              padding: "0 16px",
            }}
          >
            {t("customerApp.featuresTitle")}
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "clamp(13px, 1.5vw, 14px)",
              color: darkMode ? "#a1a1aa" : "#71717a",
              margin: "0 auto clamp(32px, 5vw, 48px)",
              maxWidth: "500px",
              padding: "0 16px",
            }}
          >
            {t("customerApp.featuresSubtitle")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(12px, 2vw, 16px)",
              padding: "0 8px",
            }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    padding: "clamp(20px, 3vw, 28px)",
                    borderRadius: "clamp(14px, 2vw, 20px)",
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${0.4 + idx * 0.08}s`,
                    direction: dir,
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = darkMode
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(34,197,94,0.15)";
                      e.currentTarget.style.boxShadow = darkMode
                        ? "0 16px 40px rgba(0,0,0,0.3)"
                        : "0 16px 40px rgba(0,0,0,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = darkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "clamp(38px, 5vw, 44px)",
                      height: "clamp(38px, 5vw, 44px)",
                      borderRadius: "clamp(10px, 1.5vw, 12px)",
                      backgroundColor: darkMode
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(34,197,94,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "clamp(12px, 2vw, 16px)",
                      color: "var(--accent-500)",
                    }}
                  >
                    <Icon size={isMobile ? 18 : 22} />
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(15px, 1.8vw, 16px)",
                      fontWeight: 700,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                      marginBottom: "clamp(6px, 1vw, 8px)",
                    }}
                  >
                    {t(`customerApp.features.${feature.key}.title`)}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 13px)",
                      color: darkMode ? "#a1a1aa" : "#71717a",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t(`customerApp.features.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAppPage;
