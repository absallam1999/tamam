import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Download,
  Users,
  Star,
  Target,
  Eye,
  Heart,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

const About = () => {
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

  const stats = [
    { icon: Download, value: "20K+", label: t("about.stats.downloads") },
    { icon: Users, value: "400+", label: t("about.stats.dailyOrders") },
    { icon: Star, value: "4.9", label: t("about.stats.rating") },
    { icon: Globe, value: "8+", label: t("about.stats.cities") },
  ];

  const values = [
    {
      icon: Target,
      key: "mission",
      title: t("about.mission"),
      description: t("about.missionDesc"),
    },
    {
      icon: Eye,
      key: "vision",
      title: t("about.vision"),
      description: t("about.visionDesc"),
    },
    {
      icon: Heart,
      key: "team",
      title: t("about.team"),
      description: t("about.teamDesc"),
    },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1000px",
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
            marginBottom: "60px",
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
            <Users size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.about")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {t("about.title")}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: darkMode ? "#a1a1aa" : "#52525b",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "600px",
            }}
          >
            {t("about.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginBottom: "80px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.15s",
            direction: dir,
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                style={{
                  padding: "22px",
                  borderRadius: "18px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.4s ease ${0.2 + i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
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
                  <Icon size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: darkMode ? "#f4f4f5" : "#18181b",
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      marginTop: "2px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "80px",
            direction: dir,
          }}
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  padding: "32px",
                  borderRadius: "22px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  textAlign: "center",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.5s ease ${0.4 + i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    backgroundColor: darkMode
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(34,197,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    color: "var(--accent-500)",
                  }}
                >
                  <Icon size={26} />
                </div>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: darkMode ? "#f4f4f5" : "#18181b",
                    marginBottom: "10px",
                    letterSpacing: isRTL ? "0" : "-0.01em",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    color: darkMode ? "#a1a1aa" : "#71717a",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Location & Contact */}
        <div
          style={{
            padding: "28px",
            borderRadius: "20px",
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(0,0,0,0.06)",
            marginBottom: "60px",
            direction: dir,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.65s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={16} color="var(--accent-500)" />
              <span
                style={{
                  fontSize: "14px",
                  color: darkMode ? "#d4d4d8" : "#3f3f46",
                  fontWeight: 500,
                }}
              >
                {isRTL ? "محافظة البحيرة, مصر" : "Beheira Governorate, Egypt"}
              </span>
            </div>
            <span style={{ color: darkMode ? "#52525b" : "#d4d4d8" }}>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={16} color="var(--accent-500)" />
              <a
                href="mailto:contact@tamaam.cloud"
                style={{
                  fontSize: "14px",
                  color: "var(--accent-500)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                contact@tamaam.cloud
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: darkMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.06)",
            margin: "0 0 32px",
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
            {t("faq.stillHaveQuestions")}
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
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
            <span>{t("common.contact_us")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
