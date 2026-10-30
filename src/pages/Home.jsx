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
  Store,
  Search,
  ChevronDown,
  ChevronUp,
  UtensilsCrossed,
  Pill,
  Smartphone,
  QrCode,
  Package,
} from "lucide-react";
import { useLanguage } from "../contexts/LangContext";
import { useTheme } from "../contexts/ThemeContext";
import { useBrowse } from "../hooks/useBrowse";

const TOKENS = {
  dark: {
    text: "#f4f4f5", // zinc-100
    textStrong: "#fafafa", // zinc-50
    textMuted: "#a1a1aa", // zinc-400
    textFaint: "#71717a", // zinc-500
    border: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.10)",
    surface: "rgba(24, 24, 27, 0.72)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(24,24,27,0.72) 0%, rgba(15,15,17,0.60) 100%)",
    surfaceSolid: "#18181b",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeBorder: "rgba(34,197,94,0.28)",
    chipBg: "rgba(255,255,255,0.03)",
    shadow:
      "0 20px 50px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  light: {
    text: "#18181b", // zinc-900
    textStrong: "#09090b", // zinc-950
    textMuted: "#52525b", // zinc-600
    textFaint: "#71717a", // zinc-500
    border: "rgba(0,0,0,0.06)",
    borderStrong: "rgba(0,0,0,0.10)",
    surface: "rgba(255,255,255,0.85)",
    surfaceGradient:
      "linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(250,250,250,0.75) 100%)",
    surfaceSolid: "#ffffff",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.22)",
    chipBg: "rgba(0,0,0,0.02)",
    shadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
};

const ACCENT = "var(--accent-500, #22c55e)";

