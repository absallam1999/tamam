import React, { useState, useEffect, useRef } from "react";
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
  Smartphone,
  Truck,
  Store,
  Settings,
  ExternalLink,
  ChevronRight,
  Home,
  Info,
  SmartphoneIcon,
  LayoutDashboard,
  Mail,
  Handshake,
  Download,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedSection(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest("[data-menu-toggle]")
      ) {
        setIsOpen(false);
        setExpandedSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : "";
      document.body.style.touchAction = isOpen ? "none" : "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen, isMobile]);

  const mainNavLinks = [
    { path: "/", label: t("nav.home"), icon: Home },
    { path: "/about", label: t("nav.about"), icon: Info },
    { path: "/stores", label: t("nav.stores"), icon: Store },
    { path: "/download", label: t("nav.download"), icon: Download },
    { path: "/partnership", label: t("nav.partnership"), icon: Handshake },
    { path: "/contact", label: t("nav.contact"), icon: Mail },
  ];

  const appsLinks = [
    {
      path: "/apps/customer",
      label: t("nav.apps_customer"),
      icon: Smartphone,
      description: t("nav.apps_customer_desc"),
      badge: "iOS • Android",
    },
    {
      path: "/apps/courier",
      label: t("nav.apps_courier"),
      icon: Truck,
      description: t("nav.apps_courier_desc"),
      badge: "iOS • Android",
    },
    {
      path: "/apps/store",
      label: t("nav.apps_store"),
      icon: Store,
      description: t("nav.apps_store_desc"),
      badge: "Web App",
    },
    {
      path: "/apps/fleet",
      label: t("nav.apps_fleet"),
      icon: LayoutDashboard,
      description: t("nav.apps_fleet_desc"),
      badge: "Web App",
    },
  ];

  const legalLinks = [
    { path: "/privacy", label: t("nav.privacy"), icon: ShieldCheck },
    { path: "/terms", label: t("nav.terms"), icon: FileText },
    { path: "/gdpr", label: t("nav.gdpr"), icon: InfoIcon },
    { path: "/cookies", label: t("nav.cookies"), icon: ShieldCheck },
    { path: "/faq", label: t("nav.faq"), icon: FileQuestion },
  ];

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === "en" ? "ar" : "en");
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isActive = (path) => location.pathname === path;

  const isAppsActive = () => {
    return appsLinks.some((link) => isActive(link.path)) || isActive("/apps");
  };

  const isLegalActive = () => {
    return legalLinks.some((link) => isActive(link.path));
  };

  return (
    <>
      {/* Navbar spacer - pixel perfect height matching */}
      <div style={{ height: isMobile ? "72px" : "88px" }} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: isMobile
            ? scrolled
              ? "8px 8px 0"
              : "12px 8px 0"
            : "16px 16px 0",
          transition: "padding 0.3s ease",
        }}
        ref={navRef}
      >
        <div style={{ width: "100%", maxWidth: "1280px" }}>
          <div
            style={{
              borderRadius: isMobile ? "16px" : "20px",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              backgroundColor: scrolled
                ? darkMode
                  ? "rgba(10, 10, 10, 0.88)"
                  : "rgba(255, 255, 255, 0.88)"
                : darkMode
                  ? "rgba(10, 10, 10, 0.5)"
                  : "rgba(255, 255, 255, 0.5)",
              border: scrolled
                ? darkMode
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.06)"
                : "1px solid transparent",
              boxShadow: scrolled
                ? darkMode
                  ? "0 4px 24px rgba(0, 0, 0, 0.4)"
                  : "0 4px 24px rgba(0, 0, 0, 0.06)"
                : "none",
            }}
          >
            <div
              style={{
                padding: isMobile ? "0 12px" : "0 20px",
                height: isMobile ? "56px" : "64px",
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
                  gap: isMobile ? "8px" : "12px",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "transform 0.2s ease",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isMobile)
                    e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    width: isMobile ? "34px" : "42px",
                    height: isMobile ? "34px" : "42px",
                    borderRadius: isMobile ? "10px" : "14px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="./icon.svg"
                    style={{ width: "100%", height: "100%", display: "block" }}
                    alt="Logo"
                  />
                </div>
                <span
                  style={{
                    fontSize: isMobile ? "15px" : "18px",
                    fontWeight: 800,
                    color: darkMode ? "#f4f4f5" : "#18181b",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("common.brand")}
                </span>
                <span
                  style={{
                    width: isMobile ? "5px" : "6px",
                    height: isMobile ? "5px" : "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-500)",
                    display: "inline-block",
                    flexShrink: 0,
                    boxShadow: darkMode
                      ? "0 0 8px rgba(34, 197, 94, 0.5)"
                      : "0 0 8px rgba(34, 197, 94, 0.3)",
                    animation: "pulseDot 2s ease-in-out infinite",
                    marginTop: "4px",
                    marginLeft: "-2px",
                  }}
                />
              </Link>

              {/* Right Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "2px" : "6px",
                  flexShrink: 0,
                }}
              >
                {/* Theme Toggle */}
                <button
                  onClick={toggleDarkMode}
                  style={{
                    width: isMobile ? "36px" : "42px",
                    height: isMobile ? "36px" : "42px",
                    borderRadius: isMobile ? "10px" : "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    color: darkMode ? "#a1a1aa" : "#52525b",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label="Toggle theme"
                >
                  {darkMode ? (
                    <Sun size={isMobile ? 18 : 20} />
                  ) : (
                    <Moon size={isMobile ? 18 : 20} />
                  )}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  style={{
                    height: isMobile ? "36px" : "42px",
                    borderRadius: isMobile ? "10px" : "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: isMobile ? "0 10px" : "0 14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    color: darkMode ? "#a1a1aa" : "#52525b",
                    fontSize: isMobile ? "11px" : "13px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Globe size={isMobile ? 14 : 16} />
                  <span>{currentLanguage === "en" ? "AR" : "EN"}</span>
                </button>

                {/* Burger Menu Toggle */}
                <button
                  data-menu-toggle
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    width: isMobile ? "36px" : "42px",
                    height: isMobile ? "36px" : "42px",
                    borderRadius: isMobile ? "10px" : "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isOpen
                      ? darkMode
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(34, 197, 94, 0.1)"
                      : "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    color: isOpen
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#a1a1aa"
                        : "#52525b",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X size={isMobile ? 20 : 22} />
                  ) : (
                    <Menu size={isMobile ? 20 : 22} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay - touch friendly */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 55,
            animation: "fadeIn 0.2s ease",
          }}
        />
      )}

      {/* Slide-out Menu */}
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0,
          right: isRTL ? "auto" : isOpen ? "0" : "-100%",
          left: isRTL ? (isOpen ? "0" : "-100%") : "auto",
          width: isMobile ? "100%" : "380px",
          maxWidth: isMobile ? "100%" : "90vw",
          height: "100vh",
          height: "100dvh",
          backgroundColor: darkMode ? "#0a0a0b" : "#ffffff",
          zIndex: 60,
          transition: isRTL
            ? "left 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            : "right 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: isMobile
            ? "none"
            : darkMode
              ? "-20px 0 60px rgba(0,0,0,0.6)"
              : "-20px 0 60px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Menu Header */}
        <div
          style={{
            padding: isMobile ? "12px 16px" : "24px",
            paddingTop: isMobile
              ? "max(12px, env(safe-area-inset-top))"
              : "24px",
            borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "10px" : "12px",
            }}
          >
            <div
              style={{
                width: isMobile ? "32px" : "36px",
                height: isMobile ? "32px" : "36px",
                borderRadius: isMobile ? "8px" : "10px",
                overflow: "hidden",
              }}
            >
              <img
                src="./icon.svg"
                style={{ width: "100%", height: "100%", display: "block" }}
                alt="Logo"
              />
            </div>
            <span
              style={{
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: 700,
                color: darkMode ? "#f4f4f5" : "#18181b",
              }}
            >
              {t("common.brand")}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: isMobile ? "32px" : "36px",
              height: isMobile ? "32px" : "36px",
              borderRadius: isMobile ? "8px" : "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.04)",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#a1a1aa" : "#52525b",
              transition: "all 0.2s ease",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <X size={isMobile ? 18 : 20} />
          </button>
        </div>

        {/* Menu Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: isMobile ? "12px" : "16px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Main Navigation */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: isMobile ? "10px" : "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: isRTL ? "0" : "0.06em",
                color: darkMode ? "#52525b" : "#a1a1aa",
                padding: "0 8px",
                marginBottom: "6px",
              }}
            >
              {isRTL ? "القائمة" : "Navigation"}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1px" }}
            >
              {mainNavLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: isMobile ? "12px 14px" : "14px 16px",
                      borderRadius: isMobile ? "10px" : "12px",
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      backgroundColor: active
                        ? darkMode
                          ? "rgba(34,197,94,0.12)"
                          : "rgba(34,197,94,0.08)"
                        : "transparent",
                      color: active
                        ? "var(--accent-500)"
                        : darkMode
                          ? "#d4d4d8"
                          : "#3f3f46",
                      fontWeight: active ? 600 : 500,
                      fontSize: isMobile ? "14px" : "15px",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "34px" : "38px",
                        height: isMobile ? "34px" : "38px",
                        borderRadius: isMobile ? "8px" : "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        backgroundColor: active
                          ? darkMode
                            ? "rgba(34,197,94,0.2)"
                            : "rgba(34,197,94,0.12)"
                          : darkMode
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.03)",
                        color: active
                          ? "var(--accent-500)"
                          : darkMode
                            ? "#a1a1aa"
                            : "#71717a",
                      }}
                    >
                      <Icon size={isMobile ? 18 : 20} />
                    </div>
                    <span style={{ flex: 1 }}>{link.label}</span>
                    <ChevronRight
                      size={isMobile ? 14 : 16}
                      style={{
                        opacity: 0.3,
                        flexShrink: 0,
                        transform: isRTL ? "scaleX(-1)" : "none",
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)",
              margin: "4px 0 12px",
            }}
          />

          {/* Apps Section */}
          <div style={{ marginBottom: "12px" }}>
            <button
              onClick={() => toggleSection("apps")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: isMobile ? "12px 14px" : "14px 16px",
                borderRadius: isMobile ? "10px" : "12px",
                border: "none",
                background:
                  expandedSection === "apps" || isAppsActive()
                    ? darkMode
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(34,197,94,0.08)"
                    : "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                color:
                  expandedSection === "apps" || isAppsActive()
                    ? "var(--accent-500)"
                    : darkMode
                      ? "#d4d4d8"
                      : "#3f3f46",
                fontWeight: 600,
                fontSize: isMobile ? "14px" : "15px",
                transition: "all 0.15s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                style={{
                  width: isMobile ? "34px" : "38px",
                  height: isMobile ? "34px" : "38px",
                  borderRadius: isMobile ? "8px" : "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backgroundColor:
                    expandedSection === "apps" || isAppsActive()
                      ? darkMode
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(34,197,94,0.12)"
                      : darkMode
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.03)",
                  color:
                    expandedSection === "apps" || isAppsActive()
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#a1a1aa"
                        : "#71717a",
                }}
              >
                <SmartphoneIcon size={isMobile ? 18 : 20} />
              </div>
              <span style={{ flex: 1 }}>{t("nav.apps")}</span>
              <ChevronDown
                size={isMobile ? 14 : 16}
                style={{
                  transition: "transform 0.2s ease",
                  transform:
                    expandedSection === "apps" ? "rotate(180deg)" : "rotate(0)",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            </button>

            {expandedSection === "apps" && (
              <div
                style={{
                  padding: "2px 6px 6px",
                  animation: "expandIn 0.25s ease",
                }}
              >
                {appsLinks.map((link) => {
                  const active = isActive(link.path);
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
                        padding: isMobile ? "10px 12px" : "10px 14px",
                        borderRadius: isMobile ? "8px" : "10px",
                        textDecoration: "none",
                        color: active
                          ? "var(--accent-500)"
                          : darkMode
                            ? "#d4d4d8"
                            : "#3f3f46",
                        backgroundColor: active
                          ? darkMode
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(34,197,94,0.08)"
                          : "transparent",
                        transition: "all 0.15s ease",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <Icon
                        size={isMobile ? 16 : 18}
                        style={{ flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: isMobile ? "12px" : "13px",
                            fontWeight: 500,
                          }}
                        >
                          {link.label}
                        </div>
                        <div
                          style={{
                            fontSize: isMobile ? "10px" : "11px",
                            color: darkMode ? "#71717a" : "#a1a1aa",
                          }}
                        >
                          {link.description}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: isMobile ? "9px" : "10px",
                          fontWeight: 600,
                          padding: isMobile ? "2px 6px" : "2px 8px",
                          borderRadius: "20px",
                          backgroundColor: darkMode
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(34,197,94,0.1)",
                          color: "var(--accent-500)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {link.badge}
                      </span>
                    </Link>
                  );
                })}

                <Link
                  to="/apps"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: isMobile ? "10px 12px" : "10px 14px",
                    borderRadius: isMobile ? "8px" : "10px",
                    textDecoration: "none",
                    color: isActive("/apps")
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#d4d4d8"
                        : "#3f3f46",
                    backgroundColor: isActive("/apps")
                      ? darkMode
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(34,197,94,0.08)"
                      : "transparent",
                    transition: "all 0.15s ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Settings
                    size={isMobile ? 16 : 18}
                    style={{ flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: isMobile ? "12px" : "13px",
                        fontWeight: 600,
                      }}
                    >
                      {t("nav.apps_all")}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "10px" : "11px",
                        color: darkMode ? "#71717a" : "#a1a1aa",
                      }}
                    >
                      {isRTL
                        ? "استكشف جميع تطبيقات تمام"
                        : "Explore all Tamam applications"}
                    </div>
                  </div>
                  <ExternalLink
                    size={isMobile ? 12 : 13}
                    style={{ opacity: 0.4, flexShrink: 0 }}
                  />
                </Link>
              </div>
            )}
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.06)",
              margin: "4px 0 12px",
            }}
          />

          {/* Legal Section */}
          <div>
            <button
              onClick={() => toggleSection("legal")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: isMobile ? "12px 14px" : "14px 16px",
                borderRadius: isMobile ? "10px" : "12px",
                border: "none",
                background:
                  expandedSection === "legal" || isLegalActive()
                    ? darkMode
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(34,197,94,0.08)"
                    : "transparent",
                cursor: "pointer",
                fontFamily: "inherit",
                color:
                  expandedSection === "legal" || isLegalActive()
                    ? "var(--accent-500)"
                    : darkMode
                      ? "#d4d4d8"
                      : "#3f3f46",
                fontWeight: 600,
                fontSize: isMobile ? "14px" : "15px",
                transition: "all 0.15s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                style={{
                  width: isMobile ? "34px" : "38px",
                  height: isMobile ? "34px" : "38px",
                  borderRadius: isMobile ? "8px" : "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backgroundColor:
                    expandedSection === "legal" || isLegalActive()
                      ? darkMode
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(34,197,94,0.12)"
                      : darkMode
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.03)",
                  color:
                    expandedSection === "legal" || isLegalActive()
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#a1a1aa"
                        : "#71717a",
                }}
              >
                <ShieldCheck size={isMobile ? 18 : 20} />
              </div>
              <span style={{ flex: 1 }}>{t("nav.legal")}</span>
              <ChevronDown
                size={isMobile ? 14 : 16}
                style={{
                  transition: "transform 0.2s ease",
                  transform:
                    expandedSection === "legal"
                      ? "rotate(180deg)"
                      : "rotate(0)",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            </button>

            {expandedSection === "legal" && (
              <div
                style={{
                  padding: "2px 6px 6px",
                  animation: "expandIn 0.25s ease",
                }}
              >
                {legalLinks.map((link) => {
                  const active = isActive(link.path);
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
                        padding: isMobile ? "10px 12px" : "10px 14px",
                        borderRadius: isMobile ? "8px" : "10px",
                        textDecoration: "none",
                        color: active
                          ? "var(--accent-500)"
                          : darkMode
                            ? "#d4d4d8"
                            : "#3f3f46",
                        backgroundColor: active
                          ? darkMode
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(34,197,94,0.08)"
                          : "transparent",
                        fontWeight: 500,
                        fontSize: isMobile ? "13px" : "14px",
                        transition: "all 0.15s ease",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <Icon
                        size={isMobile ? 16 : 18}
                        style={{ flexShrink: 0 }}
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Menu Footer */}
        <div
          style={{
            padding: isMobile ? "16px 20px" : "20px 24px",
            paddingBottom: isMobile
              ? "max(16px, env(safe-area-inset-bottom))"
              : "20px",
            borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontSize: isMobile ? "11px" : "12px",
              color: darkMode ? "#52525b" : "#a1a1aa",
              textAlign: "center",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} {t("common.brand")}.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expandIn {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 600px; }
        }
        @keyframes pulseDot {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.3); 
          }
        }
        @media (max-width: 767px) {
          /* Prevent pull-to-refresh when menu is open */
          body.menu-open {
            overscroll-behavior: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
