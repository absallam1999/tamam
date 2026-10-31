import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Cookie,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  BarChart3,
  Settings,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

/* =========================================================
   SHARED DESIGN TOKENS
   ========================================================= */
const TOKENS = {
  dark: {
    text: "#f4f4f5", // zinc-100
    textStrong: "#fafafa", // zinc-50
    textMuted: "#a1a1aa", // zinc-400
    textFaint: "#71717a", // zinc-500
    border: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.10)",
    surface: "rgba(24, 24, 27, 0.72)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(24,24,27,0.72) 0%, rgba(15,15,17,0.60) 100%)",
    surfaceSolid: "#18181b",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeBorder: "rgba(34,197,94,0.28)",
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
    chipBg: "rgba(0,0,0,0.02)",
    shadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
};

const ACCENT = "var(--accent-500, #22c55e)";

const Cookies = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [isRTL]);

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  // Glass surface token
  const glassStyle = {
    background: c.surfaceGradient,
    border: `1px solid ${c.border}`,
  };

  const sections = ["what", "how", "manage"];

  const cookieTypes = [
    {
      icon: Shield,
      title: t("cookies.types.essential"),
      description: isRTL
        ? "ضرورية لعمل الموقع"
        : "Required for the website to function",
    },
    {
      icon: BarChart3,
      title: t("cookies.types.analytics"),
      description: isRTL
        ? "تساعدنا على فهم كيفية استخدامك للموقع"
        : "Help us understand how you use the site",
    },
    {
      icon: Settings,
      title: t("cookies.types.preferences"),
      description: isRTL
        ? "تتذكر إعدادات اللغة والمنطقة الخاصة بك"
        : "Remember your language and region settings",
    },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "100px 24px 80px",
        }}
      >
        {/* Back Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: "36px",
            direction: dir,
            display: "inline-block",
          }}
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

        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
            direction: dir,
            marginBottom: "48px",
          }}
        >
          {/* Badge */}
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
            <Cookie size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.cookies")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            {t("cookies.title")}
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: darkMode ? "#a1a1aa" : "#52525b",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "600px",
            }}
          >
            {t("cookies.intro")}
          </p>
        </div>

        {/* Cookie Types Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginBottom: "48px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.15s",
            direction: dir,
          }}
        >
          {cookieTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  transition: `all 0.4s ease ${0.2 + index * 0.08}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: darkMode
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(34,197,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    color: "var(--accent-500)",
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: darkMode ? "#f4f4f5" : "#18181b",
                    marginBottom: "4px",
                  }}
                >
                  {type.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: darkMode ? "#a1a1aa" : "#71717a",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {type.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sections */}
        <div style={{ direction: dir }}>
          {sections.map((key, index) => (
            <div
              key={key}
              style={{
                marginBottom: "40px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.5s ease ${0.3 + index * 0.06}s`,
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: darkMode ? "#f4f4f5" : "#18181b",
                  marginBottom: "10px",
                  letterSpacing: isRTL ? "0" : "-0.01em",
                }}
              >
                {t(`cookies.${key}.title`)}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {t(`cookies.${key}.content`)}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.06)",
            margin: "48px 0 32px",
          }}
        />

        {/* Footer */}
        <div style={{ textAlign: "center", direction: dir }}>
          <p
            style={{
              fontSize: "14px",
              color: darkMode ? "#a1a1aa" : "#71717a",
              marginBottom: "16px",
            }}
          >
            {t("faq.stillHaveQuestions")}
          </p>
          <a
            href="mailto:contact@tamamapp.net"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "14px",
              backgroundColor: "var(--accent-500)",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = darkMode
                ? "0 8px 24px rgba(34,197,94,0.3)"
                : "0 8px 24px rgba(34,197,94,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Mail size={18} />
            <span>contact@tamamapp.net</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