// --- 3D Background Component ---
const Interactive3DBackground = ({ darkMode }) => {
  const sphereRef = useRef();

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    if (sphereRef.current) {
      sphereRef.current.position.x +=
        (x * 0.15 - sphereRef.current.position.x) * 0.08;
      sphereRef.current.position.y +=
        (y * 0.15 - sphereRef.current.position.y) * 0.08;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={darkMode ? 0.25 : 0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.8}
        color={darkMode ? "#22c55e" : "#ffffff"}
      />

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh ref={sphereRef} position={[2.5, 0.2, -4]} scale={2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={darkMode ? "#052e16" : "#dcfce7"}
            envMapIntensity={darkMode ? 0.6 : 1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.15}
            roughness={0.1}
            distort={0.42}
            speed={2.2}
            transparent
            opacity={darkMode ? 0.35 : 0.55}
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.8} floatIntensity={2.5}>
        <mesh position={[-3.5, 2.2, -7]} scale={1.4}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={darkMode ? "#ca8a04" : "#fef08a"}
            envMapIntensity={0.8}
            distort={0.35}
            speed={3}
            transparent
            opacity={darkMode ? 0.2 : 0.45}
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
  const [activeFaq, setActiveFaq] = useState(null);

  const {
    stores,
    cities,
    search,
    selectedCityId,
    storesLoading,
    storesError,
    handleSearch,
    handleCityChange,
  } = useBrowse();

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
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
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  // Glass surface token
  const glassStyle = {
    background: c.surfaceGradient,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${c.border}`,
    boxShadow: c.shadow,
  };

  const steps = [
    {
      step: "01",
      icon: Search,
      title: isRTL ? "اختر متجرك المفضل" : "Select Your Store",
      desc: isRTL
        ? "تصفح مئات المطاعم، المخابز والصيدليات المعتمدة في منطقتك."
        : "Browse through hundreds of certified local restaurants, bakeries & pharmacies.",
    },
    {
      step: "02",
      icon: Package,
      title: isRTL ? "خصص طلبك وادفع بأمان" : "Customize & Pay Securely",
      desc: isRTL
        ? "أضف ملاحظاتك وخياراتك وادفع بالمحفظة، انستاباى أو نقداً عند الاستلام."
        : "Tailor dishes to your taste and pay via mobile wallet, InstaPay or cash on delivery.",
    },
    {
      step: "03",
      icon: Truck,
      title: isRTL ? "تتبع وصول مندوبك لحظياً" : "Live GPS Tracking",
      desc: isRTL
        ? "راقب كابتن التوصيل على الخريطة لحظة بلحظة حتى عتبة بابك."
        : "Watch your courier moving in real time right up to your doorstep.",
    },
  ];

  const faqs = [
    {
      q: isRTL ? "ما هو تطبيق تمام؟" : "What is TamamApp?",
      a: isRTL
        ? "تمام هو خدمة توصيل سريعة وموثوقة تربطك بالمطاعم المحلية ومتاجر البقالة. نجعل الحصول على ما تحتاجه سهلاً وسريعاً."
        : "TamamApp is a fast, reliable delivery service that connects you with local restaurants and grocery stores. We make it easy to get what you need, when you need it.",
    },
    {
      q: isRTL ? "كيف أقوم بتقديم طلب؟" : "How do I place an order?",
      a: isRTL
        ? "حمّل التطبيق، أنشئ حساباً، تصفح المتاجر القريبة، أضف العناصر إلى السلة، وأكمل الدفع. سيتم توصيل طلبك إلى باب منزلك."
        : "Simply download the app, create an account, browse nearby stores, add items to your cart, and checkout. Your order will be delivered to your doorstep.",
    },
    {
      q: isRTL ? "كم يستغرق التوصيل عادةً؟" : "How long does delivery take?",
      a: isRTL
        ? "يستغرق التوصيل عادةً من 30 إلى 45 دقيقة حسب موقعك ووقت تحضير المطعم. يمكنك تتبع طلبك في الوقت الفعلي."
        : "Delivery typically takes 30-45 minutes depending on your location and restaurant preparation time. You can track your order in real-time.",
    },
    {
      q: isRTL
        ? "ما هي طرق الدفع التي تقبلونها؟"
        : "What payment methods do you accept?",
      a: isRTL
        ? "نقبل المحافظ الإلكترونية، إنستاباي، والدفع النقدي عند الاستلام."
        : "We accept mobile wallets, InstaPay, and cash on delivery.",
    },
    {
      q: isRTL ? "كيف أتتبع طلبي؟" : "How do I track my order?",
      a: isRTL
        ? "يمكنك تتبع طلبك في الوقت الفعلي عبر التطبيق. ستتلقى إشعارات في كل خطوة: تأكيد الطلب، جاري التحضير، خارج للتوصيل، وتم التوصيل."
        : "You can track your order in real-time through the app. You'll receive notifications at every step: order confirmed, being prepared, out for delivery, and delivered.",
    },
    {
      q: isRTL ? "هل هناك رسوم توصيل؟" : "Is there a delivery fee?",
      a: isRTL
        ? "تختلف رسوم التوصيل حسب المسافة والطلب. بعض المطاعم تقدم توصيلاً مجانياً للطلبات التي تتجاوز مبلغاً معيناً."
        : "Delivery fees vary by distance and demand. Some restaurants offer free delivery on orders over a certain amount.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        color: c.text,
        position: "relative",
        overflowX: "hidden",
        background: "transparent",
        transition: "color 0.3s ease",
      }}
    >
      {/* ========== HERO ========== */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "96px 0 56px" : "136px 0 96px",
          minHeight: isMobile ? "auto" : "96vh",
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

        {/* Ambient Glow Orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: isRTL ? "auto" : "5%",
            right: isRTL ? "5%" : "auto",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: darkMode
              ? "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: isRTL ? "auto" : "10%",
            left: isRTL ? "10%" : "auto",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: darkMode
              ? "radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            maxWidth: "1340px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 2,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
              gap: isMobile ? "48px" : "48px",
              alignItems: "center",
            }}
          >
            {/* Left column */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                direction: dir,
                zIndex: 3,
              }}
            >
              {/* Live Now badge — matches Privacy badge tokens */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  background: c.badgeBg,
                  border: `1px solid ${c.badgeBorder}`,
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    height: "10px",
                    width: "10px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      backgroundColor: ACCENT,
                      opacity: 0.75,
                      animation:
                        "pingRadar 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      borderRadius: "50%",
                      height: "10px",
                      width: "10px",
                      backgroundColor: ACCENT,
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: isRTL ? "0" : "0.02em",
                    color: ACCENT,
                  }}
                >
                  {isRTL ? "نشط الآن" : "Live Now"}
                </span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontSize: isMobile
                    ? "clamp(34px, 8.5vw, 44px)"
                    : "clamp(46px, 4.8vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: isRTL ? "0" : "-0.035em",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                  color: c.textStrong,
                }}
              >
                {isRTL ? (
                  <>
                    <span className="headline-line">كل ما تريده،</span>
                    <span className="headline-line">مباشرة لبابك.</span>
                  </>
                ) : (
                  <>
                    <span className="headline-line">
                      Craving or Essentials?
                    </span>
                    <span className="headline-line">
                      Delivered to your doorstep.
                    </span>
                  </>
                )}
              </h1>

              <p
                style={{
                  fontSize: isMobile ? "16px" : "19px",
                  color: c.textMuted,
                  lineHeight: 1.65,
                  marginBottom: "36px",
                  maxWidth: "520px",
                  fontWeight: 450,
                }}
              >
                {isRTL
                  ? "منصتك الموحدة للمطاعم القريبة، مقاضي السوبرماركت، وصيدليات الطوارئ بأعلى معايير الدقة والسرعة."
                  : "Hyper-local ordering for local restaurants, daily fresh groceries, and pharmacy emergencies with precision real-time tracking."}
              </p>

              {/* CTA bar */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: "36px",
                }}
              >
                <Link
                  to="/download"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    borderRadius: "18px",
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #16a34a 100%)`,
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 700,
                    boxShadow: "0 12px 30px rgba(34, 197, 94, 0.35)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Download size={20} />
                  <span>
                    {t("hero.download") ||
                      (isRTL ? "حمّل التطبيق" : "Get The App")}
                  </span>
                </Link>

                <Link
                  to="/stores"
                  className="btn-ghost"
                  style={{
                    ...glassStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 28px",
                    borderRadius: "18px",
                    color: c.text,
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 650,
                  }}
                >
                  <Store size={20} color={ACCENT} />
                  <span>{isRTL ? "استكشف المتاجر" : "Browse Stores"}</span>
                  {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>
              </div>

              {/* Social proof */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  flexWrap: "wrap",
                  paddingTop: "20px",
                  marginTop: "4px",
                  borderTop: `1px solid ${c.border}`,
                  maxWidth: "480px",
                  direction: dir,
                }}
              >
                {/* Avatar cluster */}
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    alignItems: "center",
                  }}
                >
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Customer"
                      loading="lazy"
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${darkMode ? "#09090b" : "#ffffff"}`,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        marginInlineStart: i === 0 ? 0 : "-10px", // logical → overlaps correctly in RTL & LTR
                        position: "relative",
                        zIndex: 10 - i,
                        transition: "transform 0.2s ease",
                      }}
                    />
                  ))}
                  {/* +20k chip */}
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      marginInlineStart: "-10px",
                      background: darkMode
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(34,197,94,0.1)",
                      border: `2px solid ${darkMode ? "#09090b" : "#ffffff"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 800,
                      color: ACCENT,
                      position: "relative",
                      zIndex: 5,
                    }}
                  >
                    20k+
                  </div>
                </div>

                {/* Rating + copy */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    minWidth: 0,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Star row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          fill="#facc15"
                          color="#facc15"
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: c.text,
                        lineHeight: 1,
                      }}
                    >
                      4.9
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: c.textMuted,
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      / 5
                    </span>
                  </div>
                  {/* Copy */}
                  <span
                    style={{
                      fontSize: "12px",
                      color: c.textMuted,
                      lineHeight: 1.4,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {isRTL
                      ? "أكثر من 20,000 عميل سعيد هذا الشهر"
                      : "Trusted by 20,000+ happy customers this month"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — Showcase */}
            <div
              style={{
                position: "relative",
                height: isMobile ? "420px" : "580px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.92)",
                transition: "all 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.15s",
              }}
            >
              <div
                style={{
                  width: isMobile ? "280px" : "400px",
                  height: isMobile ? "280px" : "400px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(34,197,94,0.28) 0%, rgba(245,158,11,0.1) 70%, transparent 100%)",
                  filter: "blur(50px)",
                  position: "absolute",
                  animation: "pulseOrb 5s ease-in-out infinite",
                }}
              />

              <img
                src="./hero/avatar.png"
                alt="Delivery Showcase"
                style={{
                  width: "100%",
                  maxWidth: isMobile ? "320px" : "460px",
                  position: "relative",
                  zIndex: 4,
                  animation: "floatSlow 5s ease-in-out infinite",
                  filter: darkMode
                    ? "drop-shadow(0 25px 45px rgba(0,0,0,0.6))"
                    : "drop-shadow(0 25px 45px rgba(34,197,94,0.18))",
                  transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
                  transition: "transform 0.15s ease-out",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />

              {/* Category — Restaurants */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  bottom: isMobile ? "22%" : "20%",
                  [isRTL ? "right" : "left"]: isMobile ? "0%" : "-6%",
                  padding: "10px 16px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  zIndex: 6,
                  animation: "floatEmoji 5.6s ease-in-out infinite 1.8s",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background: "rgba(234, 88, 12, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UtensilsCrossed size={17} color="#ea580c" />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: c.text,
                  }}
                >
                  {isRTL ? "مطاعم" : "Restaurants"}
                </span>
              </div>

              {/* Category — Groceries */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  bottom: isMobile ? "18%" : "16%",
                  [isRTL ? "left" : "right"]: isMobile ? "0%" : "-4%",
                  padding: "10px 16px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  zIndex: 6,
                  animation: "floatEmoji 4.5s ease-in-out infinite 1.2s",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background: "rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBag size={17} color="#f59e0b" />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: c.text,
                  }}
                >
                  {isRTL ? "سوبرماركت" : "Groceries"}
                </span>
              </div>

              {/* Category — Pharmacies */}
              <div
                style={{
                  ...glassStyle,
                  position: "absolute",
                  top: isMobile ? "2%" : "6%",
                  [isRTL ? "left" : "right"]: isMobile ? "0%" : "-4%",
                  padding: "10px 16px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  zIndex: 6,
                  animation: "floatSlow 4s ease-in-out infinite 0.5s",
                  transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
                  direction: dir,
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background: "rgba(34, 197, 94, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pill size={17} color={ACCENT} />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: c.text,
                  }}
                >
                  {isRTL ? "صيدليات" : "Pharmacies"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STORES ========== */}
      <section
        style={{
          padding: "20px 24px 60px",
          maxWidth: "1340px",
          margin: "0 auto",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "16px",
            direction: dir,
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "6px",
              }}
            >
              {isRTL ? "المتاجر المعتمدة" : "Verified Outlets"}
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 3.2vw, 36px)",
                fontWeight: 800,
                letterSpacing: isRTL ? "0" : "-0.02em",
                color: c.textStrong,
                margin: 0,
              }}
            >
              {isRTL ? "استكشف المطاعم والمتاجر" : "Browse Stores In Your Area"}
            </h2>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            ...glassStyle,
            padding: "14px",
            borderRadius: "22px",
            display: "flex",
            gap: "14px",
            marginBottom: "40px",
            flexWrap: "wrap",
            direction: dir,
          }}
        >
          <div style={{ flex: "1", minWidth: "220px", position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: c.textFaint,
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
                  ? "ابحث عن مطعم أو وجبة معينة..."
                  : "Search food, grocery, or favorite places..."
              }
              style={{
                width: "100%",
                padding: isRTL ? "15px 46px 15px 18px" : "15px 18px 15px 46px",
                borderRadius: "14px",
                border: `1px solid ${c.border}`,
                backgroundColor: darkMode
                  ? "rgba(0,0,0,0.25)"
                  : "rgba(255,255,255,0.8)",
                color: c.text,
                fontSize: "15px",
                outline: "none",
                fontFamily: "inherit",
                direction: dir,
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = ACCENT)}
              onBlur={(e) => (e.target.style.borderColor = c.border)}
            />
          </div>

          <div style={{ position: "relative", minWidth: "220px" }}>
            <MapPin
              size={18}
              style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: c.textFaint,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <select
              value={selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: "100%",
                padding: isRTL ? "15px 46px 15px 46px" : "15px 46px 15px 46px",
                borderRadius: "14px",
                border: `1px solid ${c.border}`,
                backgroundColor: darkMode
                  ? "rgba(0,0,0,0.25)"
                  : "rgba(255,255,255,0.8)",
                color: c.text,
                fontSize: "15px",
                outline: "none",
                fontFamily: "inherit",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
                direction: dir,
              }}
            >
              <option value="" style={{ background: c.surfaceSolid }}>
                {isRTL ? "جميع المدن والمناطق" : "All Cities & Areas"}
              </option>
              {cities.map((city) => (
                <option
                  key={city.id}
                  value={city.id}
                  style={{ background: c.surfaceSolid }}
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
                color: c.textFaint,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Store Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {storesLoading ? (
            Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                style={{
                  ...glassStyle,
                  borderRadius: "22px",
                  overflow: "hidden",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    borderRadius: "16px",
                    backgroundColor: darkMode ? "#27272a" : "#e4e4e7",
                  }}
                  className="animate-pulse"
                />
                <div style={{ padding: "18px 8px 8px" }}>
                  <div
                    style={{
                      height: "20px",
                      width: "60%",
                      backgroundColor: darkMode ? "#27272a" : "#d4d4d8",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                    className="animate-pulse"
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "40%",
                      backgroundColor: darkMode ? "#27272a" : "#d4d4d8",
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
                style={{ color: c.textFaint, margin: "0 auto 16px" }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  color: c.text,
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
                style={{ color: c.textFaint, margin: "0 auto 16px" }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  color: c.text,
                  fontWeight: 600,
                }}
              >
                {isRTL ? "لا توجد متاجر متاحة حالياً" : "No stores found"}
              </h3>
            </div>
          ) : (
            stores.slice(0, 6).map((store) => (
              <Link
                key={store.id}
                to={`/store/${store.id}`}
                className="store-card"
                style={{
                  ...glassStyle,
                  borderRadius: "22px",
                  overflow: "hidden",
                  cursor: "pointer",
                  direction: dir,
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    borderRadius: "16px",
                    background: darkMode
                      ? "linear-gradient(135deg, #27272a 0%, #18181b 100%)"
                      : "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)",
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
                      className="store-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  ) : (
                    <Store size={48} style={{ color: c.textFaint }} />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      [isRTL ? "left" : "right"]: "12px",
                      padding: "5px 10px",
                      borderRadius: "100px",
                      backgroundColor: "rgba(9, 9, 11, 0.78)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#fafafa",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Clock size={12} color={ACCENT} />
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
                      alignItems: "center",
                      marginBottom: "8px",
                      gap: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        color: c.text,
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isRTL ? store.nameAr : store.nameEn}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: "3px 8px",
                        borderRadius: "8px",
                        background: darkMode
                          ? "rgba(234, 179, 8, 0.15)"
                          : "#fef3c7",
                        flexShrink: 0,
                      }}
                    >
                      <Star size={12} fill="#eab308" color="#eab308" />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: darkMode ? "#facc15" : "#ca8a04",
                        }}
                      >
                        {store.rating ? store.rating.toFixed(1) : "4.8"}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: c.textMuted,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        minWidth: 0,
                      }}
                    >
                      <MapPin
                        size={13}
                        color={ACCENT}
                        style={{ flexShrink: 0 }}
                      />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {store.city ||
                          (isRTL ? "المنطقة المركزية" : "Central City")}
                      </span>
                    </div>
                    <span
                      style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}
                    >
                      {store.deliveryFee > 0
                        ? `${store.deliveryFee} ${isRTL ? "ج.م توصيل" : "EGP"}`
                        : isRTL
                          ? "توصيل مجاني"
                          : "Free Delivery"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section
        style={{
          maxWidth: "1340px",
          margin: "0 auto",
          padding: "50px 24px 80px",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div
          style={{ textAlign: "center", marginBottom: "48px", direction: dir }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: ACCENT,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            {isRTL ? "بساطة وسرعة" : "Frictionless Flow"}
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: isRTL ? "0" : "-0.02em",
              color: c.textStrong,
              marginBottom: "12px",
            }}
          >
            {isRTL
              ? "كيف يعمل النظام في 3 خطوات؟"
              : "How It Works in 3 Quick Steps"}
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: c.textMuted,
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {isRTL
              ? "صممنا تجربة المستخدم لتقليل وقت الطلب لأقل من 60 ثانية."
              : "Engineered from ground up to reduce your checkout friction to under 60 seconds."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                style={{
                  ...glassStyle,
                  borderRadius: "24px",
                  padding: "36px 26px",
                  position: "relative",
                  direction: dir,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    [isRTL ? "left" : "right"]: "26px",
                    fontSize: "36px",
                    fontWeight: 900,
                    color: darkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    lineHeight: 1,
                  }}
                >
                  {s.step}
                </div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: c.badgeBg,
                    border: `1px solid ${c.badgeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "22px",
                  }}
                >
                  <Icon size={24} color={ACCENT} />
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: c.text,
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: c.textMuted,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== MOBILE APP SHOWCASE ========== */}
      <section
        style={{
          maxWidth: "1340px",
          margin: "0 auto 80px",
          padding: "0 24px",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div
          style={{
            borderRadius: "32px",
            padding: isMobile ? "36px 22px" : "56px 46px",
            background: darkMode
              ? "linear-gradient(135deg, rgba(20, 83, 45, 0.35) 0%, rgba(15, 15, 17, 0.85) 100%)"
              : "linear-gradient(135deg, rgba(220, 252, 231, 0.75) 0%, rgba(250, 250, 250, 0.9) 100%)",
            border: `1px solid ${c.badgeBorder}`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "center",
            direction: dir,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: c.badgeBg,
                color: ACCENT,
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              <Smartphone size={14} />
              <span>
                {isRTL ? "تجربة الهاتف المتطورة" : "Modern Mobile Ecosystem"}
              </span>
            </div>
            <h2
              style={{
                fontSize: isMobile ? "28px" : "38px",
                fontWeight: 800,
                letterSpacing: isRTL ? "0" : "-0.02em",
                lineHeight: 1.2,
                color: c.textStrong,
                marginBottom: "16px",
              }}
            >
              {isRTL
                ? "حمّل تطبيقنا واستمتع بتوصيل فائق السرعة أينما كنت"
                : "Unlock the Full Experience with our App"}
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: c.textMuted,
                lineHeight: 1.65,
                marginBottom: "30px",
                maxWidth: "520px",
              }}
            >
              {isRTL
                ? "احصل على إشعارات لحظية، خصومات حصرية لمستخدمي التطبيق، وميزة التتبع المباشر بالكاميرا والـ GPS."
                : "Real-time courier telematics, biometric one-tap checkouts, and app-only coupons made for everyday convenience."}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {/* App Store */}
              <a
                href="#"
                className="store-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  minWidth: "150px",
                  justifyContent: "center",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  style={{
                    width: "18px",
                    height: "20px",
                    flexShrink: 0,
                    filter: darkMode ? "none" : "invert(1)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    textAlign: "start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                    }}
                  >
                    {t("customerApp.hero.downloadAppStore")}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {t("customerApp.hero.appStore")}
                  </span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="store-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  backgroundColor: darkMode ? "#ffffff" : "#000000",
                  color: darkMode ? "#000000" : "#ffffff",
                  textDecoration: "none",
                  border: darkMode
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.1)",
                  minWidth: "150px",
                  justifyContent: "center",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/12/Google-Play-icon-logo.png"
                  alt="Google Play"
                  style={{
                    width: "26px",
                    height: "16px",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    textAlign: "start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      opacity: 0.7,
                      lineHeight: 1,
                    }}
                  >
                    {t("customerApp.hero.getItOn")}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {t("customerApp.hero.googlePlay")}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <div
              style={{
                ...glassStyle,
                padding: "24px",
                borderRadius: "24px",
                textAlign: "center",
                maxWidth: "260px",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  margin: "0 auto 14px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <QrCode size={126} color="#09090b" />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: c.text,
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "امسح للتحميل الفوري" : "Scan to Download"}
              </div>
              <div style={{ fontSize: "12px", color: c.textMuted }}>
                {isRTL
                  ? "متوافق مع iOS و Android"
                  : "Compatible with iOS & Android"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section
        style={{
          maxWidth: "880px",
          margin: "0 auto 100px",
          padding: "0 24px",
          position: "relative",
          zIndex: 4,
          direction: dir,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 800,
              letterSpacing: isRTL ? "0" : "-0.02em",
              color: c.textStrong,
              marginBottom: "10px",
            }}
          >
            {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: c.textMuted,
              lineHeight: 1.6,
            }}
          >
            {isRTL
              ? "إجابات واضحة ومباشرة لأبرز استفساراتك"
              : "Clear answers to your most common questions about ordering & delivery"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  ...glassStyle,
                  borderRadius: "18px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                  border: `1px solid ${isOpen ? c.badgeBorder : c.border}`,
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: isRTL ? "right" : "left",
                    color: c.text,
                    fontSize: "15px",
                    fontWeight: 700,
                    direction: dir,
                    gap: "12px",
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp
                      size={18}
                      color={ACCENT}
                      style={{ flexShrink: 0 }}
                    />
                  ) : (
                    <ChevronDown
                      size={18}
                      color={c.textFaint}
                      style={{ flexShrink: 0 }}
                    />
                  )}
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 18px",
                      fontSize: "14px",
                      color: c.textMuted,
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Local keyframes + reusable interaction classes */}
      <style>{`
        @keyframes pingRadar {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes pulseOrb {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        .headline-line {
          display: block;
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 18px 40px rgba(34, 197, 94, 0.5) !important;
        }
        .btn-ghost {
          transition: all 0.3s ease;
        }
        .btn-ghost:hover {
          transform: translateY(-3px);
          border-color: rgba(34, 197, 94, 0.4) !important;
        }

        .store-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .store-card:hover {
          transform: translateY(-6px);
          border-color: rgba(34, 197, 94, 0.3) !important;
        }
        .store-card:hover .store-img {
          transform: scale(1.05);
        }

        .store-btn:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .store-btn:hover { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;
