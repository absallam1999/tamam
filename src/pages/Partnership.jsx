import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Handshake,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  AlertCircle,
  LocationEdit,
  RefreshCw,
  Navigation,
  Calendar,
  Tag,
  Map,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";
import { usePartnership } from "../hooks/usePartnership";
import { apiClient } from "../lib/api-client";

/* =========================================================
   SHARED DESIGN TOKENS
   ========================================================= */
const TOKENS = {
  dark: {
    text: "#f4f4f5",
    textStrong: "#fafafa",
    textMuted: "#a1a1aa",
    textFaint: "#71717a",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.14)",
    surface: "rgba(24, 24, 27, 0.72)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(24,24,27,0.82) 0%, rgba(15,15,17,0.68) 100%)",
    surfaceSolid: "#18181b",
    inputBg: "rgba(255,255,255,0.035)",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeBorder: "rgba(34,197,94,0.28)",
    chipBg: "rgba(255,255,255,0.04)",
    divider: "rgba(255,255,255,0.07)",
    shadow:
      "0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  light: {
    text: "#18181b",
    textStrong: "#09090b",
    textMuted: "#52525b",
    textFaint: "#71717a",
    border: "rgba(0,0,0,0.08)",
    borderStrong: "rgba(0,0,0,0.14)",
    surface: "rgba(255,255,255,0.88)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(250,250,250,0.82) 100%)",
    surfaceSolid: "#ffffff",
    inputBg: "rgba(0,0,0,0.025)",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.22)",
    chipBg: "rgba(0,0,0,0.03)",
    divider: "rgba(0,0,0,0.06)",
    shadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
};

const ACCENT = "var(--accent-500, #22c55e)";

const INITIAL_FORM_DATA = {
  storeNameAr: "",
  storeNameEn: "",
  ownerName: "",
  fullName: "",
  phone: "",
  email: "",
  storeCategoryId: "",
  cityId: "",
  areaId: "",
  address: "",
  storeDescriptionAr: "",
  storeDescriptionEn: "",
  latitude: null,
  longitude: null,
  vehicleType: "",
  vehiclePlate: "",
  licenseNumber: "",
  licenseExpiresAt: "",
  area: "",
  description: "",
};

function extractApiList(res) {
  let payload =
    res && typeof res === "object" && "data" in res ? res.data : res;
  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    payload = payload.data;
  }
  const items = Array.isArray(payload) ? payload : payload?.items;
  return Array.isArray(items) ? items : [];
}

