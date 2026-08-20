import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  ChevronDown,
  Mail,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

const FAQ = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestions, setOpenQuestions] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
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

  const categories = [
    { id: "all", key: "general", label: t("faq.categories.general") },
    { id: "orders", key: "orders", label: t("faq.categories.orders") },
    { id: "payments", key: "payments", label: t("faq.categories.payments") },
    { id: "account", key: "account", label: t("faq.categories.account") },
    { id: "support", key: "support", label: t("faq.categories.support") },
  ];

  const allQuestions = [
    { id: 1, category: "general", q: "q1", a: "a1" },
    { id: 2, category: "orders", q: "q2", a: "a2" },
    { id: 3, category: "general", q: "q3", a: "a3" },
    { id: 4, category: "orders", q: "q4", a: "a4" },
    { id: 5, category: "payments", q: "q5", a: "a5" },
    { id: 6, category: "payments", q: "q6", a: "a6" },
    { id: 7, category: "orders", q: "q7", a: "a7" },
    { id: 8, category: "support", q: "q8", a: "a8" },
    { id: 9, category: "account", q: "q9", a: "a9" },
    { id: 10, category: "account", q: "q10", a: "a10" },
    { id: 11, category: "support", q: "q11", a: "a11" },
    { id: 12, category: "orders", q: "q12", a: "a12" },
    { id: 13, category: "payments", q: "q13", a: "a13" },
    { id: 14, category: "payments", q: "q14", a: "a14" },
    { id: 15, category: "orders", q: "q15", a: "a15" },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = allQuestions.filter((q) => {
    const matchesCategory =
      activeCategory === "all" || q.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      t(`faq.questions.${q.q}`)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      t(`faq.questions.${q.a}`)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            marginBottom: "40px",
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
            <HelpCircle size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.faq")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            {t("faq.title")}
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: darkMode ? "#a1a1aa" : "#52525b",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "520px",
            }}
          >
            {t("faq.description")}
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            position: "relative",
            marginBottom: "28px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.15s",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              [isRTL ? "right" : "left"]: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: darkMode ? "#71717a" : "#a1a1aa",
            }}
          />
          <input
            type="text"
            placeholder={t("faq.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: isRTL ? "12px 40px 12px 16px" : "12px 16px 12px 40px",
              borderRadius: "14px",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              color: darkMode ? "#f4f4f5" : "#18181b",
              fontSize: "14px",
              outline: "none",
              direction: dir,
            }}
          />
        </div>

        {/* Categories */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "36px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.25s",
            direction: dir,
          }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "8px 18px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              border:
                activeCategory === "all"
                  ? "none"
                  : darkMode
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
              backgroundColor:
                activeCategory === "all" ? "var(--accent-500)" : "transparent",
              color:
                activeCategory === "all"
                  ? "#fff"
                  : darkMode
                    ? "#a1a1aa"
                    : "#71717a",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t("faq.categories.general")}
          </button>
          {categories.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 18px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 600,
                border:
                  activeCategory === cat.id
                    ? "none"
                    : darkMode
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.08)",
                backgroundColor:
                  activeCategory === cat.id
                    ? "var(--accent-500)"
                    : "transparent",
                color:
                  activeCategory === cat.id
                    ? "#fff"
                    : darkMode
                      ? "#a1a1aa"
                      : "#71717a",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div style={{ direction: dir }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <div
                key={q.id}
                style={{
                  marginBottom: "8px",
                  borderRadius: "14px",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  overflow: "hidden",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.4s ease ${0.3 + index * 0.04}s`,
                }}
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: openQuestions[q.id]
                      ? "var(--accent-500)"
                      : darkMode
                        ? "#e4e4e7"
                        : "#27272a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: isRTL ? "right" : "left",
                    direction: dir,
                    transition: "color 0.2s ease",
                  }}
                >
                  <span style={{ flex: 1 }}>{t(`faq.questions.${q.q}`)}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: openQuestions[q.id]
                        ? "var(--accent-500)"
                        : darkMode
                          ? "#71717a"
                          : "#a1a1aa",
                      transform: openQuestions[q.id]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                      marginLeft: isRTL ? "0" : "12px",
                      marginRight: isRTL ? "12px" : "0",
                    }}
                  />
                </button>
                {openQuestions[q.id] && (
                  <div
                    style={{
                      padding: "0 20px 16px",
                      borderTop: darkMode
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        color: darkMode ? "#a1a1aa" : "#52525b",
                        lineHeight: 1.7,
                        paddingTop: "12px",
                        margin: 0,
                      }}
                    >
                      {t(`faq.questions.${q.a}`)}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <HelpCircle
                size={40}
                style={{
                  color: darkMode ? "#52525b" : "#d4d4d8",
                  marginBottom: "12px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  color: darkMode ? "#a1a1aa" : "#71717a",
                }}
              >
                {t("faq.noResults")}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: darkMode ? "#71717a" : "#a1a1aa",
                  marginTop: "4px",
                }}
              >
                {t("faq.tryDifferent")}
              </p>
            </div>
          )}
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
            href="mailto:contact@tamaam.cloud"
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
            <span>contact@tamaam.cloud</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
