import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Truck,
  Store,
  ArrowRight,
  ArrowLeft,
  Apple,
  Play,
  Globe,
  Download,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useTranslation } from "react-i18next";

const AppsPage = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [isRTL]);

  const apps = [
    {
      id: "customer",
      title: t("apps.customer.title"),
      subtitle: t("apps.customer.subtitle"),
      description: t("apps.customer.description"),
      icon: Smartphone,
      badge: t("apps.customer.badge"),
      features: [
        t("apps.customer.features.tracking"),
        t("apps.customer.features.payments"),
        t("apps.customer.features.reviews"),
      ],
      platforms: [
        { name: "iOS", icon: Apple },
        { name: "Android", icon: Play },
      ],
    },
    {
      id: "courier",
      title: t("apps.courier.title"),
      subtitle: t("apps.courier.subtitle"),
      description: t("apps.courier.description"),
      icon: Truck,
      badge: t("apps.courier.badge"),
      features: [
        t("apps.courier.features.orders"),
        t("apps.courier.features.earnings"),
        t("apps.courier.features.routes"),
      ],
      platforms: [
        { name: "iOS", icon: Apple },
        { name: "Android", icon: Play },
      ],
    },
    {
      id: "store",
      title: t("apps.store.title"),
      subtitle: t("apps.store.subtitle"),
      description: t("apps.store.description"),
      icon: Store,
      badge: t("apps.store.badge"),
      features: [
        t("apps.store.features.orders"),
        t("apps.store.features.inventory"),
        t("apps.store.features.analytics"),
      ],
      platforms: [{ name: "Web", icon: Globe }],
    },
    {
      id: "fleet",
      title: t("apps.fleet.title"),
      subtitle: t("apps.fleet.subtitle"),
      description: t("apps.fleet.description"),
      icon: LayoutDashboard,
      badge: t("apps.fleet.badge"),
      features: [
        t("apps.fleet.features.tracking"),
        t("apps.fleet.features.analytics"),
        t("apps.fleet.features.management"),
      ],
      platforms: [{ name: "Web", icon: Globe }],
    },
  ];

  const filteredApps =
    activeTab === "all"
      ? apps
      : activeTab === "mobile"
        ? apps.filter((app) =>
            app.platforms.some((p) => p.name === "iOS" || p.name === "Android"),
          )
        : apps.filter((app) => app.platforms.some((p) => p.name === "Web"));

  const tabs = [
    { id: "all", label: t("apps.tabs.all") },
    { id: "mobile", label: t("apps.tabs.mobile") },
    { id: "web", label: t("apps.tabs.web") },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding:
            "clamp(80px, 10vw, 120px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 100px)",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(40px, 8vw, 80px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(6px, 1vw, 8px)",
              padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 18px)",
              borderRadius: "100px",
              backgroundColor: darkMode
                ? "rgba(34,197,94,0.12)"
                : "rgba(34,197,94,0.08)",
              color: "var(--accent-500)",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              fontWeight: 600,
              letterSpacing: isRTL ? "0" : "-0.01em",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <Smartphone size={isMobile ? 13 : 15} style={{ flexShrink: 0 }} />
            <span>{t("apps.hero.badge")}</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 6vw, 60px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.04em",
              lineHeight: 1.1,
              margin: "clamp(16px, 3vw, 24px) 0 clamp(12px, 2vw, 16px)",
              padding: "0 8px",
            }}
          >
            {t("apps.hero.title")}
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              color: darkMode ? "#a1a1aa" : "#52525b",
              maxWidth: "560px",
              lineHeight: 1.6,
              fontWeight: 400,
              margin: "0 auto",
              padding: "0 16px",
            }}
          >
            {t("apps.hero.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "clamp(32px, 5vw, 56px)",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: "4px",
              borderRadius: "14px",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "clamp(8px, 1.5vw, 10px) clamp(14px, 3vw, 22px)",
                    borderRadius: "11px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "clamp(12px, 1.5vw, 14px)",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    backgroundColor: active
                      ? darkMode
                        ? "rgba(34,197,94,0.15)"
                        : "#ffffff"
                      : "transparent",
                    color: active
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#71717a"
                        : "#a1a1aa",
                    boxShadow: active
                      ? darkMode
                        ? "none"
                        : "0 1px 3px rgba(0,0,0,0.08)"
                      : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(16px, 2vw, 20px)",
            padding: "0 8px",
          }}
        >
          {filteredApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <Link
                to={`/apps/${app.id}`}
                key={app.id}
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "#ffffff",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  padding: "clamp(20px, 3vw, 36px)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transitionDelay: `${index * 0.08}s`,
                  direction: isRTL ? "rtl" : "ltr",
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = darkMode
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(34,197,94,0.15)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 24px 48px rgba(0,0,0,0.4)"
                      : "0 24px 48px rgba(0,0,0,0.06)";
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
                {/* Icon + Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(12px, 2vw, 20px)",
                    marginBottom: "clamp(16px, 3vw, 28px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(44px, 6vw, 56px)",
                      height: "clamp(44px, 6vw, 56px)",
                      borderRadius: "clamp(12px, 1.5vw, 16px)",
                      background: "var(--gradient-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: darkMode
                        ? "0 8px 24px rgba(34,197,94,0.25)"
                        : "0 8px 24px rgba(34,197,94,0.15)",
                    }}
                  >
                    <Icon size={isMobile ? 22 : 28} color="#ffffff" />
                  </div>
                  <div style={{ flex: 1, paddingTop: "4px", minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(6px, 1vw, 10px)",
                        marginBottom: "clamp(4px, 1vw, 6px)",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "clamp(16px, 2vw, 20px)",
                          fontWeight: 700,
                          color: darkMode ? "#f4f4f5" : "#18181b",
                          margin: 0,
                          letterSpacing: isRTL ? "0" : "-0.02em",
                        }}
                      >
                        {app.title}
                      </h3>
                      <span
                        style={{
                          fontSize: "clamp(10px, 1.2vw, 11px)",
                          fontWeight: 600,
                          padding:
                            "clamp(3px, 0.5vw, 4px) clamp(8px, 1.5vw, 12px)",
                          borderRadius: "20px",
                          backgroundColor: darkMode
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(34,197,94,0.08)",
                          color: "var(--accent-500)",
                          letterSpacing: isRTL ? "0" : "-0.01em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {app.badge}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {app.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    lineHeight: 1.65,
                    margin: "0 0 clamp(16px, 3vw, 28px)",
                    flex: 1,
                  }}
                >
                  {app.description}
                </p>

                {/* Features */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginBottom: "clamp(16px, 3vw, 28px)",
                  }}
                >
                  {app.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(8px, 1vw, 10px)",
                        padding: "clamp(6px, 1vw, 8px) 0",
                      }}
                    >
                      <div
                        style={{
                          width: "clamp(18px, 2.5vw, 20px)",
                          height: "clamp(18px, 2.5vw, 20px)",
                          borderRadius: "6px",
                          backgroundColor: darkMode
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(34,197,94,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2
                          size={isMobile ? 11 : 12}
                          color="var(--accent-500)"
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "clamp(12px, 1.5vw, 13px)",
                          color: darkMode ? "#a1a1aa" : "#52525b",
                          fontWeight: 450,
                          lineHeight: 1.4,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "clamp(14px, 2vw, 20px)",
                    borderTop: darkMode
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.05)",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "clamp(4px, 1vw, 8px)",
                      flexWrap: "wrap",
                    }}
                  >
                    {app.platforms.map((platform, idx) => {
                      const PIcon = platform.icon;
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            padding:
                              "clamp(4px, 0.8vw, 5px) clamp(8px, 1.5vw, 10px)",
                            borderRadius: "7px",
                            backgroundColor: darkMode
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(0,0,0,0.03)",
                            fontSize: "clamp(10px, 1.2vw, 12px)",
                            fontWeight: 500,
                            color: darkMode ? "#a1a1aa" : "#71717a",
                          }}
                        >
                          <PIcon size={isMobile ? 11 : 13} />
                          {platform.name}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "var(--accent-500)",
                      fontSize: "clamp(12px, 1.5vw, 13px)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    <span>{t("apps.learnMore")}</span>
                    {isRTL ? (
                      <ArrowLeft
                        size={isMobile ? 13 : 15}
                        style={{ flexShrink: 0 }}
                      />
                    ) : (
                      <ArrowRight
                        size={isMobile ? 13 : 15}
                        style={{ flexShrink: 0 }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
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
            <Download size={isMobile ? 24 : 30} color="#ffffff" />
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
            {t("apps.cta.title")}
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
            {t("apps.cta.subtitle")}
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
            {/* App Store Button */}
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(8px, 1.5vw, 12px)",
                padding: "clamp(10px, 1.5vw, 12px) clamp(16px, 3vw, 24px)",
                borderRadius: "clamp(12px, 2vw, 16px)",
                backgroundColor: darkMode ? "#ffffff" : "#000000",
                color: darkMode ? "#000000" : "#ffffff",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                border: darkMode
                  ? "1px solid rgba(0,0,0,0.06)"
                  : "1px solid rgba(255,255,255,0.1)",
                minWidth: "clamp(140px, 25vw, 180px)",
                direction: isRTL ? "rtl" : "ltr",
                textAlign: "initial",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 12px 28px rgba(0,0,0,0.12)"
                  : "0 12px 28px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
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
                style={{ display: "flex", flexDirection: "column", gap: "1px" }}
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
                  {isRTL ? "حمّل من" : "Download on the"}
                </span>
                <span
                  style={{
                    fontSize: "clamp(13px, 1.8vw, 16px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: isRTL ? "0" : "-0.01em",
                  }}
                >
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(8px, 1.5vw, 12px)",
                padding: "clamp(10px, 1.5vw, 12px) clamp(16px, 3vw, 24px)",
                borderRadius: "clamp(12px, 2vw, 16px)",
                backgroundColor: darkMode ? "#ffffff" : "#000000",
                color: darkMode ? "#000000" : "#ffffff",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                border: darkMode
                  ? "1px solid rgba(0,0,0,0.06)"
                  : "1px solid rgba(255,255,255,0.1)",
                minWidth: "clamp(140px, 25vw, 180px)",
                direction: isRTL ? "rtl" : "ltr",
                textAlign: "initial",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 12px 28px rgba(0,0,0,0.12)"
                  : "0 12px 28px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
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
                style={{ display: "flex", flexDirection: "column", gap: "1px" }}
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
                  {isRTL ? "حمّل من" : "GET IT ON"}
                </span>
                <span
                  style={{
                    fontSize: "clamp(13px, 1.8vw, 16px)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: isRTL ? "0" : "-0.01em",
                  }}
                >
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsPage;
