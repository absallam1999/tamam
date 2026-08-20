import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Store,
  Truck,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  Building2,
  Phone,
  MapPin,
  User,
  Mail,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";
import { usePartnership } from "../hooks/usePartnership";

const Partnership = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [partnerType, setPartnerType] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    type: "",
    category: "",
    selectedTypes: [],
    description: "",
    vehicleType: "",
  });

  const {
    isSubmitting,
    error: submitError,
    success: submitSuccess,
    typesLoading,
    storeTypes,
    submitStoreRequest,
    submitCourierRequest,
    reset,
  } = usePartnership();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [isRTL]);

  const dir = isRTL ? "rtl" : "ltr";

  const handleTypeSelect = (type) => {
    setPartnerType(type);
    setFormData((prev) => ({ ...prev, type }));
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (partnerType === "store") {
        await submitStoreRequest(formData);
      } else {
        await submitCourierRequest(formData);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleBack = () => {
    setStep(1);
    setPartnerType(null);
    reset();
  };

  const handleReset = () => {
    reset();
    setStep(1);
    setPartnerType(null);
    setFormData({
      businessName: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      type: "",
      category: "",
      selectedTypes: [],
      description: "",
      vehicleType: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "14px",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
    backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    color: darkMode ? "#f4f4f5" : "#18181b",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    direction: dir,
  };

  const partnerOptions = [
    {
      type: "store",
      icon: Store,
      title: isRTL ? "شريك متجر" : "Store Partner",
      description: isRTL
        ? "انضم كمتجر أو مطعم لعرض منتجاتك على منصتنا والوصول إلى آلاف العملاء."
        : "Join as a store or restaurant to list your products on our platform and reach thousands of customers.",
      benefits: isRTL
        ? ["زيادة المبيعات", "إدارة الطلبات بسهولة", "تقارير وتحليلات مفصلة"]
        : ["Increase sales", "Easy order management", "Detailed analytics"],
    },
    {
      type: "courier",
      icon: Truck,
      title: isRTL ? "عامل توصيل" : "Delivery Courier",
      description: isRTL
        ? "انضم كعامل توصيل وابداء في تحصيل الأموال مع كل توصيلة."
        : "Join as a delivery courier to start delivering orders and earn money with every delivery.",
      benefits: isRTL
        ? ["أرباح مرنة", "طرق محسّنة", "دعم على مدار الساعة"]
        : ["Flexible earnings", "Optimized routes", "24/7 support"],
    },
  ];

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
            marginBottom: step === 1 || submitSuccess ? "48px" : "32px",
          }}
        >
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
            <Building2 size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.partnership")}</span>
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
            {submitSuccess
              ? isRTL
                ? "تم استلام طلبك!"
                : "Application Received!"
              : step === 1
                ? isRTL
                  ? "انضم إلى منظومة تمام"
                  : "Join the Tamam Ecosystem"
                : isRTL
                  ? "أكمل بيانات الشراكة"
                  : "Complete Your Partnership Details"}
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
            {submitSuccess
              ? isRTL
                ? "شكراً لك! سنراجع طلبك ونتواصل معك خلال 24 ساعة عمل."
                : "Thank you! We'll review your application and contact you within 24 business hours."
              : step === 1
                ? isRTL
                  ? "اختر نوع الشراكة المناسب لك وسنتواصل معك خلال 24 ساعة."
                  : "Choose your partnership type and we'll get back to you within 24 hours."
                : isRTL
                  ? `أنت تتقدم كـ ${partnerType === "store" ? "شريك متجر" : "عامل توصيل"}. املأ النموذج أدناه.`
                  : `You're applying as a ${partnerType === "store" ? "Store Partner" : "Delivery Fleet"}. Fill in the form below.`}
          </p>
        </div>

        {/* Step Indicator */}
        {!submitSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "40px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.15s",
            }}
          >
            {[1, 2].map((s) => (
              <React.Fragment key={s}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      step >= s
                        ? "var(--accent-500)"
                        : darkMode
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.06)",
                    color:
                      step >= s ? "#ffffff" : darkMode ? "#71717a" : "#a1a1aa",
                    fontSize: "13px",
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                  }}
                >
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                {s < 2 && (
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      borderRadius: "1px",
                      backgroundColor:
                        step >= 2
                          ? "var(--accent-500)"
                          : darkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step 1: Choose Partner Type */}
        {step === 1 && !submitSuccess && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease 0.25s",
              direction: dir,
            }}
          >
            {partnerOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => handleTypeSelect(option.type)}
                  style={{
                    padding: "32px 24px",
                    borderRadius: "20px",
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "1px solid rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    textAlign: isRTL ? "right" : "left",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    fontFamily: "inherit",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = darkMode
                      ? "rgba(34,197,94,0.25)"
                      : "rgba(34,197,94,0.2)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 16px 40px rgba(0,0,0,0.3)"
                      : "0 16px 40px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = darkMode
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "var(--gradient-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: darkMode
                        ? "0 8px 24px rgba(34,197,94,0.25)"
                        : "0 8px 24px rgba(34,197,94,0.15)",
                    }}
                  >
                    <Icon size={28} color="#ffffff" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: darkMode ? "#f4f4f5" : "#18181b",
                        marginBottom: "6px",
                      }}
                    >
                      {option.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: darkMode ? "#a1a1aa" : "#71717a",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {option.description}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {option.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <CheckCircle2
                          size={13}
                          color="var(--accent-500)"
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: darkMode ? "#d4d4d8" : "#3f3f46",
                            fontWeight: 500,
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      marginTop: "auto",
                      paddingTop: "8px",
                      color: "var(--accent-500)",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    <span>{isRTL ? "اختر هذا" : "Select this"}</span>
                    {isRTL ? (
                      <ChevronLeft size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Partnership Form */}
        {step === 2 && !submitSuccess && (
          <form
            onSubmit={handleSubmit}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease 0.25s",
              direction: dir,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Error Alert */}
            {submitError && (
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  backgroundColor: darkMode
                    ? "rgba(239,68,68,0.1)"
                    : "rgba(239,68,68,0.05)",
                  border: darkMode
                    ? "1px solid rgba(239,68,68,0.2)"
                    : "1px solid rgba(239,68,68,0.1)",
                  color: darkMode ? "#fca5a5" : "#dc2626",
                  fontSize: "13px",
                  fontWeight: 500,
                  direction: dir,
                }}
              >
                {submitError}
              </div>
            )}

            {/* Back to selection */}
            <button
              type="button"
              onClick={handleBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: darkMode ? "#a1a1aa" : "#71717a",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                padding: "0",
                fontFamily: "inherit",
                direction: dir,
              }}
            >
              {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              <span>
                {isRTL ? "تغيير نوع الشراكة" : "Change partnership type"}
              </span>
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "14px",
                direction: dir,
              }}
            >
              {/* Business Name */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <Building2 size={12} style={{ flexShrink: 0 }} />
                  <span>
                    {isRTL ? "اسم الشركة / المتجر" : "Business / Store Name"} *
                  </span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Owner Name */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <User size={12} style={{ flexShrink: 0 }} />
                  <span>
                    {isRTL ? "اسم المالك / المسؤول" : "Owner / Manager Name"} *
                  </span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <Phone
                    size={12}
                    style={{
                      flexShrink: 0,
                      transform: isRTL ? "scaleX(-1)" : "none",
                    }}
                  />
                  <span>{isRTL ? "رقم الهاتف" : "Phone Number"} *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <Mail size={12} style={{ flexShrink: 0 }} />
                  <span>{isRTL ? "البريد الإلكتروني" : "Email Address"} *</span>
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

              {/* City */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={12} style={{ flexShrink: 0 }} />
                  <span>{isRTL ? "المدينة" : "City"} *</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={12} style={{ flexShrink: 0 }} />
                  <span>{isRTL ? "العنوان التفصيلي" : "Full Address"} *</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Store Types */}
            {partnerType === "store" && (
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#d4d4d8" : "#3f3f46",
                    marginBottom: "8px",
                  }}
                >
                  <Store size={12} style={{ flexShrink: 0 }} />
                  <span>
                    {isRTL
                      ? "نوع النشاط (يمكنك اختيار أكثر من نوع)"
                      : "Business Categories (select all that apply)"}{" "}
                    *
                  </span>
                </label>
                {typesLoading ? (
                  <div
                    style={{
                      color: darkMode ? "#71717a" : "#a1a1aa",
                      fontSize: "13px",
                      padding: "12px 0",
                    }}
                  >
                    {isRTL
                      ? "جاري تحميل التصنيفات..."
                      : "Loading categories..."}
                  </div>
                ) : storeTypes.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(140px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {storeTypes.map((type) => {
                      const isSelected =
                        formData.selectedTypes?.includes(type.id) || false;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            const current = formData.selectedTypes || [];
                            const updated = isSelected
                              ? current.filter((id) => id !== type.id)
                              : [...current, type.id];
                            setFormData({
                              ...formData,
                              selectedTypes: updated,
                              category:
                                updated.length > 0 ? updated.join(",") : "",
                            });
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 14px",
                            borderRadius: "12px",
                            border: isSelected
                              ? "2px solid var(--accent-500)"
                              : darkMode
                                ? "1px solid rgba(255,255,255,0.1)"
                                : "1px solid rgba(0,0,0,0.1)",
                            backgroundColor: isSelected
                              ? darkMode
                                ? "rgba(34,197,94,0.15)"
                                : "rgba(34,197,94,0.08)"
                              : "transparent",
                            color: isSelected
                              ? "var(--accent-500)"
                              : darkMode
                                ? "#d4d4d8"
                                : "#3f3f46",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: isSelected ? 600 : 500,
                            fontFamily: "inherit",
                            transition: "all 0.2s ease",
                            direction: dir,
                          }}
                        >
                          {type.iconUrl ? (
                            <img
                              src={type.iconUrl}
                              alt=""
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px",
                              }}
                            />
                          ) : (
                            <Store size={14} style={{ flexShrink: 0 }} />
                          )}
                          <span>{isRTL ? type.nameAr : type.nameEn}</span>
                          {isSelected && (
                            <CheckCircle2
                              size={14}
                              style={{
                                marginInlineStart: "auto",
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      placeholder={
                        isRTL
                          ? "مثال: مطعم، بقالة، صيدلية..."
                          : "e.g. Restaurant, Grocery, Pharmacy..."
                      }
                      style={inputStyle}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: darkMode ? "#d4d4d8" : "#3f3f46",
                  marginBottom: "6px",
                }}
              >
                <FileText size={12} style={{ flexShrink: 0 }} />
                <span>
                  {isRTL ? "وصف مختصر عن النشاط" : "Brief Description"} *
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "14px",
                backgroundColor: isSubmitting
                  ? darkMode
                    ? "#374151"
                    : "#9ca3af"
                  : "var(--accent-500)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                marginTop: "8px",
                fontFamily: "inherit",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 8px 24px rgba(34,197,94,0.3)"
                    : "0 8px 24px rgba(34,197,94,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  <span>{isRTL ? "جاري الإرسال..." : "Submitting..."}</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{isRTL ? "إرسال الطلب" : "Submit Application"}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Success State */}
        {submitSuccess && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              borderRadius: "20px",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.02)"
                : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease 0.25s",
              direction: dir,
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: darkMode
                  ? "0 12px 32px rgba(34,197,94,0.3)"
                  : "0 12px 32px rgba(34,197,94,0.2)",
              }}
            >
              <CheckCircle2 size={32} color="#ffffff" />
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: darkMode ? "#f4f4f5" : "#18181b",
                marginBottom: "8px",
              }}
            >
              {isRTL ? "تم استلام طلبك!" : "Application Received!"}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: darkMode ? "#a1a1aa" : "#71717a",
                maxWidth: "400px",
                margin: "0 auto 32px",
              }}
            >
              {isRTL
                ? "شكراً لك! سنراجع طلبك ونتواصل معك خلال 24 ساعة عمل لمناقشة الخطوات التالية."
                : "Thank you! We'll review your application and get back to you within 24 business hours to discuss the next steps."}
            </p>

            <button
              onClick={handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 32px",
                borderRadius: "14px",
                backgroundColor: "var(--accent-500)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 600,
                transition: "all 0.2s ease",
                fontFamily: "inherit",
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
              <CheckCircle2 size={18} />
              <span>{isRTL ? "موافق" : "OK"}</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Partnership;
