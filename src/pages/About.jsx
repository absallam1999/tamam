import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Download,
  Users,
  Target,
  Eye,
  Heart,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  Zap,
  ShieldCheck,
  Cpu,
  Phone,
  TrendingUp,
  Truck,
  Sparkles,
  Clock,
  Store,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LangContext";

/* =========================================================
   SHARED DESIGN TOKENS
   ========================================================= */
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
    text: "#18181b",
    textStrong: "#09090b",
    textMuted: "#52525b",
    textFaint: "#71717a",
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

const About = () => {
  const { darkMode } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 40);
    return () => clearTimeout(timer);
  }, [isRTL]);

  const dir = isRTL ? "rtl" : "ltr";
  const c = darkMode ? TOKENS.dark : TOKENS.light;

  // Glass surface token — identical to Home.jsx
  const glassStyle = {
    background: c.surfaceGradient,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${c.border}`,
    boxShadow: c.shadow,
  };

  const stats = [
    {
      icon: Download,
      value: "20,000+",
      label: isRTL ? "تحميل للتطبيق" : "Active Downloads",
      sub: isRTL ? "في مختلف المتاجر" : "Across iOS & Android",
    },
    {
      icon: Users,
      value: "250+",
      label: isRTL ? "طلب يومي مباشر" : "Daily Orders Dispatched",
      sub: isRTL ? "بمعدل رضا 99.4%" : "99.4% Fulfillment rate",
    },
    {
      icon: Clock,
      value: `19 ${isRTL ? "دقيقة" : "min"}`,
      label: isRTL ? "متوسط زمن التوصيل" : "Average Delivery Time",
      sub: isRTL ? "تتبع فوري لحظي" : "Door-to-door dispatch",
    },
    {
      icon: Globe,
      value: `4+ ${isRTL ? "مدن" : "Cities"}`,
      label: isRTL ? "مدن ومناطق نشطة" : "Active Municipalities",
      sub: isRTL ? "وتوسع مستمر" : "Expanding continually",
    },
  ];

  const pillars = [
    {
      icon: Target,
      badge: isRTL ? "الرسالة" : "Mission",
      title: isRTL ? "تمكين الاقتصاد المحلي" : "Empowering Local Commerce",
      desc: isRTL
        ? "نسعى لربط المطاعم، المخابز، الصيدليات والمتاجر العائلية بملايين العملاء عبر بنية تحتية لوجستية ذكية تضمن النمو المستدام والتكلفة العادلة."
        : "Building an equitable, hyper-local digital pipeline that equips independent restaurants and stores with enterprise-grade logistics and instant customer access.",
    },
    {
      icon: Eye,
      badge: isRTL ? "الرؤية" : "Vision",
      title: isRTL ? "مستقبل التوصيل الذكي" : "The Future of Fast Logistics",
      desc: isRTL
        ? "أن نكون المنصة الأكثر ثقة وسرعة في الشرق الأوسط، مستفيدين من الذكاء الاصطناعي لتقليل هدر الوقت والانبعاثات وتحقيق توصيل في دقائق معدودة."
        : "To pioneer the swiftest, most dependable on-demand network in the MENA region by deploying algorithmic dispatching and sustainable delivery fleets.",
    },
    {
      icon: Heart,
      badge: isRTL ? "الالتزام" : "Values",
      title: isRTL ? "الشفافية وخدمة المجتمع" : "People-First Commitment",
      desc: isRTL
        ? "نضع سلامة المناديب ورضا المستهلك ودعم التجار في صلب قراراتنا؛ فكل طلب يمثل وعداً بالدقة والاهتمام والنزاهة المطلقة."
        : "Courier safety, merchant profitability, and uncompromised consumer delight form our ethical core. Every package is handled with utmost care.",
    },
  ];

  const techFeatures = [
    {
      icon: Cpu,
      title: isRTL
        ? "توجيه ذكي بالذكاء الاصطناعي"
        : "Algorithmic Route Optimization",
      desc: isRTL
        ? "توزيع الطلبات آلياً على أقرب مندوب لتفادي الزحام واختصار زمن الانتظار بنسبة 35%."
        : "Dynamic route mapping selects the optimal courier instantly to bypass traffic and slash delivery latency.",
    },
    {
      icon: ShieldCheck,
      title: isRTL
        ? "معايير سلامة وجودة صارمة"
        : "Guaranteed Food & Order Hygiene",
      desc: isRTL
        ? "فحص وتوثيق دوري لكافة المتاجر مع حقائب حرارية مخصصة تحفظ حرارة المأكولات طازجة."
        : "Insulated thermal delivery packs, certified merchant hygiene standards, and verified contactless handover.",
    },
    {
      icon: TrendingUp,
      title: isRTL ? "بوابة بيانات متقدمة للتجار" : "Merchant Growth Dashboard",
      desc: isRTL
        ? "لوحة تحكم تحليلية تمكن أصحاب المتاجر من تتبع المخزون والطلبات وسلوك المستهلك لحظياً."
        : "Real-time analytics portal equipping local store owners with sales insights, catalog controls, and trends.",
    },
    {
      icon: Zap,
      title: isRTL ? "دفع رقمي آمن 100%" : "Seamless Cashless Checkouts",
      desc: isRTL
        ? "تشفير بنكي كامل يدعم المحافظ الإلكترونية، البطاقات، والدفع عند الاستلام بكل مرونة."
        : "End-to-end PCI-DSS compliant checkout supporting local wallets, bank cards, and cash-on-arrival.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        color: c.text,
        position: "relative",
        overflowX: "hidden",
        background: "transparent",
        transition: "color 0.3s ease",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: isRTL ? "auto" : "10%",
          right: isRTL ? "10%" : "auto",
          width: "400px",
          height: "400px",
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
          top: "40%",
          right: isRTL ? "auto" : "5%",
          left: isRTL ? "5%" : "auto",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: isMobile ? "90px 20px 80px" : "120px 24px 100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: "36px",
            direction: dir,
            display: "inline-block",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "12px",
              ...glassStyle,
              color: c.textMuted,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT;
              e.currentTarget.style.transform =
                "translateX(isRTL ? 4px : -4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = c.textMuted;
              e.currentTarget.style.transform = "none";
            }}
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{t("common.back") || (isRTL ? "الرئيسية" : "Home")}</span>
          </Link>
        </nav>

        {/* ========== HERO & SEO INTRO ========== */}
        <section
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            direction: dir,
            marginBottom: "70px",
          }}
        >
          {/* Micro Tag */}
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
              marginBottom: "20px",
            }}
          >
            <Sparkles size={14} />
            <span>{isRTL ? "رؤية المستقبل" : "Innovation in Motion"}</span>
          </div>

          <h1
            style={{
              fontSize: isMobile
                ? "clamp(32px, 8vw, 44px)"
                : "clamp(42px, 4.5vw, 58px)",
              fontWeight: 900,
              letterSpacing: isRTL ? "0" : "-0.03em",
              lineHeight: 1.15,
              marginBottom: "24px",
              color: c.textStrong,
              maxWidth: "880px",
            }}
          >
            {isRTL ? (
              <>نُعيد تعريف التجربة لخدمة كل بيت.</>
            ) : (
              <>
                Redefining the rhythm of experience for all community members.
              </>
            )}
          </h1>

          <p
            style={{
              fontSize: isMobile ? "16px" : "19px",
              color: c.textMuted,
              lineHeight: 1.75,
              maxWidth: "760px",
              fontWeight: 450,
              margin: 0,
            }}
          >
            {isRTL
              ? "تطبيق 'تمام' هو منصة لوجستية وتقنية متقدمة صُممت لكسر حواجز المسافات بين أفضل المطاعم ومحلات البقالة والصيدليات وبين المستهلك. نجمع بين هندسة البرمجيات الدقيقة وشبكة مناديب محترفة لتقديم تجربة حجز وطلب استثنائية وبأعلى درجات الموثوقية."
              : "Tamam is a smart on-demand logistics platform bridging local commerce with everyday households. By pairing advanced dispatching algorithms with dedicated local couriers, we make food, essential medicines, and groceries available at the tap of a button in record time."}
          </p>
        </section>

        {/* ========== LIVE METRICS & IMPACT ========== */}
        <section
          aria-label="Platform Impact Metrics"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(auto-fit, minmax(220px, 1fr))"
              : "repeat(4, 1fr)",
            gap: "18px",
            marginBottom: "80px",
            direction: dir,
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                style={{
                  ...glassStyle,
                  padding: "26px 20px",
                  borderRadius: "24px",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = c.badgeBorder;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = c.border;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: c.badgeBg,
                    border: `1px solid ${c.badgeBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: ACCENT,
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={22} />
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: c.textStrong,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: c.text,
                    marginBottom: "4px",
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: "12px", color: c.textMuted }}>
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </section>

        {/* ========== STORY & HUMAN PURPOSE ========== */}
        <section
          style={{
            ...glassStyle,
            borderRadius: "32px",
            padding: isMobile ? "36px 24px" : "56px 48px",
            marginBottom: "90px",
            direction: dir,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {isRTL ? "قصتنا وبدايتنا" : "Our Origin Story"}
              </div>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "34px",
                  fontWeight: 900,
                  color: c.textStrong,
                  lineHeight: 1.25,
                  marginBottom: "18px",
                }}
              >
                {isRTL
                  ? "بدأنا من قلب الشارع لنحل مشكلة حقيقية يعيشها الجميع."
                  : "Born from local neighborhood realities to build a dependable bridge."}
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: c.textMuted,
                  marginBottom: "16px",
                }}
              >
                {isRTL
                  ? "لاحظنا أن معظم خدمات التوصيل تركز فقط على المدن الكبرى وتهمل المدن والمحافظات الواعدة التي تعج بالمطاعم الرائعة والمتاجر التي تحتاج إلى قناة رقمية فعالة. تأسس تطبيق تمام ليكون الحل السريع والذكي الذي يمنح الجميع تجربة تسوق راقية بكفاءة لا تقل عن المعايير العالمية."
                  : "We noticed that rapid commerce typically overlooked secondary cities and vibrant regional communities packed with authentic food and essential shops. Tamam was built to empower regional businesses with world-class logistics and provide households with a reliable delivery standard they can trust everyday."}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "24px",
                }}
              >
                {[
                  isRTL ? "✓ دعم المتاجر المحلية" : "✓ Local merchant advocacy",
                  isRTL ? "✓ تأمين معتمد للطلبات" : "✓ Insured safe deliveries",
                  isRTL ? "✓ طاقم دعم 24/7" : "✓ 24/7 Live customer care",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: ACCENT,
                      padding: "6px 12px",
                      borderRadius: "10px",
                      background: c.badgeBg,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Decorative Box */}
            <div
              style={{
                borderRadius: "24px",
                padding: "30px",
                background: darkMode
                  ? "linear-gradient(135deg, rgba(20,83,45,0.35) 0%, rgba(15,15,17,0.85) 100%)"
                  : "linear-gradient(135deg, rgba(220,252,231,0.75) 0%, rgba(250,250,250,0.9) 100%)",
                border: `1px solid ${c.badgeBorder}`,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Store size={28} color={ACCENT} />
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: c.textStrong,
                    }}
                  >
                    {isRTL
                      ? "الكثير من الشركاء المعتمدين"
                      : "100+ Certified Merchants"}
                  </div>
                  <div style={{ fontSize: "13px", color: c.textMuted }}>
                    {isRTL
                      ? "مطاعم، بقالة، صيدليات"
                      : "Dining, Groceries, Medicine"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "1px",
                  background: c.border,
                }}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Truck size={28} color="#f59e0b" />
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: c.textStrong,
                    }}
                  >
                    {isRTL ? "أسطول كباتن محترف" : "Dedicated Courier Fleet"}
                  </div>
                  <div style={{ fontSize: "13px", color: c.textMuted }}>
                    {isRTL
                      ? "تدريب معتمد وسلامة كاملة"
                      : "Vetted, trained, and safety-audited"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== MISSION, VISION & ETHOS ========== */}
        <section style={{ marginBottom: "90px", direction: dir }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 900,
                color: c.textStrong,
                marginBottom: "12px",
              }}
            >
              {isRTL
                ? "مبادئنا الأساسية التي توجهنا"
                : "Our Core Operating Pillars"}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: c.textMuted,
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              {isRTL
                ? "نعمل كل يوم وفق بوصلة واضحة تركز على الإنسان، التكنولوجيا، والأمانة اللوجستية."
                : "Guided everyday by transparency, cutting-edge technology, and community empowerment."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    ...glassStyle,
                    padding: "36px 28px",
                    borderRadius: "28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transition: "all 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = c.badgeBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = c.border;
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
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
                        color: ACCENT,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        color: ACCENT,
                        background: c.badgeBg,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: c.text,
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: c.textMuted,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== TECH & ARCHITECTURE ========== */}
        <section
          style={{
            ...glassStyle,
            borderRadius: "32px",
            padding: isMobile ? "36px 24px" : "60px 48px",
            marginBottom: "90px",
            direction: dir,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              {isRTL ? "البنية التقنية" : "Engineering Architecture"}
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.2vw, 34px)",
                fontWeight: 900,
                color: c.textStrong,
                marginBottom: "10px",
              }}
            >
              {isRTL
                ? "تقنيات حديثة تقف خلف كل طلب ناجح"
                : "Engineered for 99.9% Uptime & Speed"}
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: c.textMuted,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {isRTL
                ? "ندمج بين الذكاء الاصطناعي، إنترنت الأشياء والخرائط الحية لخلق سلاسة مطلقة."
                : "Leveraging distributed cloud networks, live GPS telemetry, and fraud prevention algorithms."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {techFeatures.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: "24px",
                    borderRadius: "20px",
                    background: c.chipBg,
                    border: `1px solid ${c.border}`,
                    display: "flex",
                    gap: "18px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "14px",
                      background: c.badgeBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ACCENT,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        color: c.text,
                        marginBottom: "6px",
                      }}
                    >
                      {tech.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: c.textMuted,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== LOCATION & CONTACT PILL ========== */}
  <section
  style={{
    ...glassStyle,
    padding: "24px 32px",
    borderRadius: "24px",
    marginBottom: "70px",
    direction: dir,
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "20px",
      alignItems: "center",
    }}
  >
    {/* Headquarters */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: c.badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <MapPin size={20} color={ACCENT} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "12px", color: c.textMuted }}>
          {isRTL ? "المقر الرئيسي" : "Headquarters"}
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: c.text,
          }}
        >
          {isRTL ? "محافظة البحيرة، جمهورية مصر العربية" : "Beheira Governorate, Egypt"}
        </div>
      </div>
    </div>

    {/* Inquiries & Support */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: c.badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Mail size={20} color={ACCENT} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "12px", color: c.textMuted }}>
          {isRTL ? "البريد الرسمي" : "For Inquiries"}
        </div>
        <a
          href="mailto:contact@tamamapp.net"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: ACCENT,
            textDecoration: "none",
            wordBreak: "break-word",
          }}
        >
          contact@tamamapp.net
        </a>
      </div>
    </div>

    {/* Phone */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: c.badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Phone size={20} color={ACCENT} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "12px", color: c.textMuted }}>
          {isRTL ? "اتصل بنا" : "Call Us"}
        </div>
        <a
          href="tel:+2001559477726"
          dir="ltr"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: ACCENT,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          +20 (015) 594 777 26
        </a>
      </div>
    </div>
  </div>
