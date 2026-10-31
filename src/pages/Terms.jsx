import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Mail, ArrowRight, ArrowLeft } from "lucide-react";
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

const Terms = () => {
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

  const sections = [
    "acceptance",
    "account",
    "use",
    "privacy",
    "payments",
    "termination",
    "liability",
  ];

  // Glass surface token
  const glassStyle = {
    background: c.surfaceGradient,
    border: `1px solid ${c.border}`,
  };

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
            <FileText size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.legal")}</span>
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
            {t("terms.title")}
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: darkMode ? "#71717a" : "#a1a1aa",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            {t("terms.lastUpdated")} • {t("terms.effective")}
          </p>

          <p
            style={{
              fontSize: "15px",
              color: darkMode ? "#a1a1aa" : "#52525b",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "600px",
            }}
          >
            {t("terms.intro")}
          </p>
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
                transition: `all 0.5s ease ${0.2 + index * 0.06}s`,
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
                {t(`terms.${key}.title`)}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {t(`terms.${key}.content`)}
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
            {t("terms.supportText")}
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

export default Terms;
