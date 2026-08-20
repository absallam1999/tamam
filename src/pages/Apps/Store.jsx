import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  ArrowRight,
  ArrowLeft,
  Star,
  Globe,
  ShoppingCart,
  Package,
  TrendingUp,
  BarChart3,
  Users,
  Settings,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useTranslation } from "react-i18next";

const StoreAppPage = () => {
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
    { icon: ShoppingCart, key: "orders" },
    { icon: Package, key: "inventory" },
    { icon: TrendingUp, key: "analytics" },
    { icon: BarChart3, key: "insights" },
    { icon: Users, key: "customers" },
    { icon: Settings, key: "settings" },
  ];

  const highlights = [
    t("storeApp.highlights.dashboard"),
    t("storeApp.highlights.support"),
    t("apps.store.features.orders"),
    t("apps.store.features.inventory"),
    t("apps.store.features.analytics"),
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
          <span>{t("storeApp.backToApps")}</span>
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
              <Store size={isMobile ? 34 : 46} color="#ffffff" />
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
              <span>{t("storeApp.hero.badge")}</span>
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
              {t("storeApp.hero.title")}
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
              {t("storeApp.hero.description")}
            </p>

            {/* Stats Cards */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 32px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  value: "500+",
                  label: t("storeApp.stats.stores"),
                },
                {
                  value: "4.7",
                  label: t("storeApp.stats.rating"),
                },
                {
                  value: "24/7",
                  label: t("storeApp.stats.support"),
                },
              ].map((stat, idx) => (
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
                {t("storeApp.hero.getStarted")}
                {isRTL ? (
                  <ArrowLeft size={isMobile ? 16 : 18} />
                ) : (
                  <ExternalLink size={isMobile ? 16 : 18} />
                )}
              </a>
            </div>
          </div>

          {/* Screenshots - Multi-Device Mockup */}
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
              flex: isMobile || isTablet ? "0 0 auto" : 1,
              width: isMobile || isTablet ? "100%" : "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? "320px" : isTablet ? "400px" : "500px",
                height: isMobile
                  ? "clamp(240px, 60vw, 280px)"
                  : "clamp(300px, 40vw, 380px)",
              }}
            >
              {/* Desktop Screen - Largest, Center */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isMobile ? "78%" : "75%",
                  maxWidth: "360px",
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
                    app.tamam.com/dashboard
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
                        {t("storeApp.dashboard.title")}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(7px, 0.9vw, 8px)",
                          color: darkMode ? "#71717a" : "#a1a1aa",
                        }}
                      >
                        {t("common.brand")} Store
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
                      <Store size={isMobile ? 10 : 12} color="#fff" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "clamp(4px, 0.8vw, 6px)",
                      marginBottom: "clamp(6px, 1vw, 10px)",
                    }}
                  >
                    {[
                      {
                        label: t("storeApp.dashboard.ordersToday"),
                        value: "47",
                        color: "var(--accent-500)",
                      },
                      {
                        label: t("storeApp.dashboard.revenue"),
                        value: "EGP 1,240",
                        color: "#f59e0b",
                      },
                    ].map((card, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "clamp(5px, 0.8vw, 8px)",
                          borderRadius: "clamp(5px, 0.8vw, 8px)",
                          backgroundColor: darkMode
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(11px, 1.5vw, 14px)",
                            fontWeight: 700,
                            color: card.color,
                          }}
                        >
                          {card.value}
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(6px, 0.8vw, 7px)",
                            color: darkMode ? "#71717a" : "#a1a1aa",
                            marginTop: "1px",
                          }}
                        >
                          {card.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
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
                      {t("storeApp.dashboard.salesOverview")}
                    </div>
                    <svg
                      width="100%"
                      height="clamp(20px, 3vw, 30px)"
                      viewBox="0 0 300 30"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 25 L35 20 L70 14 L105 18 L140 8 L175 12 L210 5 L245 10 L280 3 L300 6"
                        stroke="var(--accent-500)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 25 L35 20 L70 14 L105 18 L140 8 L175 12 L210 5 L245 10 L280 3 L300 6 L300 30 L0 30 Z"
                        fill="var(--accent-500)"
                        opacity="0.1"
                      />
                    </svg>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <div
                      style={{
                        fontSize: "clamp(7px, 0.9vw, 8px)",
                        fontWeight: 600,
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        marginBottom: "clamp(4px, 0.6vw, 6px)",
                      }}
                    >
                      {t("storeApp.dashboard.recentOrders")}
                    </div>
                    {[
                      {
                        id: "#2841",
                        customer: "Ahmed M.",
                        amount: "EGP 32.50",
                        status: t("storeApp.dashboard.delivered"),
                      },
                      {
                        id: "#2840",
                        customer: "Sara K.",
                        amount: "EGP 18.00",
                        status: t("storeApp.dashboard.preparing"),
                      },
                    ].map((order, i) => (
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
                              borderRadius: "clamp(4px, 0.6vw, 6px)",
                              backgroundColor: darkMode
                                ? "rgba(34,197,94,0.12)"
                                : "rgba(34,197,94,0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--accent-500)",
                            }}
                          >
                            <Package size={isMobile ? 8 : 10} />
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "clamp(8px, 1vw, 9px)",
                                fontWeight: 600,
                                color: darkMode ? "#e4e4e7" : "#27272a",
                              }}
                            >
                              {order.id}
                            </div>
                            <div
                              style={{
                                fontSize: "clamp(7px, 0.8vw, 8px)",
                                color: darkMode ? "#71717a" : "#a1a1aa",
                              }}
                            >
                              {order.customer}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "clamp(8px, 1vw, 9px)",
                              fontWeight: 600,
                              color: darkMode ? "#e4e4e7" : "#27272a",
                            }}
                          >
                            {order.amount}
                          </div>
                          <div
                            style={{
                              fontSize: "clamp(6px, 0.7vw, 7px)",
                              color:
                                order.status ===
                                t("storeApp.dashboard.delivered")
                                  ? "var(--accent-500)"
                                  : "#f59e0b",
                              fontWeight: 500,
                            }}
                          >
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet Screen - Right Side */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: isRTL ? "auto" : "2%",
                  left: isRTL ? "2%" : "auto",
                  width: isMobile ? "35%" : "40%",
                  maxWidth: "180px",
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
                    <Store
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
                      Dashboard
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "clamp(5px, 0.8vw, 8px)",
                      borderRadius: "clamp(5px, 0.8vw, 8px)",
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                      marginBottom: "clamp(4px, 0.6vw, 6px)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 12px)",
                        fontWeight: 700,
                        color: "var(--accent-500)",
                      }}
                    >
                      47
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(6px, 0.7vw, 7px)",
                        color: darkMode ? "#71717a" : "#a1a1aa",
                      }}
                    >
                      Orders Today
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
                      padding: "clamp(4px, 0.6vw, 6px)",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 150 28"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 22 L25 16 L50 18 L75 10 L100 14 L125 6 L150 8"
                        stroke="var(--accent-500)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    {[
                      { id: "#2841", amount: "EGP 32.50" },
                      { id: "#2840", amount: "EGP 18.00" },
                    ].map((o, i) => (
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
                          {o.id}
                        </span>
                        <span
                          style={{
                            fontSize: "clamp(7px, 0.9vw, 8px)",
                            fontWeight: 600,
                            color: darkMode ? "#e4e4e7" : "#27272a",
                          }}
                        >
                          {o.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Screen - Left Side */}
              <div
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: isRTL ? "auto" : "2%",
                  right: isRTL ? "2%" : "auto",
                  width: isMobile ? "22%" : "24%",
                  maxWidth: "110px",
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
                  <Store
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
                      47
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(5px, 0.6vw, 6px)",
                        color: "rgba(255,255,255,0.7)",
                        textAlign: "center",
                      }}
                    >
                      Orders
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(6px, 0.7vw, 7px)",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    EGP 1,240
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
            {t("storeApp.featuresTitle")}
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
                    {t(`storeApp.features.${feature.key}.title`)}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 13px)",
                      color: darkMode ? "#a1a1aa" : "#71717a",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t(`storeApp.features.${feature.key}.description`)}
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
            <Store size={isMobile ? 24 : 30} color="#ffffff" />
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
            {t("storeApp.cta.title")}
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
            {t("storeApp.cta.subtitle")}
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
              {t("storeApp.hero.getStarted")}
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

export default StoreAppPage;
