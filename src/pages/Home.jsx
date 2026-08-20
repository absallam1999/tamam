import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import {
  Star,
  Clock,
  MapPin,
  Download,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Truck,
  Shield,
  Sparkles,
  Store,
  Search,
  ChevronDown,
  UtensilsCrossed,
  Pill,
  MessageCircle,
  Zap,
  ThumbsUp,
} from "lucide-react";
import { useLanguage } from "../contexts/LangContext";
import { useTheme } from "../contexts/ThemeContext";
import { useBrowse } from "../hooks/useBrowse";

// --- 3D Background Component ---
const Interactive3DBackground = ({ darkMode }) => {
  const sphereRef = useRef();

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    if (sphereRef.current) {
      sphereRef.current.position.x +=
        (x * 0.2 - sphereRef.current.position.x) * 0.1;
      sphereRef.current.position.y +=
        (y * 0.2 - sphereRef.current.position.y) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={darkMode ? 0.2 : 0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color={darkMode ? "#4ade80" : "#ffffff"}
      />

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={sphereRef} position={[2, 0, -5]} scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={darkMode ? "#166534" : "#bbf7d0"}
            envMapIntensity={darkMode ? 0.4 : 1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.1}
            roughness={0.2}
            distort={0.4}
            speed={2}
            transparent
            opacity={darkMode ? 0.3 : 0.4}
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[-3, 2, -8]} scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={darkMode ? "#f59e0b" : "#fef08a"}
            envMapIntensity={0.8}
            distort={0.3}
            speed={3}
            transparent
            opacity={darkMode ? 0.2 : 0.5}
          />
        </mesh>
      </Float>
    </>
  );
};