const Partnership = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [partnerType, setPartnerType] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(false);

  const [areas, setAreas] = useState([]);
  const [areasLoading, setAreasLoading] = useState(false);
  const [areasError, setAreasError] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const {
    isSubmitting,
    error: submitError,
    success: submitSuccess,
    categoriesLoading,
    storeCategories,
    fetchActiveStoreCategories,
    submitStoreRequest,
    submitCourierRequest,
    submitSupervisorRequest,
    reset,
  } = usePartnership();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [isRTL, step, submitSuccess]);

  const fetchCities = useCallback(async () => {
    setCitiesLoading(true);
    setCitiesError(false);
    try {
      const res = await apiClient.get("/api/cities/browse");
      const list = extractApiList(res).filter(
        (city) => city?.isActive !== false,
      );
      setCities(list);
    } catch {
      setCities([]);
      setCitiesError(true);
    } finally {
      setCitiesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const fetchAreasForCity = useCallback(async (cityId) => {
    if (!cityId) {
      setAreas([]);
      setAreasError(false);
      setAreasLoading(false);
      return;
    }

    setAreasLoading(true);
    setAreasError(false);
    try {
      const res = await apiClient.get(`/api/cities/${cityId}/areas`);
      const list = extractApiList(res).filter(
        (area) => area?.isActive !== false,
      );
      setAreas(list);
    } catch {
      setAreas([]);
      setAreasError(true);
    } finally {
      setAreasLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    if (!formData.cityId) {
      setAreas([]);
      setAreasError(false);
      setAreasLoading(false);
      return;
    }

    setAreasLoading(true);
    setAreasError(false);
    apiClient
      .get(`/api/cities/${formData.cityId}/areas`)
      .then((res) => {
        if (!active) return;
        const list = extractApiList(res).filter(
          (area) => area?.isActive !== false,
        );
        setAreas(list);
      })
      .catch(() => {
        if (!active) return;
        setAreas([]);
        setAreasError(true);
      })
      .finally(() => {
        if (active) setAreasLoading(false);
      });

    return () => {
      active = false;
    };
  }, [formData.cityId]);

  const activeCategories = useMemo(() => {
    return (storeCategories || [])
      .filter((cat) => cat?.isActive !== false)
      .slice()
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [storeCategories]);

  const selectedCategoryObj = useMemo(
    () =>
      activeCategories.find((cat) => cat.id === formData.storeCategoryId) ||
      null,
    [activeCategories, formData.storeCategoryId],
  );

  const selectedAreaObj = useMemo(
    () => areas.find((a) => a.id === formData.areaId) || null,
    [areas, formData.areaId],
  );

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  const glassCardStyle = {
    background: c.surfaceGradient,
    border: `1px solid ${c.border}`,
    backdropFilter: "blur(20px)",
    boxShadow: c.shadow,
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "14px",
    border: `1px solid ${c.border}`,
    backgroundColor: c.inputBg,
    color: c.text,
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    direction: dir,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    paddingInlineEnd: "42px",
    cursor: "pointer",
  };

  const optionStyle = {
    backgroundColor: c.surfaceSolid,
    color: c.text,
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: darkMode ? "#d4d4d8" : "#3f3f46",
    marginBottom: "7px",
  };

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: 700,
    color: c.textStrong,
    paddingBottom: "10px",
    marginBottom: "16px",
    borderBottom: `1px solid ${c.divider}`,
  };

  const handleTypeSelect = (type) => {
    setPartnerType(type);
    setLocalError(null);
    reset();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    if (localError) setLocalError(null);
    const { name, value } = e.target;
    if (name === "cityId") {
      setFormData((prev) => ({
        ...prev,
        cityId: value,
        areaId: "",
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocalError(
        isRTL
          ? "متصفحك لا يدعم تحديد الموقع الجغرافي"
          : "Geolocation is not supported by your browser",
      );
      return;
    }
    setGeoLoading(true);
    setLocalError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6)),
        }));
        setGeoLoading(false);
      },
      () => {
        setGeoLoading(false);
        setLocalError(
          isRTL
            ? "تعذر تحديد موقعك الحالي. يمكنك المتابعة بدونه."
            : "Could not detect your location. You can continue without it.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      if (partnerType === "store") {
        if (!formData.storeCategoryId) {
          setLocalError(
            isRTL
              ? "يرجى اختيار تصنيف المتجر"
              : "Please select a store category",
          );
          return;
        }
        if (!formData.cityId) {
          setLocalError(isRTL ? "يرجى اختيار المدينة" : "Please select a city");
          return;
        }
        await submitStoreRequest({
          ...formData,
          storeDescriptionAr:
            formData.storeDescriptionAr?.trim() ||
            formData.description?.trim() ||
            null,
          storeDescriptionEn:
            formData.storeDescriptionEn?.trim() ||
            formData.description?.trim() ||
            null,
          latitude:
            typeof formData.latitude === "number" ? formData.latitude : null,
          longitude:
            typeof formData.longitude === "number" ? formData.longitude : null,
        });
      } else if (partnerType === "courier") {
        if (!formData.cityId) {
          setLocalError(isRTL ? "يرجى اختيار المدينة" : "Please select a city");
          return;
        }
        await submitCourierRequest({
          ...formData,
          licenseExpiresAt: formData.licenseExpiresAt
            ? new Date(formData.licenseExpiresAt).toISOString()
            : null,
        });
      } else if (partnerType === "supervisor") {
        if (!formData.cityId) {
          setLocalError(isRTL ? "يرجى اختيار المدينة" : "Please select a city");
          return;
        }
        if (!formData.areaId) {
          setLocalError(
            isRTL ? "يرجى اختيار المنطقة" : "Please select an area",
          );
          return;
        }
        await submitSupervisorRequest({
          ...formData,
          areaIds: [formData.areaId],
        });
      }
    } catch (err) {
      if (err?.message) {
        setLocalError(err.message);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
    setPartnerType(null);
    setLocalError(null);
    reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    reset();
    setLocalError(null);
    setStep(1);
    setPartnerType(null);
    setAreas([]);
    setFormData(INITIAL_FORM_DATA);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        ? "انضم كعامل توصيل وابدأ في تحصيل الأرباح مع كل توصيلة."
        : "Join as a delivery courier to start delivering orders and earn money with every delivery.",
      benefits: isRTL
        ? ["أرباح مرنة", "طرق محسّنة", "دعم على مدار الساعة"]
        : ["Flexible earnings", "Optimized routes", "24/7 support"],
    },
    {
      type: "supervisor",
      icon: LocationEdit,
      title: isRTL ? "مشرف منطقة" : "Area Supervisor",
      description: isRTL
        ? "انضم كمشرف لإدارة السائقين ومتابعة تنفيذ الطلبات في منطقتك."
        : "Join as a supervisor to manage drivers and oversee order fulfillment in your area.",
      benefits: isRTL
        ? [
            "إدارة فريق السائقين",
            "متابعة مباشرة للطلبات",
            "عمولة ثابتة لكل طلب",
          ]
        : ["Manage driver fleet", "Live order tracking", "Fixed fee per order"],
    },
  ];

  const selectedOption = partnerOptions.find((o) => o.type === partnerType);
  const SelectedIcon = selectedOption?.icon || Handshake;
  const activeError = submitError || localError;

  const renderCitySelect = () => (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <label style={{ ...labelStyle, marginBottom: 0 }}>
          <MapPin size={12} style={{ flexShrink: 0 }} />
          <span>{isRTL ? "المدينة" : "City"} *</span>
        </label>
        {(citiesError || (!citiesLoading && cities.length === 0)) && (
          <button
            type="button"
            onClick={fetchCities}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              color: ACCENT,
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            <RefreshCw size={11} />
            <span>{isRTL ? "إعادة المحاولة" : "Retry"}</span>
          </button>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <select
          name="cityId"
          value={formData.cityId}
          onChange={handleChange}
          required
          disabled={citiesLoading || cities.length === 0}
          className="tamam-field"
          style={{
            ...selectStyle,
            opacity: citiesLoading || cities.length === 0 ? 0.7 : 1,
            cursor:
              citiesLoading || cities.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <option value="" style={optionStyle}>
            {citiesLoading
              ? isRTL
                ? "جاري تحميل المدن..."
                : "Loading cities..."
              : cities.length === 0
                ? isRTL
                  ? "لا توجد مدن متاحة حالياً"
                  : "No cities available"
                : isRTL
                  ? "اختر المدينة"
                  : "Select City"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id} style={optionStyle}>
              {isRTL ? city.nameAr || city.nameEn : city.nameEn || city.nameAr}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            insetInlineEnd: "14px",
            pointerEvents: "none",
            color: c.textMuted,
          }}
        />
      </div>
    </div>
  );

  const renderAreaSelect = () => {
    const noCitySelected = !formData.cityId;
    const isDisabled = noCitySelected || areasLoading || areas.length === 0;

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "7px",
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0 }}>
            <Map size={12} style={{ flexShrink: 0 }} />
            <span>{isRTL ? "المنطقة" : "Area"} *</span>
          </label>
          {formData.cityId &&
            (areasError || (!areasLoading && areas.length === 0)) && (
              <button
                type="button"
                onClick={() => fetchAreasForCity(formData.cityId)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  color: ACCENT,
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                <RefreshCw size={11} />
                <span>{isRTL ? "إعادة المحاولة" : "Retry"}</span>
              </button>
            )}
        </div>

        <div style={{ position: "relative" }}>
          <select
            name="areaId"
            value={formData.areaId}
            onChange={handleChange}
            required
            disabled={isDisabled}
            className="tamam-field"
            style={{
              ...selectStyle,
              opacity: isDisabled ? 0.7 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <option value="" style={optionStyle}>
              {noCitySelected
                ? isRTL
                  ? "اختر المدينة أولاً"
                  : "Select a city first"
                : areasLoading
                  ? isRTL
                    ? "جاري تحميل المناطق..."
                    : "Loading areas..."
                  : areas.length === 0
                    ? isRTL
                      ? "لا توجد مناطق متاحة في هذه المدينة"
                      : "No areas available in this city"
                    : isRTL
                      ? "اختر المنطقة"
                      : "Select Area"}
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.id} style={optionStyle}>
                {area.name ||
                  (isRTL
                    ? area.nameAr || area.nameEn
                    : area.nameEn || area.nameAr) ||
                  area.id}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              insetInlineEnd: "14px",
              pointerEvents: "none",
              color: c.textMuted,
            }}
          />
        </div>

        {selectedAreaObj?.description && (
          <p
            style={{
              margin: "6px 2px 0",
              fontSize: "12px",
              color: c.textMuted,
            }}
          >
            {selectedAreaObj.description}
          </p>
        )}
      </div>
    );
  };

  const renderCategorySelect = () => (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <label style={{ ...labelStyle, marginBottom: 0 }}>
          <Tag size={12} style={{ flexShrink: 0 }} />
          <span>{isRTL ? "تصنيف المتجر" : "Store Category"} *</span>
        </label>
        {!categoriesLoading && activeCategories.length === 0 && (
          <button
            type="button"
            onClick={() => fetchActiveStoreCategories().catch(() => {})}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              color: ACCENT,
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            <RefreshCw size={11} />
            <span>{isRTL ? "إعادة المحاولة" : "Retry"}</span>
          </button>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <select
          name="storeCategoryId"
          value={formData.storeCategoryId}
          onChange={handleChange}
          required
          disabled={categoriesLoading || activeCategories.length === 0}
          className="tamam-field"
          style={{
            ...selectStyle,
            opacity:
              categoriesLoading || activeCategories.length === 0 ? 0.7 : 1,
            cursor:
              categoriesLoading || activeCategories.length === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          <option value="" style={optionStyle}>
            {categoriesLoading
              ? isRTL
                ? "جاري تحميل التصنيفات..."
                : "Loading categories..."
              : activeCategories.length === 0
                ? isRTL
                  ? "لا توجد تصنيفات متاحة"
                  : "No categories available"
                : isRTL
                  ? "اختر تصنيف المتجر"
                  : "Select Store Category"}
          </option>
          {activeCategories.map((cat) => (
            <option key={cat.id} value={cat.id} style={optionStyle}>
              {isRTL ? cat.nameAr || cat.nameEn : cat.nameEn || cat.nameAr}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            insetInlineEnd: "14px",
            pointerEvents: "none",
            color: c.textMuted,
          }}
        />
      </div>

      {selectedCategoryObj &&
        (selectedCategoryObj.descriptionAr ||
          selectedCategoryObj.descriptionEn) && (
          <p
            style={{
              margin: "6px 2px 0",
              fontSize: "12px",
              color: c.textMuted,
            }}
          >
            {isRTL
              ? selectedCategoryObj.descriptionAr ||
                selectedCategoryObj.descriptionEn
              : selectedCategoryObj.descriptionEn ||
                selectedCategoryObj.descriptionAr}
          </p>
        )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "100px 24px 80px",
        }}
      >
        {/* Top Navigation Row */}
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: "32px",
            direction: dir,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 16px",
              borderRadius: "12px",
              ...glassCardStyle,
              boxShadow: "none",
              color: c.textMuted,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.borderColor = c.badgeBorder;
              e.currentTarget.style.transform = `translateX(${
                isRTL ? 4 : -4
              }px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = c.textMuted;
              e.currentTarget.style.borderColor = c.border;
              e.currentTarget.style.transform = "none";
            }}
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{t("common.back") || (isRTL ? "الرئيسية" : "Home")}</span>
          </Link>
        </nav>

        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.55s ease",
            direction: dir,
            marginBottom: "36px",
          }}
        >
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
              marginBottom: "18px",
            }}
          >
            <Handshake size={14} style={{ flexShrink: 0 }} />
            <span>{t("nav.partnership")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: c.textStrong,
              letterSpacing: isRTL ? "0" : "-0.02em",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            {submitSuccess
              ? isRTL
                ? "تم استلام طلبك بنجاح!"
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
              color: c.textMuted,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "560px",
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
                  ? `أنت تتقدم كـ ${selectedOption?.title}. املأ البيانات المطلوبة أدناه.`
                  : `You're applying as a ${selectedOption?.title}. Fill in the required details below.`}
          </p>
        </div>

        {/* Step Indicator */}
        {!submitSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "36px",
              direction: dir,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(14px)",
              transition: "all 0.5s ease 0.1s",
            }}
          >
            {[
              {
                num: 1,
                label: isRTL ? "نوع الشراكة" : "Partner Role",
              },
              {
                num: 2,
                label: isRTL ? "بيانات الطلب" : "Application Form",
              },
            ].map((item, idx) => {
              const isActive = step === item.num;
              const isDone = step > item.num;
              return (
                <React.Fragment key={item.num}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      background: isActive || isDone ? c.badgeBg : c.chipBg,
                      border: `1px solid ${
                        isActive || isDone ? c.badgeBorder : c.border
                      }`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          isActive || isDone ? ACCENT : c.borderStrong,
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {isDone ? <CheckCircle2 size={13} /> : item.num}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isActive || isDone ? 700 : 500,
                        color: isActive || isDone ? c.textStrong : c.textMuted,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {idx === 0 && (
                    <div
                      style={{
                        width: "36px",
                        height: "2px",
                        borderRadius: "2px",
                        backgroundColor: step >= 2 ? ACCENT : c.borderStrong,
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Step 1: Choose Partner Type */}
        {step === 1 && !submitSuccess && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "18px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease 0.2s",
              direction: dir,
            }}
          >
            {partnerOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => handleTypeSelect(option.type)}
                  style={{
                    padding: "28px 24px",
                    borderRadius: "22px",
                    ...glassCardStyle,
                    boxShadow: "none",
                    cursor: "pointer",
                    textAlign: isRTL ? "right" : "left",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    fontFamily: "inherit",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${0.15 + i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = c.badgeBorder;
                    e.currentTarget.style.boxShadow = c.shadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = c.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "16px",
                      background:
                        "var(--gradient-primary, linear-gradient(135deg, #22c55e, #16a34a))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: darkMode
                        ? "0 8px 24px rgba(34,197,94,0.25)"
                        : "0 8px 24px rgba(34,197,94,0.18)",
                    }}
                  >
                    <Icon size={26} color="#ffffff" />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: c.textStrong,
                        marginBottom: "8px",
                      }}
                    >
                      {option.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: c.textMuted,
                        lineHeight: 1.6,
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
                      gap: "8px",
                      paddingTop: "4px",
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
                          size={14}
                          color="var(--accent-500, #22c55e)"
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: "12.5px",
                            color: c.text,
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
                      justifyContent: "space-between",
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: `1px solid ${c.divider}`,
                      color: ACCENT,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    <span>{isRTL ? "تقديم الطلب" : "Apply Now"}</span>
                    {isRTL ? (
                      <ChevronLeft size={15} />
                    ) : (
                      <ChevronRight size={15} />
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
              transform: isVisible ? "translateY(0)" : "translateY(18px)",
              transition: "all 0.45s ease 0.1s",
              direction: dir,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Selected Role Summary Banner with Step-Back Action */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "16px 20px",
                borderRadius: "18px",
                ...glassCardStyle,
                boxShadow: "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background:
                      "var(--gradient-primary, linear-gradient(135deg, #22c55e, #16a34a))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <SelectedIcon size={20} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: c.textFaint,
                      textTransform: "uppercase",
                      letterSpacing: isRTL ? "0" : "0.04em",
                    }}
                  >
                    {isRTL ? "الشراكة المختارة" : "Selected Partnership"}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: c.textStrong,
                    }}
                  >
                    {selectedOption?.title}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBack}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: c.chipBg,
                  border: `1px solid ${c.border}`,
                  color: c.text,
                  cursor: "pointer",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.badgeBorder;
                  e.currentTarget.style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.color = c.text;
                }}
              >
                {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                <span>{isRTL ? "تغيير النوع" : "Change Role"}</span>
              </button>
            </div>

            {/* Error Alert */}
            {activeError && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  backgroundColor: darkMode
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(239,68,68,0.06)",
                  border: darkMode
                    ? "1px solid rgba(239,68,68,0.28)"
                    : "1px solid rgba(239,68,68,0.2)",
                  color: darkMode ? "#fca5a5" : "#dc2626",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{activeError}</span>
              </div>
            )}

            {/* Main Form Card */}
            <div
              style={{
                padding: "28px",
                borderRadius: "22px",
                ...glassCardStyle,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Section 1: Contact Information */}
              <div>
                <div style={sectionHeaderStyle}>
                  <User size={15} color="var(--accent-500, #22c55e)" />
                  <span>
                    {isRTL ? "بيانات التواصل" : "Contact Information"}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {partnerType === "store" ? (
                    <div>
                      <label style={labelStyle}>
                        <User size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL
                            ? "اسم المالك / المسؤول"
                            : "Owner / Manager Name"}{" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL ? "أدخل اسم المالك" : "Enter owner full name"
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <label style={labelStyle}>
                        <User size={12} style={{ flexShrink: 0 }} />
                        <span>{isRTL ? "الاسم الكامل" : "Full Name"} *</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL ? "أدخل الاسم الكامل" : "Enter your full name"
                        }
                      />
                    </div>
                  )}

                  <div>
                    <label style={labelStyle}>
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
                      className="tamam-field"
                      style={{ ...inputStyle, direction: "ltr" }}
                      placeholder="01xxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      <Mail size={12} style={{ flexShrink: 0 }} />
                      <span>
                        {isRTL ? "البريد الإلكتروني" : "Email Address"}
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="tamam-field"
                      style={{ ...inputStyle, direction: "ltr" }}
                      placeholder="name@example.com"
                    />
                  </div>

                  {renderCitySelect()}
                </div>
              </div>

              {/* Section 2: Supervisor Assigned Area */}
              {partnerType === "supervisor" && (
                <div>
                  <div style={sectionHeaderStyle}>
                    <Map size={15} color="var(--accent-500, #22c55e)" />
                    <span>{isRTL ? "منطقة الإشراف" : "Assigned Area"}</span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {renderAreaSelect()}
                  </div>
                </div>
              )}

              {/* Section 2: Store Details */}
              {partnerType === "store" && (
                <div>
                  <div style={sectionHeaderStyle}>
                    <Store size={15} color="var(--accent-500, #22c55e)" />
                    <span>{isRTL ? "بيانات المتجر" : "Store Details"}</span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>
                        <Building2 size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL
                            ? "اسم المتجر (بالعربية)"
                            : "Store Name (Arabic)"}{" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="storeNameAr"
                        value={formData.storeNameAr}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL ? "مثال: مطعم تمام" : "Arabic store name"
                        }
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <Building2 size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL
                            ? "اسم المتجر (بالإنجليزية)"
                            : "Store Name (English)"}{" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="storeNameEn"
                        value={formData.storeNameEn}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={{ ...inputStyle, direction: "ltr" }}
                        placeholder="e.g. Tamam Restaurant"
                      />
                    </div>

                    {renderCategorySelect()}

                    <div>
                      <label style={labelStyle}>
                        <MapPin size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL ? "العنوان التفصيلي" : "Street / Address"} *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL
                            ? "اسم الشارع والمنطقة"
                            : "Street name & landmark"
                        }
                      />
                    </div>
                  </div>

                  {/* Optional Store Location Detection */}
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      backgroundColor: c.chipBg,
                      border: `1px solid ${c.border}`,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12.5px",
                        color: c.textMuted,
                      }}
                    >
                      <Navigation
                        size={14}
                        color="var(--accent-500, #22c55e)"
                      />
                      <span>
                        {formData.latitude !== null &&
                        formData.longitude !== null
                          ? isRTL
                            ? `تم تحديد الإحداثيات (${formData.latitude}, ${formData.longitude})`
                            : `Location captured (${formData.latitude}, ${formData.longitude})`
                          : isRTL
                            ? "تحديد موقع المتجر على الخريطة (اختياري)"
                            : "Pin store coordinates on map (optional)"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={geoLoading}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        backgroundColor: c.badgeBg,
                        border: `1px solid ${c.badgeBorder}`,
                        color: ACCENT,
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: geoLoading ? "wait" : "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Navigation size={12} />
                      <span>
                        {geoLoading
                          ? isRTL
                            ? "جاري التحديد..."
                            : "Detecting..."
                          : isRTL
                            ? "تحديد تلقائي"
                            : "Auto-detect"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Section 2: Courier Vehicle Details */}
              {partnerType === "courier" && (
                <div>
                  <div style={sectionHeaderStyle}>
                    <Truck size={15} color="var(--accent-500, #22c55e)" />
                    <span>
                      {isRTL
                        ? "بيانات المركبة والمنطقة"
                        : "Vehicle & Area Details"}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>
                        <Truck size={12} style={{ flexShrink: 0 }} />
                        <span>{isRTL ? "نوع المركبة" : "Vehicle Type"} *</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          required
                          className="tamam-field"
                          style={selectStyle}
                        >
                          <option value="" style={optionStyle}>
                            {isRTL ? "اختر نوع المركبة" : "Select Vehicle Type"}
                          </option>
                          <option value="Car" style={optionStyle}>
                            {isRTL ? "سيارة" : "Car"}
                          </option>
                          <option value="Van" style={optionStyle}>
                            {isRTL ? "فان" : "Van"}
                          </option>
                          <option value="Motorcycle" style={optionStyle}>
                            {isRTL ? "دراجة نارية" : "Motorcycle"}
                          </option>
                          <option value="Scooter" style={optionStyle}>
                            {isRTL ? "سكوتر" : "Scooter"}
                          </option>
                          <option value="Toktok" style={optionStyle}>
                            {isRTL ? "توك توك" : "Toktok"}
                          </option>
                          <option value="Bicycle" style={optionStyle}>
                            {isRTL ? "دراجة هوائية" : "Bicycle"}
                          </option>
                        </select>
                        <ChevronDown
                          size={16}
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            insetInlineEnd: "14px",
                            pointerEvents: "none",
                            color: c.textMuted,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <FileText size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL ? "رقم لوحة المركبة" : "Vehicle Plate Number"}{" "}
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={handleChange}
                        required
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL ? "مثال: أ ب ج 1234" : "e.g. ABC 1234"
                        }
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <FileText size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL
                            ? "رقم رخصة القيادة (اختياري)"
                            : "License Number (Optional)"}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="tamam-field"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <Calendar size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL
                            ? "تاريخ انتهاء الرخصة (اختياري)"
                            : "License Expiry Date (Optional)"}
                        </span>
                      </label>
                      <input
                        type="date"
                        name="licenseExpiresAt"
                        value={formData.licenseExpiresAt}
                        onChange={handleChange}
                        className="tamam-field"
                        style={{ ...inputStyle, direction: "ltr" }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <MapPin size={12} style={{ flexShrink: 0 }} />
                        <span>
                          {isRTL ? "المنطقة (اختياري)" : "Area (Optional)"}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="tamam-field"
                        style={inputStyle}
                        placeholder={
                          isRTL ? "الحي أو المنطقة" : "Neighborhood / District"
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Description / Notes */}
              <div>
                <div style={sectionHeaderStyle}>
                  <FileText size={15} color="var(--accent-500, #22c55e)" />
                  <span>
                    {partnerType === "store"
                      ? isRTL
                        ? "وصف النشاط والملاحظات"
                        : "Business Description & Notes"
                      : isRTL
                        ? "ملاحظات إضافية"
                        : "Additional Notes"}
                  </span>
                </div>

                {partnerType === "store" ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>
                        <span>
                          {isRTL
                            ? "وصف المتجر (بالعربية)"
                            : "Store Description (Arabic)"}
                        </span>
                      </label>
                      <textarea
                        name="storeDescriptionAr"
                        value={formData.storeDescriptionAr}
                        onChange={handleChange}
                        rows={3}
                        className="tamam-field"
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: "90px",
                        }}
                        placeholder={
                          isRTL
                            ? "نبذة عن منتجاتك أو خدماتك..."
                            : "Brief Arabic description..."
                        }
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        <span>
                          {isRTL
                            ? "وصف المتجر (بالإنجليزية)"
                            : "Store Description (English)"}
                        </span>
                      </label>
                      <textarea
                        name="storeDescriptionEn"
                        value={formData.storeDescriptionEn}
                        onChange={handleChange}
                        rows={3}
                        className="tamam-field"
                        style={{
                          ...inputStyle,
                          direction: "ltr",
                          resize: "vertical",
                          minHeight: "90px",
                        }}
                        placeholder="Brief English description..."
                      />
                    </div>
                  </div>
                ) : (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="tamam-field"
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "100px",
                    }}
                    placeholder={
                      isRTL
                        ? "أخبرنا بالمزيد عن خبرتك أو أي تفاصيل إضافية..."
                        : "Tell us more about your experience or any extra details..."
                    }
                  />
                )}
              </div>

              {/* Footer Actions: Step-Back + Submit */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${c.divider}`,
                }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 20px",
                    borderRadius: "14px",
                    backgroundColor: c.chipBg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isRTL ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronLeft size={16} />
                  )}
                  <span>{isRTL ? "السابق" : "Step Back"}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: "1 1 220px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "14px",
                    background: isSubmitting
                      ? darkMode
                        ? "#374151"
                        : "#9ca3af"
                      : "var(--gradient-primary, linear-gradient(135deg, #22c55e, #16a34a))",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    opacity: isSubmitting ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = darkMode
                        ? "0 10px 28px rgba(34,197,94,0.32)"
                        : "0 10px 28px rgba(34,197,94,0.22)";
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
                      <span>
                        {isRTL ? "إرسال طلب الشراكة" : "Submit Application"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Success State */}
        {submitSuccess && (
          <div
            style={{
              padding: "56px 24px",
              textAlign: "center",
              borderRadius: "24px",
              ...glassCardStyle,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s ease 0.15s",
              direction: dir,
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "20px",
                background:
                  "var(--gradient-primary, linear-gradient(135deg, #22c55e, #16a34a))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 22px",
                boxShadow: darkMode
                  ? "0 12px 32px rgba(34,197,94,0.32)"
                  : "0 12px 32px rgba(34,197,94,0.22)",
              }}
            >
              <CheckCircle2 size={34} color="#ffffff" />
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "999px",
                backgroundColor: c.badgeBg,
                border: `1px solid ${c.badgeBorder}`,
                color: ACCENT,
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              <SelectedIcon size={13} />
              <span>{selectedOption?.title}</span>
            </div>

            <h2
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: c.textStrong,
                marginBottom: "10px",
              }}
            >
              {isRTL ? "تم استلام طلبك بنجاح!" : "Application Received!"}
            </h2>
            <p
              style={{
                fontSize: "14.5px",
                color: c.textMuted,
                maxWidth: "430px",
                lineHeight: 1.7,
                margin: "0 auto 32px",
              }}
            >
              {isRTL
                ? "شكراً لك! سيقوم فريقنا بمراجعة بياناتك والتواصل معك خلال 24 ساعة عمل لإتمام الخطوات التالية."
                : "Thank you! Our team will review your application and contact you within 24 business hours to complete the next steps."}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={handleReset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 26px",
                  borderRadius: "14px",
                  background:
                    "var(--gradient-primary, linear-gradient(135deg, #22c55e, #16a34a))",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                <CheckCircle2 size={17} />
                <span>
                  {isRTL ? "تقديم طلب جديد" : "Submit Another Application"}
                </span>
              </button>

              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "14px",
                  backgroundColor: c.chipBg,
                  border: `1px solid ${c.border}`,
                  color: c.text,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <span>{isRTL ? "العودة للرئيسية" : "Back to Home"}</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .tamam-field:focus {
          border-color: var(--accent-500, #22c55e) !important;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.14);
        }
        .tamam-field::placeholder {
          color: ${c.textFaint};
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
};

export default Partnership;
