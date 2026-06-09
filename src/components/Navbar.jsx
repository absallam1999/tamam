import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ShieldCheck,
  FileText,
  InfoIcon,
  FileQuestion,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mainNavLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/download", label: t("nav.download") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const legalLinks = [
    { path: "/privacy", label: t("nav.privacy"), icon: ShieldCheck },
    { path: "/terms", label: t("nav.terms"), icon: FileText },
    { path: "/gdpr", label: t("nav.gdpr"), icon: InfoIcon },
    { path: "/cookies", label: t("nav.cookies"), icon: ShieldCheck },
    { path: "/faq", label: t("nav.faq"), icon: FileQuestion },
  ];

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (active) => ({
    fontSize: "13px",
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: "10px",
    color: active ? "var(--accent-500)" : "var(--text-secondary)",
    backgroundColor: active ? "var(--accent-50)" : "transparent",
    textDecoration: "none",
    transition: "all 200ms",
  });

  return (
    <>
      <div style={{ height: "64px" }} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <div style={{ width: "95%", maxWidth: "1280px" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              transition: "all 500ms",
              backgroundColor: scrolled ? "var(--bg-secondary)" : "transparent",
              border: scrolled
                ? "1px solid var(--border-light)"
                : "1px solid transparent",
            }}
          >
            <div
              style={{
                padding: "0 20px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Logo */}
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                <img
                  src="./icon.svg"
                  style={{ width: "28px", height: "28px" }}
                  alt="Logo"
                />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                  className="hidden sm:block"
                >
                  {t("common.brand")}
                </span>
              </Link>

              {/* Desktop Nav */}
              <div
                className="hidden lg:flex"
                style={{ display: "none", alignItems: "center", gap: "16px" }}
              >
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={linkStyle(isActive(link.path))}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Legal Dropdown */}
                <div style={{ position: "relative" }}>
                  <button
                    style={{
                      ...linkStyle(legalLinks.some((l) => isActive(l.path))),
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("nav.legal")}
                    <ChevronDown size={13} />
                  </button>
                </div>
              </div>

              {/* Right Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={toggleDarkMode}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-tertiary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <button
                  onClick={toggleLanguage}
                  style={{
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0 10px",
                    color: "var(--text-tertiary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  <Globe size={14} />
                  {currentLanguage === "en" ? "AR" : "EN"}
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-tertiary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 55,
          }}
        />
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "12px",
            left: "12px",
            maxWidth: "340px",
            margin: isRTL ? "0 0 0 auto" : "0 auto 0 0",
            borderRadius: "16px",
            border: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-secondary)",
            zIndex: 60,
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive(link.path)
                    ? "var(--accent-500)"
                    : "var(--text-secondary)",
                  textDecoration: "none",
                  backgroundColor: isActive(link.path)
                    ? "var(--accent-50)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--border-light)",
              margin: "12px 0",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {legalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isActive(link.path)
                      ? "var(--accent-500)"
                      : "var(--text-secondary)",
                    textDecoration: "none",
                    backgroundColor: isActive(link.path)
                      ? "var(--accent-50)"
                      : "transparent",
                  }}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