const Home = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    stores,
    cities,
    search,
    selectedCityId,
    storesLoading,
    citiesLoading,
    storesError,
    handleSearch,
    handleCityChange,
  } = useBrowse();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dir = isRTL ? "rtl" : "ltr";

  // Glassmorphism base style
  const glassStyle = {
    background: darkMode ? "rgba(24, 24, 27, 0.6)" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: darkMode
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: darkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
      : "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
  };

  const features = [
    {
      icon: Clock,
      title: isRTL ? "توصيل سريع" : "Fast Delivery",
      desc: isRTL ? "توصيل خلال 30 دقيقة" : "Delivery in 30 minutes",
    },
    {
      icon: Shield,
      title: isRTL ? "دفع آمن" : "Secure Payment",
      desc: isRTL ? "معاملات مشفرة بالكامل" : "Fully encrypted transactions",
    },
    {
      icon: Sparkles,
      title: isRTL ? "عروض حصرية" : "Exclusive Deals",
      desc: isRTL ? "خصومات يومية وعروض" : "Daily discounts & offers",
    },
    {
      icon: ShoppingBag,
      title: isRTL ? "آلاف المتاجر" : "500+ Stores",
      desc: isRTL ? "مطاعم ومتاجر متنوعة" : "Diverse restaurants & shops",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {/* ========== HERO ========== */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "100px 0 60px" : "120px 0 80px",
          minHeight: isMobile ? "auto" : "95vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Three.js Interactive Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Interactive3DBackground darkMode={darkMode} />
          </Canvas>
        </div>

        {/* Ambient Gradient Overlays for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
              gap: isMobile ? "60px" : "40px",
              alignItems: "center",
            }}
          >
            {/* Left Content */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                direction: dir,
                zIndex: 2,
              }}
            >
              <h1
                style={{
                  fontSize: isMobile
                    ? "clamp(36px, 9vw, 48px)"
                    : "clamp(48px, 5vw, 68px)",
                  fontWeight: 900,
                  color: darkMode ? "#f8fafc" : "#0f172a",
                  letterSpacing: isRTL ? "0" : "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "clamp(16px, 2vw, 24px)",
                }}
              >
                {isRTL ? (
                  <>
                    <span style={{ color: "var(--accent-500)" }}>
                      توصيل سريع
                    </span>
                    <br />
                    <span>لباب بيتك</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "var(--accent-500)" }}>Fastest</span>
                    <br />
                    <span>delivery at</span>
                    <br />
                    <span>your doorstep</span>
                  </>
                )}
              </h1>

              <p
                style={{
                  fontSize: isMobile ? "16px" : "20px",
                  color: darkMode ? "#94a3b8" : "#64748b",
                  lineHeight: 1.6,
                  marginBottom: "40px",
                  maxWidth: "480px",
                  fontWeight: 500,
                }}
              >
                {isRTL
                  ? "نظام توصيل وحجز اونلاين للمطاعم، الكافيهات، الصيدليات، والبقالة."
                  : "Home delivery and online reservation system for restaurants, cafe, medicine, food & groceries."}
              </p>

              {/* Glassy CTA Buttons */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link
                  to="/download"
                  style={{
                    ...glassStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    borderRadius: "16px",
                    background: darkMode
                      ? "rgba(34, 197, 94, 0.25)"
                      : "rgba(34, 197, 94, 0.2)",
                    border: darkMode
                      ? "1px solid rgba(34, 197, 94, 0.3)"
                      : "1px solid rgba(34, 197, 94, 0.25)",
                    color: darkMode ? "#ffffff" : "#065f46",
                    textDecoration: "none",
                    fontSize: "17px",
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = darkMode
                      ? "rgba(34, 197, 94, 0.35)"
                      : "rgba(34, 197, 94, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = darkMode
                      ? "rgba(34, 197, 94, 0.25)"
                      : "rgba(34, 197, 94, 0.2)";
                    e.currentTarget.style.boxShadow = darkMode
                      ? "0 12px 32px rgba(34, 197, 94, 0.2)"
                      : "0 12px 32px rgba(34, 197, 94, 0.15)";
                  }}
                >
                  <Download size={20} />
                  <span>{t("hero.download")}</span>
                </Link>

                <Link
                  to="/stores"
                  style={{
                    ...glassStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    borderRadius: "16px",
                    color: darkMode ? "#ffffff" : "#1e293b",
                    textDecoration: "none",
                    fontSize: "17px",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = darkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = glassStyle.background;
                    e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  }}
                >
                  <Store size={20} />
                  <span>{isRTL ? "عرض المتاجر" : "View Stores"}</span>
                </Link>
              </div>
            </div>

            {/* Right Content */}
            <div
              style={{
                position: "relative",
                height: isMobile ? "400px" : "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.9)",
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.2s",
              }}
            >
              {/* Central Element: In a real app, this is where your transparent 3D Scooter Image goes. 
                  Using a beautifully frosted placeholder mimicking the central showcase */}
              <div
                style={{
                  width: isMobile ? "240px" : "320px",
                  height: isMobile ? "240px" : "320px",
                  borderRadius: "50%",
                  background: darkMode
                    ? "linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 0.05))"
                    : "linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.1))",
                  filter: "blur(40px)",
                  position: "absolute",
                  animation: "pulseOrb 6s ease-in-out infinite",
                }}
              />

              <img
                src="./hero/avatar.png"
                alt="Hero Avatar"
                style={{
                  width: "100%",
                  maxWidth: isMobile ? "300px" : "500px",
                  position: "relative",
                  zIndex: 8,
                  animation: "floatSlow 6s ease-in-out infinite",
                  filter: darkMode
                    ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
                    : "drop-shadow(0 20px 40px rgba(250,204,21,0.2))",
                  transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                  transition: "transform 0.1s ease-out",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Floating Review Left */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  top: isMobile ? "10%" : "12%",
                  left: isMobile ? "2%" : "-8%",
                  padding: "clamp(10px, 1.5vw, 14px) clamp(14px, 2vw, 20px)",
                  borderRadius: "clamp(14px, 2vw, 20px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1vw, 12px)",
                  zIndex: 3,
                  animation: "floatEmoji 4.5s ease-in-out infinite",
                  transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
                  direction: dir,
                }}
              >
                <div
                  style={{
                    width: "clamp(32px, 4vw, 40px)",
                    height: "clamp(32px, 4vw, 40px)",
                    borderRadius: "12px",
                    background: darkMode
                      ? "rgba(79, 70, 229, 0.2)"
                      : "rgba(79, 70, 229, 0.1)",
                    border: darkMode
                      ? "1px solid rgba(79, 70, 229, 0.3)"
                      : "1px solid rgba(79, 70, 229, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ThumbsUp size={16} color="#4f46e5" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "clamp(12px, 1.4vw, 14px)",
                      fontWeight: 700,
                      color: darkMode ? "#f1f5f9" : "#1e293b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isRTL ? "أحمد محمد" : "Ahmed Mohamed"}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(10px, 1.2vw, 12px)",
                      color: darkMode ? "#94a3b8" : "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isRTL ? "توصيل سريع للمنزل" : "Fast delivery at home"}
                  </div>
                  {/* Stars  */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1px",
                      marginTop: "3px",
                      direction: "ltr",
                      justifyContent: isRTL ? "flex-end" : "flex-start",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={9}
                        fill="#facc15"
                        color="#facc15"
                        style={{ flexShrink: 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Grocery Card */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  bottom: isMobile ? "25%" : "20%",
                  left: isMobile ? "2%" : "-5%",
                  padding: "clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 24px)",
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(6px, 1vw, 10px)",
                  zIndex: 3,
                  animation: "floatEmoji 5s ease-in-out infinite 0.8s",
                  transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)`,
                  direction: dir,
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 6vw, 56px)",
                    height: "clamp(44px, 6vw, 56px)",
                    borderRadius: "16px",
                    background: darkMode
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(245, 158, 11, 0.1)",
                    border: darkMode
                      ? "1px solid rgba(245, 158, 11, 0.3)"
                      : "1px solid rgba(245, 158, 11, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ShoppingBag size={22} color="#f59e0b" />
                </div>
                <span
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 15px)",
                    fontWeight: 700,
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                    whiteSpace: "nowrap",
                    fontFamily: isRTL
                      ? "'Tajawal', 'Cairo', system-ui, sans-serif"
                      : "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {isRTL ? "بقالة" : "Grocery"}
                </span>
              </div>

              {/* Floating Restaurants Card */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  top: isMobile ? "22%" : "28%",
                  right: isMobile ? "2%" : "-8%",
                  padding: "clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 24px)",
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(6px, 1vw, 10px)",
                  zIndex: 3,
                  animation: "floatEmoji 5.5s ease-in-out infinite 1.2s",
                  transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
                  direction: dir,
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 6vw, 56px)",
                    height: "clamp(44px, 6vw, 56px)",
                    borderRadius: "16px",
                    background: darkMode
                      ? "rgba(234, 88, 12, 0.2)"
                      : "rgba(234, 88, 12, 0.1)",
                    border: darkMode
                      ? "1px solid rgba(234, 88, 12, 0.3)"
                      : "1px solid rgba(234, 88, 12, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <UtensilsCrossed size={22} color="#ea580c" />
                </div>
                <span
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 15px)",
                    fontWeight: 700,
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                    whiteSpace: "nowrap",
                    fontFamily: isRTL
                      ? "'Tajawal', 'Cairo', system-ui, sans-serif"
                      : "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {isRTL ? "مطاعم" : "Restaurants"}
                </span>
              </div>

              {/* Floating Pharmacy Card */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  bottom: isMobile ? "15%" : "12%",
                  left: isMobile ? "42%" : "35%",
                  padding: "clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 24px)",
                  borderRadius: "clamp(16px, 2vw, 24px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(6px, 1vw, 10px)",
                  zIndex: 10,
                  animation: "floatEmoji 5s ease-in-out infinite 0.4s",
                  transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
                  direction: dir,
                }}
              >
                <div
                  style={{
                    width: "clamp(44px, 6vw, 56px)",
                    height: "clamp(44px, 6vw, 56px)",
                    borderRadius: "16px",
                    background: darkMode
                      ? "rgba(5, 150, 105, 0.2)"
                      : "rgba(5, 150, 105, 0.1)",
                    border: darkMode
                      ? "1px solid rgba(5, 150, 105, 0.3)"
                      : "1px solid rgba(5, 150, 105, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Pill size={22} color="#059669" />
                </div>
                <span
                  style={{
                    fontSize: "clamp(13px, 1.5vw, 15px)",
                    fontWeight: 700,
                    color: darkMode ? "#f1f5f9" : "#1e293b",
                    whiteSpace: "nowrap",
                    fontFamily: isRTL
                      ? "'Tajawal', 'Cairo', system-ui, sans-serif"
                      : "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {isRTL ? "صيدليات" : "Pharmacy"}
                </span>
              </div>

              {/* Floating Chat Button */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  bottom: isMobile ? "22%" : "18%",
                  right: isMobile ? "2%" : "-5%",
                  width: "clamp(48px, 7vw, 60px)",
                  height: "clamp(48px, 7vw, 60px)",
                  borderRadius: "clamp(14px, 2vw, 18px)",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  animation: "floatSlow 4s ease-in-out infinite 1.8s",
                  transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                  boxShadow: darkMode
                    ? "0 12px 28px rgba(34, 197, 94, 0.4)"
                    : "0 12px 28px rgba(34, 197, 94, 0.3)",
                  cursor: "pointer",
                }}
              >
                <MessageCircle size={22} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESTAURANTS BY AREA ========== */}
      <section
        style={{
          padding: "0 24px 60px",
          maxWidth: "1320px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: "28px", direction: dir }}>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 800,
              color: darkMode ? "#f4f4f5" : "#1e293b",
              marginBottom: "8px",
            }}
          >
            {isRTL ? "تصفح المطاعم حسب منطقتك" : "Browse Restaurants by Area"}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: darkMode ? "#94a3b8" : "#64748b",
            }}
          >
            {isRTL
              ? "اكتشف أفضل المطاعم والمتاجر القريبة منك"
              : "Discover the best restaurants and stores near you"}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            ...glassStyle,
            padding: "16px",
            borderRadius: "24px",
            display: "flex",
            gap: "16px",
            marginBottom: "40px",
            flexWrap: "wrap",
            direction: dir,
          }}
        >
          {/* Search Input */}
          <div style={{ flex: "1", minWidth: "220px", position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#94a3b8" : "#64748b",
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
                padding: isRTL ? "16px 48px 16px 20px" : "16px 20px 16px 48px",
                borderRadius: "16px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(0,0,0,0.05)",
                backgroundColor: darkMode
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(255,255,255,0.5)",
                color: darkMode ? "#f4f4f5" : "#1e293b",
                fontSize: "15px",
                outline: "none",
                fontFamily: "inherit",
                direction: dir,
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.backgroundColor = darkMode
                  ? "rgba(0,0,0,0.4)"
                  : "#ffffff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)";
                e.target.style.backgroundColor = darkMode
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(255,255,255,0.5)";
              }}
            />
          </div>

          {/* City Dropdown */}
          <div style={{ position: "relative", minWidth: "200px" }}>
            <MapPin
              size={18}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#94a3b8" : "#64748b",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: "100%",
                padding: isRTL ? "16px 48px 16px 48px" : "16px 48px 16px 48px",
                borderRadius: "16px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(0,0,0,0.05)",
                backgroundColor: darkMode
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(255,255,255,0.5)",
                color: darkMode ? "#f4f4f5" : "#1e293b",
                fontSize: "15px",
                outline: "none",
                fontFamily: "inherit",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                direction: dir,
                transition: "all 0.3s ease",
              }}
            >
              <option
                value=""
                style={{ background: darkMode ? "#1e293b" : "#fff" }}
              >
                {isRTL ? "جميع المناطق" : "All Areas"}
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                  style={{ background: darkMode ? "#1e293b" : "#fff" }}
                >
                  {city.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              style={{
                position: "absolute",
                [isRTL ? "left" : "right"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: darkMode ? "#94a3b8" : "#64748b",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Store Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {storesLoading ? (
            Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                style={{
                  ...glassStyle,
                  borderRadius: "24px",
                  overflow: "hidden",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    height: "160px",
                    borderRadius: "16px",
                    backgroundColor: darkMode ? "#1e293b" : "#e2e8f0",
                  }}
                  className="animate-pulse"
                />
                <div style={{ padding: "20px 8px 8px" }}>
                  <div
                    style={{
                      height: "20px",
                      width: "60%",
                      backgroundColor: darkMode ? "#334155" : "#cbd5e1",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                    className="animate-pulse"
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "40%",
                      backgroundColor: darkMode ? "#334155" : "#cbd5e1",
                      borderRadius: "8px",
                    }}
                    className="animate-pulse"
                  />
                </div>
              </div>
            ))
          ) : storesError ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <Store
                size={56}
                style={{
                  color: darkMode ? "#475569" : "#94a3b8",
                  margin: "0 auto 16px",
                }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  color: darkMode ? "#f8fafc" : "#1e293b",
                  fontWeight: 600,
                }}
              >
                {isRTL ? "تعذر تحميل المتاجر" : "Unable to load stores"}
              </h3>
            </div>
          ) : stores.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <Store
                size={56}
                style={{
                  color: darkMode ? "#475569" : "#94a3b8",
                  margin: "0 auto 16px",
                }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  color: darkMode ? "#f8fafc" : "#1e293b",
                  fontWeight: 600,
                }}
              >
                {isRTL ? "لا توجد متاجر متاحة" : "No stores available"}
              </h3>
            </div>
          ) : (
            stores.map((store) => (
              <Link
                key={store.id}
                to={`/store/${store.id}`}
                style={{
                  ...glassStyle,
                  borderRadius: "24px",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  direction: dir,
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = darkMode
                    ? "0 24px 48px rgba(0,0,0,0.4)"
                    : "0 24px 48px rgba(31,38,135,0.15)";
                  e.currentTarget.style.background = darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  e.currentTarget.style.background = glassStyle.background;
                }}
              >
                <div
                  style={{
                    height: "160px",
                    borderRadius: "16px",
                    background: darkMode
                      ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                      : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
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
                    />
                  ) : (
                    <Store
                      size={48}
                      style={{ color: darkMode ? "#334155" : "#cbd5e1" }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      [isRTL ? "left" : "right"]: "12px",
                      padding: "6px 12px",
                      borderRadius: "100px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Clock size={12} />
                    {store.estimatedPreparationMinutes
                      ? `${store.estimatedPreparationMinutes} ${isRTL ? "دقيقة" : "min"}`
                      : isRTL
                        ? "20-30 دقيقة"
                        : "20-30 min"}
                  </div>
                </div>

                <div style={{ padding: "16px 8px 8px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: darkMode ? "#f8fafc" : "#1e293b",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isRTL ? store.nameAr : store.nameEn}
                    </h3>
                    {store.rating > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          background: "#fef3c7",
                        }}
                      >
                        <Star size={14} fill="#d97706" color="#d97706" />
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#d97706",
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
                      <MapPin size={14} color="#64748b" />
                      <span
                        style={{
                          fontSize: "13px",
                          color: darkMode ? "#94a3b8" : "#64748b",
                        }}
                      >
                        {store.city || (isRTL ? "غير محدد" : "Unknown")}
                      </span>
                    </div>
                    {store.deliveryFee > 0 && (
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#22c55e",
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

        {/* View All Stores Button */}
        {stores.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              direction: dir,
            }}
          >
            <Link
              to="/stores"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "16px",
                background: "var(--accent-500)",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Store size={20} />
              <span>{isRTL ? "عرض جميع المتاجر" : "View All Stores"}</span>
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
        )}
      </section>

      {/* ========== FEATURES GRID ========== */}
      <section
        style={{
          padding: "40px 24px 80px",
          maxWidth: "1320px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{ marginBottom: "48px", direction: dir, textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 900,
              color: darkMode ? "#f8fafc" : "#1e293b",
              marginBottom: "12px",
            }}
          >
            {isRTL ? "لماذا تطبيقنا؟" : "Why Choose Us?"}
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: darkMode ? "#94a3b8" : "#64748b",
            }}
          >
            {isRTL
              ? "كل ما تحتاجه في تجربة واحدة سلسة"
              : "Everything you need in one seamless experience"}
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                style={{
                  ...glassStyle,
                  padding: "40px 32px",
                  borderRadius: "32px",
                  transition: "all 0.4s ease",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.background = darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = glassStyle.background;
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "24px",
                    background: darkMode
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(34, 197, 94, 0.1)",
                    border: darkMode
                      ? "1px solid rgba(34, 197, 94, 0.25)"
                      : "1px solid rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <Icon size={32} color="var(--accent-500)" />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: darkMode ? "#f8fafc" : "#1e293b",
                    marginBottom: "12px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: darkMode ? "#94a3b8" : "#64748b",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      {/* Global Animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseOrb {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;
