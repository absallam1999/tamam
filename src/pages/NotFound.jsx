import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

const NotFound = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const dir = isRTL ? "rtl" : "ltr";

  const chassisColor = darkMode ? "#f4f4f5" : "#09090b";
  const innerMechanicalColor = darkMode ? "#3f3f46" : "#a1a1aa";
  const tireColor = darkMode ? "#18181b" : "#27272a";
  const rimColor = darkMode ? "#52525b" : "#d4d4d8";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "2rem",
        transition: "background-color 0.5s ease",
        overflow: "hidden",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Ambient Background Glows */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* Illustration Side */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              order: isRTL ? 2 : 1,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Giant 404 Shadow Text */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "clamp(100px, 24vw, 320px)",
                  fontWeight: 900,
                  color: darkMode
                    ? "rgba(34,197,94,0.04)"
                    : "rgba(34,197,94,0.05)",
                  lineHeight: 1,
                  letterSpacing: "-6px",
                  userSelect: "none",
                  pointerEvents: "none",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                404
              </div>

              {/* Motorcycle Illustration */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "85%",
                  maxWidth: "300px",
                }}
              >
                <svg
                  width="100%"
                  height="auto"
                  viewBox="0 0 220 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    filter: darkMode
                      ? "drop-shadow(0 16px 24px rgba(0,0,0,0.4))"
                      : "drop-shadow(0 16px 24px rgba(0,0,0,0.08))",
                  }}
                >
                  {/* Ground Shadow */}
                  <ellipse
                    cx="110"
                    cy="148"
                    r="85"
                    ry="4"
                    fill={darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"}
                  />

                  {/* Kickstand */}
                  <path
                    d="M110 108 L102 148"
                    stroke="var(--text-secondary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M96 148 L108 148"
                    stroke="var(--text-secondary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Skid Marks */}
                  <path
                    d="M8 144 L58 144"
                    stroke={
                      darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                    }
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 150 L54 150"
                    stroke={
                      darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"
                    }
                    strokeWidth="2"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                  />

                  {/* Rear Wheel */}
                  <circle
                    cx="58"
                    cy="128"
                    r="18"
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <circle
                    cx="58"
                    cy="128"
                    r="16"
                    stroke="var(--text-secondary)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="58"
                    cy="128"
                    r="9"
                    fill="var(--bg-secondary)"
                    stroke="var(--border-default)"
                    strokeWidth="1.5"
                  />
                  <circle cx="58" cy="128" r="3" fill="var(--text-secondary)" />

                  {/* Rear Swingarm */}
                  <line
                    x1="58"
                    y1="128"
                    x2="78"
                    y2="88"
                    stroke="var(--text-tertiary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Front Wheel */}
                  <circle
                    cx="168"
                    cy="128"
                    r="18"
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <circle
                    cx="168"
                    cy="128"
                    r="16"
                    stroke="var(--text-secondary)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="168"
                    cy="128"
                    r="9"
                    fill="var(--bg-secondary)"
                    stroke="var(--border-default)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="168"
                    cy="128"
                    r="3"
                    fill="var(--text-secondary)"
                  />

                  {/* Front Fork */}
                  <line
                    x1="168"
                    y1="128"
                    x2="154"
                    y2="62"
                    stroke="var(--text-tertiary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Chassis - Lower Engine Casing */}
                  <path
                    d="M100 88 L115 104 L140 104 L154 72"
                    stroke="var(--text-tertiary)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Chassis - Main Body */}
                  <path
                    d="M62 88 L100 88 L115 104 L140 104 L158 62"
                    stroke="var(--text-primary)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Front Fender */}
                  <path
                    d="M148 104 Q168 90 184 114"
                    stroke="var(--text-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Delivery Box Rack */}
                  <line
                    x1="40"
                    y1="88"
                    x2="68"
                    y2="88"
                    stroke="var(--text-tertiary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Delivery Box */}
                  <rect
                    x="24"
                    y="30"
                    width="44"
                    height="48"
                    rx="6"
                    fill="var(--accent-500)"
                  />
                  <rect
                    x="24"
                    y="30"
                    width="44"
                    height="48"
                    rx="6"
                    fill="var(--accent-500)"
                    opacity="0.15"
                  />
                  <path
                    d="M22 40 L70 40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <rect
                    x="36"
                    y="52"
                    width="20"
                    height="6"
                    rx="3"
                    fill="rgba(255,255,255,0.8)"
                  />

                  {/* Seat */}
                  <line
                    x1="68"
                    y1="70"
                    x2="104"
                    y2="70"
                    stroke="var(--text-primary)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Handlebars */}
                  <line
                    x1="158"
                    y1="62"
                    x2="148"
                    y2="52"
                    stroke="var(--text-primary)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <circle cx="148" cy="52" r="6" fill="var(--accent-500)" />

                  {/* Tail Light */}
                  <circle cx="46" cy="88" r="5" fill="#ef4444" opacity="0.9" />

                  {/* Headlight Housing */}
                  <path
                    d="M156 62 L166 66 L164 76 L154 72 Z"
                    fill="var(--text-primary)"
                    strokeLinejoin="round"
                  />

                  {/* Headlight Bulb */}
                  <path
                    d="M164 64 Q170 70 162 74"
                    stroke="#fef08a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />

                  {/* Headlight Beam */}
                  <path
                    d="M172 66 L192 62 L192 76 Z"
                    fill="#fef08a"
                    opacity="0.08"
                  />
                </svg>
              </div>

              {/* Floating Map Pins */}
              <div
                style={{
                  position: "absolute",
                  top: "2%",
                  left: "12%",
                  animation: "floatUpDown 4s ease-in-out infinite",
                  zIndex: 3,
                }}
              >
                <MapPin
                  size={22}
                  color="#ef4444"
                  fill="rgba(239,68,68,0.15)"
                  strokeWidth={2}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32%",
                  right: "10%",
                  animation: "floatUpDown 3.5s ease-in-out infinite",
                  animationDelay: "0.5s",
                  zIndex: 3,
                }}
              >
                <MapPin
                  size={18}
                  color="var(--accent-500)"
                  fill="rgba(34,197,94,0.15)"
                  strokeWidth={2}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "32%",
                  left: "6%",
                  animation: "floatUpDown 3s ease-in-out infinite",
                  animationDelay: "1s",
                  zIndex: 3,
                }}
              >
                <AlertTriangle
                  size={18}
                  color="#f59e0b"
                  fill="rgba(245,158,11,0.15)"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            style={{
              textAlign: isRTL ? "right" : "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              order: isRTL ? 1 : 2,
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(44px, 6vw, 64px)",
                fontWeight: 800,
                color: darkMode ? "#ffffff" : "#09090b",
                letterSpacing: isRTL ? "0" : "-0.03em",
                lineHeight: 1.05,
                marginBottom: "16px",
              }}
            >
              {t("notFound.title")}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 700,
                color: darkMode ? "#d4d4d8" : "#3f3f46",
                marginBottom: "12px",
              }}
            >
              {t("notFound.subtitle")}
            </p>

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                color: darkMode ? "#a1a1aa" : "#71717a",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "440px",
                fontWeight: 400,
              }}
            >
              {t("notFound.description")}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                direction: dir,
              }}
            >
              <button
                onClick={() => window.history.back()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  borderRadius: "16px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "#ffffff",
                  color: darkMode ? "#e4e4e7" : "#3f3f46",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: darkMode ? "none" : "0 4px 12px rgba(0,0,0,0.03)",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  flex: "1 1 auto",
                  minWidth: "160px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(255,255,255,0.08)"
                    : "#fafafa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "#ffffff";
                }}
              >
                {isRTL ? (
                  <ArrowRight size={18} strokeWidth={2.5} />
                ) : (
                  <ArrowLeft size={18} strokeWidth={2.5} />
                )}
                <span>{t("notFound.goBack")}</span>
              </button>

              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  borderRadius: "16px",
                  backgroundColor: "var(--accent-500, #22c55e)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  flex: "1 1 auto",
                  minWidth: "160px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 12px 24px -6px rgba(34,197,94,0.4)"
                    : "0 12px 24px -6px rgba(34,197,94,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Home size={18} style={{ flexShrink: 0 }} strokeWidth={2.5} />
                <span>{t("notFound.backHome")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Animations */}
      <style>
        {`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-16px) scale(1.05); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