</section>

        {/* ========== CTA BANNER ========== */}
        <section
          style={{
            ...glassStyle,
            borderRadius: "32px",
            padding: isMobile ? "40px 24px" : "60px 48px",
            textAlign: "center",
            direction: dir,
            background: darkMode
              ? "linear-gradient(135deg, rgba(20,83,45,0.35) 0%, rgba(15,15,17,0.85) 100%)"
              : "linear-gradient(135deg, rgba(220,252,231,0.75) 0%, rgba(250,250,250,0.9) 100%)",
            border: `1px solid ${c.badgeBorder}`,
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "24px" : "36px",
              fontWeight: 900,
              color: c.textStrong,
              marginBottom: "14px",
            }}
          >
            {isRTL
              ? "هل ترغب في الانضمام إلى شبكة شركاء تمام؟"
              : "Ready to Scale Your Business with Tamam?"}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: c.textMuted,
              maxWidth: "540px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {isRTL
              ? "سواء كنت صاحب مطعم، متجر تجزئة، أو كابتن توصيل طموح، منصتنا تفتح لك آفاقاً أوسع لزيادة مبيعاتك وأرباحك اليومية."
              : "Whether you run an eatery, manage a local grocery, or seek flexible courier earnings, partner with our thriving ecosystem today."}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Partnership — Primary CTA */}
            <Link
              to="/partnership"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${ACCENT} 0%, #16a34a 100%)`,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 35px rgba(34, 197, 94, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(34, 197, 94, 0.35)";
              }}
            >
              <Users size={18} />
              <span>{isRTL ? "انضم كشريك" : "Become a Partner"}</span>
            </Link>

            {/* Contact — Outline CTA */}
            <Link
              to="/contact"
              style={{
                ...glassStyle,
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 28px",
                borderRadius: "16px",
                color: c.text,
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = c.badgeBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = c.border;
              }}
            >
              <Mail size={18} color={ACCENT} />
              <span>
                {t("common.contact_us") ||
                  (isRTL ? "تواصل معنا اليوم" : "Contact Us")}
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
