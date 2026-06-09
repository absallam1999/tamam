import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Send, Headset } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

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
    padding: "clamp(10px, 1.5vw, 14px) clamp(12px, 1.5vw, 16px)",
    borderRadius: "12px",
    border: "1px solid var(--border-light)",
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "clamp(13px, 1.5vw, 14px)",
    outline: "none",
    fontFamily: "inherit",
  };

  const cardStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(10px, 1.5vw, 14px)",
    padding: "clamp(12px, 1.5vw, 16px)",
    borderRadius: "12px",
    border: "1px solid var(--border-light)",
    backgroundColor: "var(--bg-secondary)",
  };

  return (
    <div
      style={{ minHeight: "100vh", padding: "clamp(60px, 8vw, 100px) 20px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Title */}
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--accent-500)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "10px",
          }}
        >
          {t("nav.contact")}
        </p>
        <h1
          style={{
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          {t("contact.title")}
        </h1>
        <p
          style={{
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "clamp(40px, 5vw, 56px)",
            maxWidth: "520px",
          }}
        >
          {t("contact.subtitle")}
        </p>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(24px, 3vw, 40px)",
            marginBottom: "clamp(40px, 5vw, 60px)",
          }}
        >
          {/* Left - Contact Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* Map */}
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--border-light)",
                height: "clamp(140px, 20vw, 200px)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TamamApp Location"
              />
            </div>

            {/* Address */}
            <div style={cardStyle}>
              <MapPin
                size={18}
                style={{
                  color: "var(--accent-500)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "2px",
                  }}
                >
                  {t("contact.address")}
                </p>
                <p
                  style={{
                    fontSize: "clamp(11px, 1.3vw, 13px)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {t("contact.hours")}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={cardStyle}>
              <Phone
                size={18}
                style={{
                  color: "var(--accent-500)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "2px",
                  }}
                >
                  {t("contact.phone")}
                </p>
                <p
                  style={{
                    fontSize: "clamp(11px, 1.3vw, 13px)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {t("contact.hours")}
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={cardStyle}>
              <Mail
                size={18}
                style={{
                  color: "var(--accent-500)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "2px",
                  }}
                >
                  {t("contact.email_us")}
                </p>
                <p
                  style={{
                    fontSize: "clamp(11px, 1.3vw, 13px)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {t("contact.hours")}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <p
              style={{
                fontSize: "clamp(13px, 1.5vw, 14px)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                marginBottom: "clamp(14px, 2vw, 20px)",
              }}
            >
              {t("contact.formIntro")}
            </p>

            {sent ? (
              <div
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  borderRadius: "12px",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-secondary)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "300px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(15px, 2vw, 16px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {t("contact.success")}
                </p>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t("contact.successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "clamp(12px, 1.5vw, 16px)" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(12px, 1.3vw, 13px)",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: "clamp(12px, 1.5vw, 16px)" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(12px, 1.3vw, 13px)",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: "clamp(16px, 2vw, 20px)" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(12px, 1.3vw, 13px)",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    {t("contact.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "120px",
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
                    gap: "8px",
                    padding: "clamp(10px, 1.5vw, 14px) clamp(16px, 2vw, 24px)",
                    backgroundColor: "var(--accent-500)",
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Send size={16} />
                  <span>{t("contact.send")}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--border-light)",
            margin: "clamp(32px, 4vw, 48px) 0",
          }}
        />

        {/* FAQ Link */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 14px)",
              color: "var(--text-secondary)",
              marginBottom: "14px",
            }}
          >
            {t("faq.stillHaveQuestions")}
          </p>
          <Link
            to="/faq"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(10px, 1.5vw, 14px) clamp(16px, 2vw, 24px)",
              backgroundColor: "var(--accent-500)",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "clamp(13px, 1.5vw, 14px)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Headset size={16} />
            <span>{t("faq.title")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
