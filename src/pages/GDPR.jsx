import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Shield,
  Mail,
  ArrowRight,
  ArrowLeft,
  Lock,
  FileText,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

const GDPR = () => {
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

  const rights = [
    { icon: FileText, text: t("gdpr.rights.right1") },
    { icon: Lock, text: t("gdpr.rights.right2") },
    { icon: Shield, text: t("gdpr.rights.right3") },
    { icon: HelpCircle, text: t("gdpr.rights.right4") },
    { icon: UserCheck, text: t("gdpr.rights.right5") },
    { icon: Shield, text: t("gdpr.rights.right6") },
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
            <span>{t("nav.gdpr")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            {t("gdpr.title")}
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
            {t("gdpr.intro")}
          </p>
        </div>

        {/* Rights List */}
        <div
          style={{
            marginBottom: "48px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.15s",
            direction: dir,
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: darkMode ? "#f4f4f5" : "#18181b",
              marginBottom: "16px",
              letterSpacing: isRTL ? "0" : "-0.01em",
            }}
          >
            {t("gdpr.rights.title")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {rights.map((right, i) => {
              const Icon = right.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.06)",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(10px)",
                    transition: `all 0.4s ease ${0.2 + i * 0.05}s`,
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      backgroundColor: darkMode
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(34,197,94,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--accent-500)",
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: darkMode ? "#d4d4d8" : "#3f3f46",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {right.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Controller */}
        <div style={{ direction: dir }}>
          <div
            style={{
              marginBottom: "40px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.5s",
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
              {t("gdpr.data_controller.title")}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: darkMode ? "#a1a1aa" : "#52525b",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {t("gdpr.data_controller.content")}
            </p>
          </div>

          {/* Consent */}
          <div
            style={{
              marginBottom: "40px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.55s",
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
              {t("gdpr.consent.title")}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: darkMode ? "#a1a1aa" : "#52525b",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {t("gdpr.consent.content")}
            </p>
          </div>

          {/* Contact DPO */}
          <div
            style={{
              marginBottom: "40px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.6s",
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
              {t("gdpr.contact.title")}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: darkMode ? "#a1a1aa" : "#52525b",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {t("gdpr.contact.content")}
            </p>
          </div>
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
            href="mailto:dpo@tamaam.cloud"
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

export default GDPR;
