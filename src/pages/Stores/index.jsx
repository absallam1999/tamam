import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Star,
  MapPin,
  Clock,
  Store,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LangContext";
import { useAllStores } from "../../hooks/useBrowse";

const Stores = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const {
    stores,
    cities,
    search,
    selectedCityId,
    page,
    totalPages,
    total,
    storesLoading,
    storesError,
    handleSearch,
    handleCityChange,
    handlePageChange,
    pageSize,
  } = useAllStores();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dir = isRTL ? "rtl" : "ltr";

  // Generate pagination numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding:
            "clamp(80px, 10vw, 100px) clamp(16px, 4vw, 24px) clamp(60px, 8vw, 80px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            direction: dir,
            marginBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(6px, 1vw, 8px)",
              color: darkMode ? "#a1a1aa" : "#71717a",
              textDecoration: "none",
              fontSize: "clamp(13px, 1.5vw, 14px)",
              fontWeight: 500,
              marginBottom: "clamp(16px, 2vw, 24px)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent-500)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = darkMode ? "#a1a1aa" : "#71717a")
            }
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{isRTL ? "العودة للرئيسية" : "Back to Home"}</span>
          </Link>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#09090b",
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "clamp(6px, 1vw, 8px)",
            }}
          >
            {isRTL ? "جميع المتاجر" : "All Stores"}
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 1.8vw, 16px)",
              color: darkMode ? "#a1a1aa" : "#52525b",
            }}
          >
            {isRTL
              ? `تصفح ${total} متجر في جميع المناطق`
              : `Browse ${total} stores across all areas`}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 1.5vw, 12px)",
            marginBottom: "clamp(24px, 4vw, 36px)",
            flexWrap: "wrap",
            direction: dir,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          {/* Search Input */}
          <div style={{ flex: "1", minWidth: "240px", position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#a1a1aa" : "#71717a",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={
                isRTL
                  ? "ابحث عن مطعم أو متجر..."
                  : "Search for a restaurant or store..."
              }
              style={{
                width: "100%",
                padding: isRTL ? "12px 42px 12px 16px" : "12px 16px 12px 42px",
                borderRadius: "14px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                color: darkMode ? "#f4f4f5" : "#18181b",
                fontSize: "clamp(13px, 1.5vw, 14px)",
                outline: "none",
                fontFamily: "inherit",
                direction: dir,
                transition: "all 0.25s ease",
                boxShadow: darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(34,197,94,0.5)"
                  : "rgba(34,197,94,0.4)";
                e.target.style.boxShadow = darkMode
                  ? "0 0 0 3px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 0 0 3px rgba(34,197,94,0.1), 0 2px 8px rgba(0,0,0,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.target.style.boxShadow = darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)";
              }}
            />
          </div>

          {/* City Dropdown */}
          <div style={{ position: "relative", minWidth: "170px" }}>
            <MapPin
              size={14}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#a1a1aa" : "#71717a",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: "100%",
                padding: isRTL ? "12px 38px 12px 38px" : "12px 38px 12px 38px",
                borderRadius: "14px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                color: darkMode ? "#f4f4f5" : "#18181b",
                fontSize: "clamp(13px, 1.5vw, 14px)",
                outline: "none",
                fontFamily: "inherit",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                direction: dir,
                transition: "all 0.25s ease",
                boxShadow: darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(34,197,94,0.5)"
                  : "rgba(34,197,94,0.4)";
                e.target.style.boxShadow = darkMode
                  ? "0 0 0 3px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 0 0 3px rgba(34,197,94,0.1), 0 2px 8px rgba(0,0,0,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)";
                e.target.style.boxShadow = darkMode
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.04)";
              }}
            >
              <option
                value=""
                style={{
                  backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                  color: darkMode ? "#f4f4f5" : "#18181b",
                }}
              >
                {isRTL ? "جميع المناطق" : "All Areas"}
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                  style={{
                    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                    color: darkMode ? "#f4f4f5" : "#18181b",
                  }}
                >
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              style={{
                position: "absolute",
                [isRTL ? "left" : "right"]: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#a1a1aa" : "#71717a",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Results Count */}
        {!storesLoading && !storesError && stores.length > 0 && (
          <div
            style={{
              direction: dir,
              marginBottom: "clamp(16px, 2vw, 20px)",
              fontSize: "clamp(12px, 1.3vw, 13px)",
              color: darkMode ? "#71717a" : "#a1a1aa",
              opacity: isVisible ? 1 : 0,
              transition: "all 0.5s ease 0.2s",
            }}
          >
            {isRTL
              ? `عرض ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} من ${total} متجر`
              : `Showing ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total} stores`}
          </div>
        )}

        {/* Store Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "clamp(12px, 2vw, 16px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          {storesLoading ? (
            // Loading skeletons
            Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "20px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  direction: dir,
                }}
              >
                <div
                  style={{
                    height: "120px",
                    backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                    animation: "pulse 2s infinite",
                  }}
                />
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      height: "16px",
                      width: "75%",
                      backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{
                      height: "12px",
                      width: "50%",
                      backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "12px",
                        width: "40%",
                        backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                        borderRadius: "8px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <div
                      style={{
                        height: "12px",
                        width: "25%",
                        backgroundColor: darkMode ? "#3f3f46" : "#d4d4d8",
                        borderRadius: "8px",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : storesError ? (
            // Error state
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store
                size={48}
                style={{
                  color: darkMode ? "#52525b" : "#d4d4d8",
                  marginBottom: "16px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: darkMode ? "#a1a1aa" : "#71717a",
                }}
              >
                {isRTL ? "تعذر تحميل المتاجر" : "Unable to load stores"}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: darkMode ? "#71717a" : "#a1a1aa",
                  marginTop: "4px",
                }}
              >
                {isRTL
                  ? "يرجى المحاولة مرة أخرى لاحقاً"
                  : "Please try again later"}
              </p>
            </div>
          ) : stores.length === 0 ? (
            // Empty state
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "64px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Store
                size={48}
                style={{
                  color: darkMode ? "#52525b" : "#d4d4d8",
                  marginBottom: "16px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: darkMode ? "#a1a1aa" : "#71717a",
                }}
              >
                {isRTL ? "لا توجد متاجر متاحة" : "No stores available"}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: darkMode ? "#71717a" : "#a1a1aa",
                  marginTop: "4px",
                }}
              >
                {isRTL
                  ? "جرب البحث عن منطقة أخرى"
                  : "Try searching for a different area"}
              </p>
            </div>
          ) : (
            // Store cards from API
            stores.map((store) => (
              <Link
                key={store.id}
                to={`/store/${store.id}`}
                style={{
                  borderRadius: "20px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(20px)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  direction: dir,
                  textDecoration: "none",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(34,197,94,0.2)"
                    : "rgba(34,197,94,0.15)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 16px 40px rgba(0,0,0,0.3)"
                    : "0 16px 40px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Store Cover */}
                <div
                  style={{
                    height: "120px",
                    background: darkMode
                      ? "linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 100%)"
                      : "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    position: "relative",
                  }}
                >
                  {store.coverUrl ? (
                    <img
                      src={store.coverUrl}
                      alt={isRTL ? store.nameAr : store.nameEn}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <Store
                      size={40}
                      style={{
                        color: darkMode ? "#52525b" : "rgba(5,150,105,0.4)",
                      }}
                    />
                  )}

                  {/* Delivery Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      [isRTL ? "left" : "right"]: "10px",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      backgroundColor: darkMode
                        ? "rgba(0,0,0,0.5)"
                        : "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(8px)",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: darkMode ? "#d4d4d8" : "#3f3f46",
                      direction: dir,
                    }}
                  >
                    <Clock
                      size={10}
                      style={{
                        display: "inline",
                        marginRight: isRTL ? "0" : "4px",
                        marginLeft: isRTL ? "4px" : "0",
                      }}
                    />
                    {store.estimatedPreparationMinutes
                      ? `${store.estimatedPreparationMinutes} ${isRTL ? "دقيقة" : "min"}`
                      : isRTL
                        ? "20-30 دقيقة"
                        : "20-30 min"}
                  </div>
                </div>

                {/* Store Info */}
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: darkMode ? "#f4f4f5" : "#18181b",
                          marginBottom: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isRTL ? store.nameAr : store.nameEn}
                      </h3>
                      {store.city && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: darkMode ? "#71717a" : "#a1a1aa",
                            margin: 0,
                          }}
                        >
                          {store.city}
                        </p>
                      )}
                    </div>
                    {store.rating > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          backgroundColor: darkMode
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(34,197,94,0.08)",
                          flexShrink: 0,
                          marginLeft: isRTL ? "0" : "8px",
                          marginRight: isRTL ? "8px" : "0",
                        }}
                      >
                        <Star
                          size={12}
                          fill="var(--accent-500)"
                          color="var(--accent-500)"
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "var(--accent-500)",
                          }}
                        >
                          {store.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MapPin size={12} color="var(--accent-500)" />
                      <span
                        style={{
                          fontSize: "11px",
                          color: darkMode ? "#a1a1aa" : "#71717a",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {store.city || (isRTL ? "غير محدد" : "Unknown")}
                      </span>
                    </div>
                    {store.deliveryFee > 0 && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: darkMode ? "#71717a" : "#a1a1aa",
                        }}
                      >
                        {isRTL ? "توصيل" : "Delivery"}: {store.deliveryFee}{" "}
                        {isRTL ? "ج.م" : "EGP"}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {!storesLoading && !storesError && totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(4px, 1vw, 6px)",
              marginTop: "clamp(36px, 5vw, 48px)",
              direction: dir,
              flexWrap: "wrap",
            }}
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "clamp(8px, 1vw, 10px) clamp(12px, 2vw, 16px)",
                borderRadius: "12px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff",
                color:
                  page === 1
                    ? darkMode
                      ? "#52525b"
                      : "#d4d4d8"
                    : darkMode
                      ? "#f4f4f5"
                      : "#18181b",
                fontSize: "clamp(12px, 1.3vw, 14px)",
                fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: page === 1 ? 0.5 : 1,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (page !== 1) {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(34,197,94,0.2)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(34,197,94,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)";
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff";
              }}
            >
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              <span>{isRTL ? "التالي" : "Previous"}</span>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  minWidth: "clamp(36px, 4vw, 40px)",
                  height: "clamp(36px, 4vw, 40px)",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor:
                    page === pageNum
                      ? "var(--accent-500)"
                      : darkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                  color:
                    page === pageNum
                      ? "#ffffff"
                      : darkMode
                        ? "#a1a1aa"
                        : "#71717a",
                  fontSize: "clamp(13px, 1.4vw, 14px)",
                  fontWeight: page === pageNum ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.backgroundColor = darkMode
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(34,197,94,0.08)";
                    e.currentTarget.style.color = "var(--accent-500)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== pageNum) {
                    e.currentTarget.style.backgroundColor = darkMode
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.03)";
                    e.currentTarget.style.color = darkMode
                      ? "#a1a1aa"
                      : "#71717a";
                  }
                }}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "clamp(8px, 1vw, 10px) clamp(12px, 2vw, 16px)",
                borderRadius: "12px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff",
                color:
                  page === totalPages
                    ? darkMode
                      ? "#52525b"
                      : "#d4d4d8"
                    : darkMode
                      ? "#f4f4f5"
                      : "#18181b",
                fontSize: "clamp(12px, 1.3vw, 14px)",
                fontWeight: 500,
                cursor: page === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: page === totalPages ? 0.5 : 1,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (page !== totalPages) {
                  e.currentTarget.style.borderColor = darkMode
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(34,197,94,0.2)";
                  e.currentTarget.style.backgroundColor = darkMode
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(34,197,94,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)";
                e.currentTarget.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#ffffff";
              }}
            >
              <span>{isRTL ? "السابق" : "Next"}</span>
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Stores;
