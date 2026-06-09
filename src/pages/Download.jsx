import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Apple, Smartphone, QrCode, Headset } from "lucide-react";

const Download = () => {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Title */}
        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "var(--accent-500)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          {t("nav.download")}
        </p>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          {t("download.title")}
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "520px",
          }}
        >
          {t("download.subtitle")}
        </p>

        {/* Platform Info */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-tertiary)",
            marginBottom: "32px",
          }}
        >
          {t("download.requirements")} · {t("download.version")}
        </p>

        {/* Download Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
              backgroundColor: "var(--bg-secondary)",
              textDecoration: "none",
              color: "var(--text-primary)",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            <Apple size={22} style={{ color: "var(--accent-500)" }} />
            <span>{t("download.ios")}</span>
          </a>

          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
              backgroundColor: "var(--bg-secondary)",
              textDecoration: "none",
              color: "var(--text-primary)",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            <Smartphone size={22} style={{ color: "var(--accent-500)" }} />
            <span>{t("download.android")}</span>
          </a>
        </div>

        {/* QR Code */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "4px",
              textAlign: "start",
            }}
          >
            {t("download.qr")}
          </p>
          <QrCode
            size={80}
            style={{ color: "var(--text-primary)", marginBottom: "16px" }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--border-light)",
            margin: "60px 0 32px",
          }}
        />

        {/* Contact */}
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "16px",
          }}
        >
          {t("faq.stillHaveQuestions")}
        </p>
        <div style={{ textAlign: "center" }}>
          <Link
            to="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "var(--accent-500)",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Headset size={16} />
            <span>{t("faq.contactSupport")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Download;
