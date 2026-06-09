import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isRTL = i18n.language === "ar";

  const legalLinks = [
    { path: "/privacy", label: t("nav.privacy") },
    { path: "/terms", label: t("nav.terms") },
    { path: "/faq", label: t("nav.faq") },
    { path: "/cookies", label: t("nav.cookies") },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg
          width="15"
          height="15"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg
          width="15"
          height="15"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg
          width="15"
          height="15"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg
          width="15"
          height="15"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "95%",
          maxWidth: "1280px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(to right, transparent, var(--accent-400), transparent)",
              opacity: 0.5,
            }}
          />

          <div style={{ padding: "8px 20px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              {/* Brand */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="./icon.svg"
                    style={{ width: "26px", height: "26px" }}
                    alt="Logo"
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {t("common.brand")}
                  </span>
                </Link>
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-tertiary)",
                    opacity: 0.3,
                  }}
                />
                <span
                  style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
                >
                  © {currentYear}
                </span>
              </div>

              {/* Legal Links */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        padding: "4px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      {link.label}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-tertiary)",
                          opacity: 0.4,
                        }}
                      >
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Social Icons */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "1px" }}
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-tertiary)",
                      textDecoration: "none",
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
