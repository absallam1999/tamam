import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowRight,
  ArrowLeft,
  Star,
  Globe,
  MapPin,
  Truck,
  Users,
  BarChart3,
  Activity,
  Settings,
  CheckCircle2,
  ExternalLink,
  Navigation,
  Clock,
  Gauge,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useTranslation } from "react-i18next";

const FleetAppPage = () => {
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
    { icon: Activity, key: "analytics" },
    { icon: Users, key: "management" },
    { icon: Navigation, key: "routes" },
    { icon: Clock, key: "performance" },
    { icon: Settings, key: "settings" },
  ];

  const highlights = [
    t("fleetApp.highlights.tracking"),
    t("fleetApp.highlights.analytics"),
    t("fleetApp.highlights.management"),
    t("fleetApp.highlights.routes"),
    t("fleetApp.highlights.support"),
  ];

  const stats = [
    {
      value: t("fleetApp.stats.vehicles"),
      label: t("fleetApp.stats.vehiclesLabel"),
    },
    {
      value: t("fleetApp.stats.rating"),
      label: t("fleetApp.stats.ratingLabel"),
    },
    {
      value: t("fleetApp.stats.efficiency"),
      label: t("fleetApp.stats.efficiencyLabel"),
    },
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
          <span>{t("fleetApp.backToApps")}</span>
        </Link>

        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile || isTablet ? "column" : "row",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
            marginBottom: isMobile
              ? "clamp(80px, 14vw, 100px)"
              : isTablet
                ? "clamp(70px, 12vw, 90px)"
                : "clamp(60px, 10vw, 100px)",
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
              <LayoutDashboard size={isMobile ? 34 : 46} color="#ffffff" />
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
              <Globe size={isMobile ? 11 : 12} style={{ flexShrink: 0 }} />
              <span>{t("fleetApp.hero.badge")}</span>
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
              {t("fleetApp.hero.title")}
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
              {t("fleetApp.hero.description")}
            </p>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 32px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                flexWrap: "wrap",
              }}
            >
              {stats.map((stat, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      fontWeight: 800,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(10px, 1.2vw, 12px)",
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      marginTop: "4px",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
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

            {/* Access Link Button */}
            <div
              style={{
                display: "flex",
                gap: "clamp(10px, 1.5vw, 14px)",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.2vw, 10px)",
                  padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                  borderRadius: "clamp(12px, 1.8vw, 14px)",
                  backgroundColor: "var(--accent-500)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 1.6vw, 15px)",
                  fontWeight: 600,
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  flex: isMobile ? "1 1 auto" : "0 0 auto",
                  justifyContent: "center",
                  boxShadow: darkMode
                    ? "0 8px 24px rgba(34,197,94,0.3)"
                    : "0 8px 24px rgba(34,197,94,0.2)",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 14px 32px rgba(34,197,94,0.4)"
                      : "0 14px 32px rgba(34,197,94,0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 8px 24px rgba(34,197,94,0.3)"
                      : "0 8px 24px rgba(34,197,94,0.2)";
                  }
                }}
              >
                {t("fleetApp.hero.getStarted")}
                {isRTL ? (
                  <ArrowLeft size={isMobile ? 16 : 18} />
                ) : (
                  <ExternalLink size={isMobile ? 16 : 18} />
                )}
              </a>
            </div>
          </div>

          {/* Screenshots - Dashboard Mockup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
              transition: "all 0.8s ease",
              transitionDelay: "0.2s",
              perspective: "1000px",
              marginTop: isMobile || isTablet ? "clamp(24px, 4vw, 40px)" : 0,
              // REMOVE marginBottom from here
              flex: isMobile || isTablet ? "0 0 auto" : 1,
              width: isMobile || isTablet ? "100%" : "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? "320px" : isTablet ? "420px" : "520px",
                height: isMobile
                  ? "clamp(260px, 65vw, 300px)"
                  : "clamp(320px, 42vw, 400px)",
              }}
            >
              {/* Main Dashboard Screen */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isMobile ? "82%" : "78%",
                  maxWidth: "420px",
                  borderRadius: "clamp(8px, 1.5vw, 12px)",
                  border: darkMode
                    ? "2px solid rgba(255,255,255,0.1)"
                    : "2px solid rgba(0,0,0,0.1)",
                  backgroundColor: darkMode ? "#18181b" : "#ffffff",
                  boxShadow: darkMode
                    ? "0 20px 50px rgba(0,0,0,0.5)"
                    : "0 20px 50px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  zIndex: 3,
                }}
              >
                {/* Browser Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(3px, 0.6vw, 5px)",
                    padding: "clamp(5px, 1vw, 8px) clamp(8px, 1.5vw, 12px)",
                    backgroundColor: darkMode ? "#27272a" : "#f4f4f5",
                    borderBottom: darkMode
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(6px, 0.8vw, 8px)",
                      height: "clamp(6px, 0.8vw, 8px)",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                    }}
                  />
                  <div
                    style={{
                      width: "clamp(6px, 0.8vw, 8px)",
                      height: "clamp(6px, 0.8vw, 8px)",
                      borderRadius: "50%",
                      backgroundColor: "#f59e0b",
                    }}
                  />
                  <div
                    style={{
                      width: "clamp(6px, 0.8vw, 8px)",
                      height: "clamp(6px, 0.8vw, 8px)",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      margin: "0 12px",
                      padding: "clamp(2px, 0.4vw, 3px) clamp(6px, 1vw, 8px)",
                      borderRadius: "4px",
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)",
                      fontSize: "clamp(6px, 0.9vw, 8px)",
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      textAlign: "center",
                    }}
                  >
                    fleet.tamam.com/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div style={{ padding: "clamp(6px, 1vw, 10px)" }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "clamp(6px, 1vw, 10px)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "clamp(10px, 1.2vw, 12px)",
                          fontWeight: 700,
                          color: darkMode ? "#f4f4f5" : "#18181b",
                        }}
                      >
                        {t("fleetApp.dashboard.title")}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(7px, 0.9vw, 8px)",
                          color: darkMode ? "#71717a" : "#a1a1aa",
                        }}
                      >
                        {t("fleetApp.dashboard.activeFleet")}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "clamp(18px, 2.5vw, 24px)",
                        height: "clamp(18px, 2.5vw, 24px)",
                        borderRadius: "clamp(6px, 1vw, 8px)",
                        background: "var(--gradient-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LayoutDashboard size={isMobile ? 10 : 12} color="#fff" />
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "clamp(3px, 0.6vw, 5px)",
                      marginBottom: "clamp(6px, 1vw, 10px)",
                    }}
                  >
                    {[
                      {
                        label: t("fleetApp.dashboard.active"),
                        value: "24",
                        color: "var(--accent-500)",
                        icon: Truck,
                      },
                      {
                        label: t("fleetApp.dashboard.idle"),
                        value: "8",
                        color: "#f59e0b",
                        icon: Clock,
                      },
                      {
                        label: t("fleetApp.dashboard.offline"),
                        value: "3",
                        color: "#ef4444",
                        icon: Activity,
                      },
                    ].map((card, i) => {
                      const CardIcon = card.icon;
                      return (
                        <div
                          key={i}
                          style={{
                            padding: "clamp(4px, 0.7vw, 7px)",
                            borderRadius: "clamp(5px, 0.8vw, 8px)",
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(0,0,0,0.02)",
                            border: darkMode
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid rgba(0,0,0,0.05)",
                          }}
                        >
                          <CardIcon
                            size={isMobile ? 8 : 10}
                            color={card.color}
                            style={{ marginBottom: "clamp(2px, 0.4vw, 4px)" }}
                          />
                          <div
                            style={{
                              fontSize: "clamp(12px, 1.6vw, 16px)",
                              fontWeight: 700,
                              color: card.color,
                            }}
                          >
                            {card.value}
                          </div>
                          <div
                            style={{
                              fontSize: "clamp(5px, 0.7vw, 6px)",
                              color: darkMode ? "#71717a" : "#a1a1aa",
                              marginTop: "1px",
                            }}
                          >
                            {card.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Map Area */}
                  <div
                    style={{
                      padding: "clamp(5px, 0.8vw, 8px)",
                      borderRadius: "clamp(5px, 0.8vw, 8px)",
                      backgroundColor: darkMode
                        ? "rgba(34,197,94,0.05)"
                        : "rgba(34,197,94,0.04)",
                      border: darkMode
                        ? "1px solid rgba(34,197,94,0.1)"
                        : "1px solid rgba(34,197,94,0.08)",
                      marginBottom: "clamp(6px, 1vw, 10px)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(7px, 0.9vw, 8px)",
                        fontWeight: 600,
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        marginBottom: "clamp(4px, 0.6vw, 6px)",
                      }}
                    >
                      {t("fleetApp.dashboard.liveTracking")}
                    </div>
                    {/* Simplified Map */}
                    <div
                      style={{
                        height: "clamp(50px, 8vw, 70px)",
                        borderRadius: "clamp(4px, 0.6vw, 6px)",
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Grid lines */}
                      <svg
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", inset: 0 }}
                      >
                        <defs>
                          <pattern
                            id="grid"
                            width="15%"
                            height="25%"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 20 0 L 0 0 0 20"
                              fill="none"
                              stroke={
                                darkMode
                                  ? "rgba(255,255,255,0.03)"
                                  : "rgba(0,0,0,0.03)"
                              }
                              strokeWidth="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                      {/* Vehicle dots */}
                      {[
                        { x: "20%", y: "30%", color: "var(--accent-500)" },
                        { x: "45%", y: "55%", color: "var(--accent-500)" },
                        { x: "65%", y: "25%", color: "var(--accent-500)" },
                        { x: "35%", y: "70%", color: "#f59e0b" },
                        { x: "75%", y: "60%", color: "var(--accent-500)" },
                        { x: "55%", y: "40%", color: "var(--accent-500)" },
                      ].map((dot, i) => (
                        <div
                          key={i}
                          style={{
                            position: "absolute",
                            left: dot.x,
                            top: dot.y,
                            width: "clamp(4px, 0.8vw, 6px)",
                            height: "clamp(4px, 0.8vw, 6px)",
                            borderRadius: "50%",
                            backgroundColor: dot.color,
                            boxShadow: `0 0 6px ${dot.color}`,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Performance Chart */}
                  <div
                    style={{
                      padding: "clamp(5px, 0.8vw, 8px)",
                      borderRadius: "clamp(5px, 0.8vw, 8px)",
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(0,0,0,0.05)",
                      marginBottom: "clamp(6px, 1vw, 8px)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(7px, 0.9vw, 8px)",
                        fontWeight: 600,
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        marginBottom: "clamp(4px, 0.6vw, 6px)",
                      }}
                    >
                      {t("fleetApp.dashboard.performance")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "clamp(2px, 0.4vw, 4px)",
                        height: "clamp(30px, 4vw, 40px)",
                      }}
                    >
                      {[60, 75, 45, 80, 65, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            borderRadius: "clamp(2px, 0.3vw, 3px)",
                            background:
                              h > 75
                                ? "var(--accent-500)"
                                : h > 50
                                  ? "rgba(34,197,94,0.6)"
                                  : "rgba(34,197,94,0.3)",
                            transition: "height 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "clamp(3px, 0.5vw, 4px)",
                      }}
                    >
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "clamp(5px, 0.6vw, 6px)",
                              color: darkMode ? "#71717a" : "#a1a1aa",
                            }}
                          >
                            {day}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Bottom Drivers */}
                  <div>
                    <div
                      style={{
                        fontSize: "clamp(7px, 0.9vw, 8px)",
                        fontWeight: 600,
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        marginBottom: "clamp(4px, 0.6vw, 6px)",
                      }}
                    >
                      {t("fleetApp.dashboard.topDrivers")}
                    </div>
                    {[
                      {
                        name: "Mohamed A.",
                        deliveries: "32",
                        rating: "4.9",
                      },
                      {
                        name: "Ahmed S.",
                        deliveries: "28",
                        rating: "4.8",
                      },
                    ].map((driver, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "clamp(4px, 0.6vw, 6px) 0",
                          borderBottom:
                            i === 0
                              ? darkMode
                                ? "1px solid rgba(255,255,255,0.04)"
                                : "1px solid rgba(0,0,0,0.04)"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "clamp(4px, 0.6vw, 6px)",
                          }}
                        >
                          <div
                            style={{
                              width: "clamp(16px, 2vw, 22px)",
                              height: "clamp(16px, 2vw, 22px)",
                              borderRadius: "50%",
                              background: "var(--gradient-primary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "clamp(8px, 1vw, 10px)",
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {driver.name.charAt(0)}
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "clamp(8px, 1vw, 9px)",
                                fontWeight: 600,
                                color: darkMode ? "#e4e4e7" : "#27272a",
                              }}
                            >
                              {driver.name}
                            </div>
                            <div
                              style={{
                                fontSize: "clamp(7px, 0.8vw, 8px)",
                                color: darkMode ? "#71717a" : "#a1a1aa",
                              }}
                            >
                              {driver.deliveries}{" "}
                              {t("fleetApp.dashboard.deliveries")}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "clamp(3px, 0.4vw, 4px)",
                            color: "#f59e0b",
                          }}
                        >
                          <Star size={isMobile ? 8 : 10} fill="#f59e0b" />
                          <span
                            style={{
                              fontSize: "clamp(8px, 1vw, 9px)",
                              fontWeight: 600,
                              color: darkMode ? "#e4e4e7" : "#27272a",
                            }}
                          >
                            {driver.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Tablet - Right */}
              <div
                style={{
                  position: "absolute",
                  bottom: "8%",
                  right: isRTL ? "auto" : "1%",
                  left: isRTL ? "1%" : "auto",
                  width: isMobile ? "32%" : "38%",
                  maxWidth: "170px",
                  aspectRatio: "3 / 4",
                  borderRadius: "clamp(10px, 1.5vw, 14px)",
                  border: darkMode
                    ? "2px solid rgba(255,255,255,0.08)"
                    : "2px solid rgba(0,0,0,0.08)",
                  backgroundColor: darkMode ? "#18181b" : "#ffffff",
                  boxShadow: darkMode
                    ? "0 16px 40px rgba(0,0,0,0.4)"
                    : "0 16px 40px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  zIndex: 2,
                  transform: "rotate(3deg)",
                }}
              >
                <div style={{ padding: "clamp(5px, 1vw, 8px)" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "clamp(5px, 1vw, 8px)",
                    }}
                  >
                    <LayoutDashboard
                      size={isMobile ? 10 : 14}
                      color="var(--accent-500)"
                    />
                    <div
                      style={{
                        fontSize: "clamp(6px, 0.9vw, 8px)",
                        fontWeight: 700,
                        color: darkMode ? "#f4f4f5" : "#18181b",
                      }}
                    >
                      Fleet
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "clamp(3px, 0.5vw, 4px)",
                      marginBottom: "clamp(5px, 1vw, 8px)",
                    }}
                  >
                    <div
                      style={{
                        padding: "clamp(4px, 0.6vw, 6px)",
                        borderRadius: "clamp(4px, 0.6vw, 6px)",
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 12px)",
                          fontWeight: 700,
                          color: "var(--accent-500)",
                        }}
                      >
                        24
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(5px, 0.6vw, 6px)",
                          color: darkMode ? "#71717a" : "#a1a1aa",
                        }}
                      >
                        Active
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "clamp(4px, 0.6vw, 6px)",
                        borderRadius: "clamp(4px, 0.6vw, 6px)",
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 12px)",
                          fontWeight: 700,
                          color: "#f59e0b",
                        }}
                      >
                        85%
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(5px, 0.6vw, 6px)",
                          color: darkMode ? "#71717a" : "#a1a1aa",
                        }}
                      >
                        Efficiency
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "clamp(28px, 4vw, 40px)",
                      borderRadius: "clamp(4px, 0.6vw, 6px)",
                      backgroundColor: darkMode
                        ? "rgba(34,197,94,0.05)"
                        : "rgba(34,197,94,0.04)",
                      marginBottom: "clamp(4px, 0.6vw, 6px)",
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "1px",
                      padding: "clamp(3px, 0.5vw, 4px)",
                    }}
                  >
                    {[50, 70, 45, 85, 60, 90, 65].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          borderRadius: "1px",
                          background:
                            h > 80
                              ? "var(--accent-500)"
                              : "rgba(34,197,94,0.4)",
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    {[
                      { name: "Mohamed A.", deliveries: "32" },
                      { name: "Ahmed S.", deliveries: "28" },
                    ].map((d, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "clamp(3px, 0.4vw, 4px) 0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "clamp(7px, 0.9vw, 8px)",
                            color: darkMode ? "#e4e4e7" : "#27272a",
                          }}
                        >
                          {d.name}
                        </span>
                        <span
                          style={{
                            fontSize: "clamp(7px, 0.9vw, 8px)",
                            fontWeight: 600,
                            color: darkMode ? "#e4e4e7" : "#27272a",
                          }}
                        >
                          {d.deliveries}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Phone - Left */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12%",
                  left: isRTL ? "auto" : "1%",
                  right: isRTL ? "1%" : "auto",
                  width: isMobile ? "20%" : "22%",
                  maxWidth: "100px",
                  aspectRatio: "1 / 2",
                  borderRadius: "clamp(8px, 1.5vw, 12px)",
                  border: darkMode
                    ? "2px solid rgba(255,255,255,0.06)"
                    : "2px solid rgba(0,0,0,0.06)",
                  backgroundColor: darkMode ? "#18181b" : "#ffffff",
                  boxShadow: darkMode
                    ? "0 12px 30px rgba(0,0,0,0.4)"
                    : "0 12px 30px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  zIndex: 1,
                  transform: "rotate(-3deg)",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    height: "clamp(4px, 0.6vw, 6px)",
                    backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                    borderRadius: "0 0 4px 4px",
                    margin: "0 auto clamp(3px, 0.5vw, 4px)",
                  }}
                />
                <div
                  style={{
                    height: "calc(100% - 10px)",
                    borderRadius: "clamp(6px, 1vw, 8px)",
                    background:
                      "linear-gradient(180deg, var(--accent-500) 0%, #15803d 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(4px, 0.6vw, 6px)",
                    padding: "clamp(5px, 0.8vw, 8px)",
                  }}
                >
                  <LayoutDashboard
                    size={isMobile ? 14 : 18}
                    color="white"
                    style={{ opacity: 0.9 }}
                  />
                  <div
                    style={{
                      padding: "clamp(4px, 0.6vw, 6px)",
                      borderRadius: "clamp(4px, 0.6vw, 6px)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(10px, 1.5vw, 12px)",
                        fontWeight: 700,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      24
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(5px, 0.6vw, 6px)",
                        color: "rgba(255,255,255,0.7)",
                        textAlign: "center",
                      }}
                    >
                      Active
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(6px, 0.7vw, 7px)",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    85% Efficiency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            paddingTop: "4rem",
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
            {t("fleetApp.featuresTitle")}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(12px, 2vw, 16px)",
              padding: "0 8px",
              marginTop: isMobile
                ? "clamp(48px, 10vw, 64px)"
                : "clamp(32px, 5vw, 48px)",
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
                    {t(`fleetApp.features.${feature.key}.title`)}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 13px)",
                      color: darkMode ? "#a1a1aa" : "#71717a",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t(`fleetApp.features.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            borderRadius: "clamp(20px, 3vw, 32px)",
            padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)",
            background: darkMode
              ? "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)"
              : "linear-gradient(180deg, rgba(34,197,94,0.06) 0%, rgba(34,197,94,0.01) 100%)",
            border: darkMode
              ? "1px solid rgba(34,197,94,0.1)"
              : "1px solid rgba(34,197,94,0.08)",
            marginTop: "clamp(60px, 10vw, 100px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "clamp(48px, 8vw, 64px)",
              height: "clamp(48px, 8vw, 64px)",
              borderRadius: "clamp(14px, 2vw, 18px)",
              background: "var(--gradient-primary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "clamp(20px, 3vw, 28px)",
              boxShadow: darkMode
                ? "0 12px 32px rgba(34,197,94,0.3)"
                : "0 12px 32px rgba(34,197,94,0.2)",
            }}
          >
            <LayoutDashboard size={isMobile ? 24 : 30} color="#ffffff" />
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              color: darkMode ? "#f4f4f5" : "#18181b",
              margin: "0 0 clamp(8px, 1.5vw, 12px)",
              letterSpacing: isRTL ? "0" : "-0.02em",
            }}
          >
            {t("fleetApp.cta.title")}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              color: darkMode ? "#a1a1aa" : "#52525b",
              margin: "0 auto clamp(24px, 4vw, 36px)",
              maxWidth: "480px",
              lineHeight: 1.6,
              padding: "0 16px",
            }}
          >
            {t("fleetApp.cta.subtitle")}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 2vw, 16px)",
              flexWrap: "wrap",
              padding: "0 8px",
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(8px, 1.5vw, 12px)",
                padding: "clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)",
                borderRadius: "clamp(12px, 2vw, 16px)",
                backgroundColor: "var(--accent-500)",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "clamp(14px, 1.6vw, 15px)",
                fontWeight: 600,
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                minWidth: "clamp(160px, 30vw, 200px)",
                justifyContent: "center",
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
              {t("fleetApp.hero.getStarted")}
              {isRTL ? (
                <ArrowLeft size={isMobile ? 16 : 18} />
              ) : (
                <ExternalLink size={isMobile ? 16 : 18} />
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetAppPage;
