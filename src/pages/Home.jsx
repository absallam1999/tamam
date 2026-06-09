import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Download,
  ArrowRight,
  Zap,
  Shield,
  Headphones,
  Cloud,
  Star,
  Play,
} from "lucide-react";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 120px) 20px clamp(40px, 6vw, 80px)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(40px, 6vw, 60px)",
          }}
        >
          {/* Content Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(32px, 5vw, 48px)",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left - Text */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-secondary)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-500)",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {t("common.brand")} — {t("hero.subtitle").split(",")[0]}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                }}
              >
                {t("hero.title")}
              </h1>

              <p
                style={{
                  fontSize: "clamp(14px, 1.8vw, 16px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "28px",
                  maxWidth: "440px",
                }}
              >
                {t("hero.subtitle")}
              </p>

              {/* Stats mini */}
              <div
                style={{
                  display: "flex",
                  gap: "clamp(16px, 3vw, 32px)",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { value: "1M+", label: "Downloads" },
                  {
                    value: "4.9",
                    label: "Rating",
                    icon: (
                      <Star
                        size={12}
                        style={{
                          fill: "var(--accent-500)",
                          color: "var(--accent-500)",
                        }}
                      />
                    ),
                  },
                  { value: "50+", label: "Cities" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {stat.icon}
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Link
                  to="/download"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 26px",
                    backgroundColor: "var(--accent-500)",
                    color: "#fff",
                    borderRadius: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "transform 0.2s",
                  }}
                >
                  <Download size={17} />
                  <span>{t("hero.download")}</span>
                </Link>

                <Link
                  to="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 26px",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    borderRadius: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid var(--border-light)",
                    transition: "transform 0.2s",
                  }}
                >
                  <Play size={17} />
                  <span>{t("common.learn_more")}</span>
                </Link>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.95)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                transitionDelay: "0.2s",
              }}
            >
              {/* Phone Frame */}
              <div
                style={{
                  width: "clamp(220px, 35vw, 280px)",
                  aspectRatio: "1 / 2",
                  borderRadius: "32px",
                  border: "3px solid var(--border-light)",
                  backgroundColor: "var(--bg-secondary)",
                  padding: "12px",
                  position: "relative",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                }}
              >
                {/* Notch */}
                <div
                  style={{
                    width: "50%",
                    height: "20px",
                    backgroundColor: "var(--border-light)",
                    borderRadius: "0 0 12px 12px",
                    margin: "0 auto 12px",
                  }}
                />

                {/* Screen Content */}
                <div
                  style={{
                    height: "calc(100% - 32px)",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, var(--accent-500) 0%, var(--accent-400) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Map pins on screen */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: "25%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "20%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      opacity: 0.4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "30%",
                      left: "40%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      opacity: 0.5,
                    }}
                  />

                  {/* Route line */}
                  <svg
                    width="100%"
                    height="60%"
                    style={{
                      position: "absolute",
                      top: "20%",
                      left: 0,
                      opacity: 0.3,
                    }}
                  >
                    <path
                      d="M50 20 Q100 80 150 40 Q180 10 200 60"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 4"
                    />
                  </svg>

                  <Download
                    size={28}
                    style={{ color: "#fff", opacity: 0.9, zIndex: 1 }}
                  />
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  >
                    Tamam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "0 20px clamp(60px, 8vw, 80px)",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 30px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "10px",
            }}
          >
            {t("features.title")}
          </h2>
          <p
            style={{
              fontSize: "clamp(13px, 1.8vw, 15px)",
              color: "var(--text-secondary)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {t("features.subtitle")}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
          }}
        >
          {[
            { icon: Zap, key: "fast" },
            { icon: Shield, key: "secure" },
            { icon: Headphones, key: "support" },
            { icon: Cloud, key: "updates" },
          ].map(({ icon: Icon, key }) => (
            <div
              key={key}
              style={{
                padding: "clamp(20px, 3vw, 28px) clamp(16px, 2vw, 24px)",
                borderRadius: "16px",
                border: "1px solid var(--border-light)",
                backgroundColor: "var(--bg-secondary)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "clamp(40px, 5vw, 48px)",
                  height: "clamp(40px, 5vw, 48px)",
                  borderRadius: "14px",
                  backgroundColor: "var(--accent-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto clamp(12px, 1.5vw, 16px)",
                }}
              >
                <Icon size={20} style={{ color: "var(--accent-500)" }} />
              </div>
              <h3
                style={{
                  fontSize: "clamp(14px, 1.8vw, 16px)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                {t(`features.${key}.title`)}
              </h3>
              <p
                style={{
                  fontSize: "clamp(12px, 1.4vw, 13px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                {t(`features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
