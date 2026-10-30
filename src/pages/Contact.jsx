import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

/* =========================================================
   SHARED DESIGN TOKENS
   ========================================================= */
const TOKENS = {
  dark: {
    text: "#f4f4f5",
    textStrong: "#fafafa",
    textMuted: "#a1a1aa",
    textFaint: "#71717a",
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

const Contact = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 40);
    return () => clearTimeout(timer);
  }, [isRTL]);

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  const glassStyle = {
    background: c.surfaceGradient,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${c.border}`,
    boxShadow: c.shadow,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "14px",
    border: `1px solid ${c.border}`,
    backgroundColor: darkMode
      ? "rgba(255,255,255,0.03)"
      : "rgba(255,255,255,0.8)",
    color: c.text,
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    direction: dir,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: c.textMuted,
    marginBottom: "6px",
    letterSpacing: isRTL ? "0" : "0.02em",
  };

  const contactCards = [
    {
      icon: MapPin,
      label: isRTL ? "المقر الرئيسي" : "Headquarters",
      value: isRTL ? "محافظة البحيرة، مصر" : "Beheira Governorate, Egypt",
    },
    {
      icon: Phone,
      label: isRTL ? "اتصل بنا" : "Call Us",
      value: "+20 (015) 594 777 26",
      href: "tel:+2001559477726",
      forceLtr: true,
    },
    {
      icon: Mail,
      label: isRTL ? "متاح دائماً" : "For Support",
      value: "support@tamamapp.net",
      href: "mailto:support@tamamapp.net",
      forceLtr: true,
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        color: c.text,
        position: "relative",
        overflowX: "hidden",
        background: "transparent",
        transition: "color 0.3s ease",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: isRTL ? "auto" : "10%",
          right: isRTL ? "10%" : "auto",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: isRTL ? "auto" : "5%",
          left: isRTL ? "5%" : "auto",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: isMobile ? "90px 20px 80px" : "120px 24px 100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Breadcrumb Navigation */}
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
              e.currentTarget.style.transform =
                "translateX(isRTL ? 4px : -4px)";
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

        {/* ========== HERO HEADER ========== */}
        <section
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            direction: dir,
            marginBottom: "48px",
          }}
        >
          {/* Micro Tag */}
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
            <Mail size={14} />
            <span>{t("nav.contact")}</span>
          </div>

          <h1
            style={{
              fontSize: isMobile
                ? "clamp(32px, 8vw, 44px)"
                : "clamp(40px, 4.4vw, 54px)",
              fontWeight: 900,
              letterSpacing: isRTL ? "0" : "-0.03em",
              lineHeight: 1.15,
              marginBottom: "16px",
              color: c.textStrong,
              maxWidth: "760px",
            }}
          >
            {t("contact.title")}
          </h1>

          <p
            style={{
              fontSize: isMobile ? "15px" : "17px",
              color: c.textMuted,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "620px",
              fontWeight: 450,
            }}
          >
            {t("contact.subtitle")}
          </p>
        </section>

        {/* ========== CONTACT CARDS ========== */}
        <section
          aria-label="Contact channels"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "18px",
            marginBottom: "48px",
            direction: dir,
          }}
        >
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.href ? "a" : "div";
            const wrapperProps = card.href
              ? {
                  href: card.href,
                  onMouseEnter: (e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = c.badgeBorder;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = c.border;
                  },
                }
              : {};

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                style={{
                  ...glassStyle,
                  padding: "24px 20px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s ease",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: `${0.1 + i * 0.06}s`,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: c.badgeBg,
                    border: `1px solid ${c.badgeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: c.textMuted,
                      marginBottom: "4px",
                      letterSpacing: isRTL ? "0" : "0.02em",
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: card.href ? ACCENT : c.text,
                      wordBreak: "break-word",
                      lineHeight: 1.4,
                      ...(card.forceLtr && {
                        direction: "ltr",
                        textAlign: isRTL ? "right" : "left",
                        unicodeBidi: "plaintext",
                      }),
                    }}
                  >
                    {card.value}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </section>

        {/* ========== MAP + FORM ========== */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
            marginBottom: "60px",
            alignItems: "stretch",
            direction: dir,
          }}
        >
          {/* Map */}
          <div
            style={{
              ...glassStyle,
              padding: "10px",
              borderRadius: "24px",
              overflow: "hidden",
              minHeight: isMobile ? "300px" : "500px",
              display: "flex",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.25s",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d733225.8334748033!2d30.2410693!3d30.672428549999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5df170cf16483%3A0x57d476469e3f3ce5!2sBeheira%20Governorate!5e1!3m2!1sen!2seg!4v1793370947415!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "16px", flex: 1 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tamam Location"
            />
          </div>

          {/* Form Card */}
          <div
            style={{
              ...glassStyle,
              padding: isMobile ? "28px 22px" : "32px",
              borderRadius: "24px",
              display: "flex",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 0.3s",
            }}
          >
            {sent ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  flex: 1,
                  padding: "20px 0",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "20px",
                    background: c.badgeBg,
                    border: `1px solid ${c.badgeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <CheckCircle2 size={30} color={ACCENT} />
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    color: c.textStrong,
                    marginBottom: "8px",
                  }}
                >
                  {t("contact.success")}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: c.textMuted,
                    maxWidth: "300px",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {t("contact.successMessage")}
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    ...glassStyle,
                    padding: "12px 24px",
                    borderRadius: "12px",
                    color: c.text,
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = c.badgeBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = c.border;
                  }}
                >
                  {isRTL ? "إرسال رسالة أخرى" : "Send another message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  width: "100%",
                }}
              >
                {/* Form header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "11px",
                      background: c.badgeBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MessageSquare size={18} color={ACCENT} />
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: c.textMuted,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {t("contact.formIntro")}
                  </p>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>{t("contact.name")}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = ACCENT;
                      e.target.style.boxShadow = `0 0 0 3px ${c.badgeBg}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = c.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>{t("contact.email")}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = ACCENT;
                      e.target.style.boxShadow = `0 0 0 3px ${c.badgeBg}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = c.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={labelStyle}>{t("contact.message")}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", flex: 1 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = ACCENT;
                      e.target.style.boxShadow = `0 0 0 3px ${c.badgeBg}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = c.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "15px 24px",
                    borderRadius: "14px",
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #16a34a 100%)`,
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 10px 25px rgba(34,197,94,0.35)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 35px rgba(34,197,94,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(34,197,94,0.35)";
                  }}
                >
                  <Send size={16} />
                  <span>{t("contact.send")}</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: c.border,
            margin: "0 0 32px",
          }}
        />

        {/* ========== FAQ LINK ========== */}
        <div style={{ textAlign: "center", direction: dir }}>
          <p
            style={{
              fontSize: "14px",
              color: c.textMuted,
              marginBottom: "16px",
            }}
          >
            {t("faq.stillHaveQuestions")}
          </p>
          <Link
            to="/faq"
            style={{
              ...glassStyle,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "14px",
              color: c.text,
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 700,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = c.badgeBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = c.border;
            }}
          >
            <Mail size={18} color={ACCENT} />
            <span>{t("faq.title")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Contact;
