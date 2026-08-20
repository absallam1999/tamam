import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Shield,
  Mail,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

const Privacy = () => {
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

  const sections = [
    "collection",
    "age",
    "usage",
    "sharing",
    "transfer",
    "security",
    "deletion",
    "rights",
    "links",
    "updates",
    "contact",
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
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: darkMode ? "#a1a1aa" : "#71717a",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "40px",
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
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{t("common.back")}</span>
        </Link>

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
              padding: "6px 16px",
              borderRadius: "100px",
              backgroundColor: darkMode
                ? "rgba(34,197,94,0.12)"
                : "rgba(34,197,94,0.08)",
              color: "var(--accent-500)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: isRTL ? "0" : "0.02em",
              marginBottom: "20px",
            }}
          >
            <Shield size={14} style={{ flexShrink: 0 }} />
            <span>{t("privacy.badge")}</span>
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
            {t("privacy.title")}
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: darkMode ? "#71717a" : "#a1a1aa",
              fontWeight: 500,
            }}
          >
            {t("privacy.lastUpdated")}
          </p>

          {/* Contact Info Box */}
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              borderRadius: "16px",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
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
              <Mail
                size={15}
                color="var(--accent-500)"
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: darkMode ? "#d4d4d8" : "#3f3f46",
                  fontWeight: 500,
                }}
              >
                {t("privacy.contactEmail")}:
              </span>
              <a
                href="mailto:support@tamaam.cloud"
                style={{
                  fontSize: "13px",
                  color: "var(--accent-500)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                support@tamaam.cloud
              </a>
            </div>
          </div>
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
                {t(`privacy.${key}.title`)}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {t(`privacy.${key}.content`)}
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

        {/* Footer CTA */}
        <div style={{ textAlign: "center", direction: dir }}>
          <p
            style={{
              fontSize: "14px",
              color: darkMode ? "#a1a1aa" : "#71717a",
              marginBottom: "16px",
            }}
          >
            {t("privacy.questions")}
          </p>
          <a
            href="mailto:support@tamaam.cloud"
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
            <span>support@tamaam.cloud</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
