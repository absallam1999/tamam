import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  ChevronRight,
} from "lucide-react";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-light-bg-secondary dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden px-4">
      {/* --- Ambient Background Glows --- */}
      <div
        className="absolute top-[-10%] -start-32 w-[600px] h-[600px] bg-ios-blue/10 dark:bg-ios-blue/5 rounded-full blur-[140px] pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div className="absolute bottom-[-10%] -end-32 w-[600px] h-[600px] bg-ios-teal/10 dark:bg-ios-teal/5 rounded-full blur-[140px] pointer-events-none" />

      {/* --- Main Container --- */}
      <div className="relative w-full max-w-[1100px] mx-auto px-4 sm:px-8 py-12 sm:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* === LEFT SIDE === */}
          <div className="flex justify-center w-full">
            <div
              className="relative animate-scale-in"
              style={{ animationDuration: "0.7s", animationFillMode: "both" }}
            >
              {/* Glass Frame Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] glass bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-glass-xl overflow-hidden group">
                {/* Animated Map Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Ambient Inner Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/5 to-ios-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-ios" />

                {/* Central Compass Rose */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <Compass
                      size={56}
                      className="text-ios-blue/20 dark:text-ios-blue/30 animate-spin"
                      style={{ animationDuration: "20s" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-3.5 h-3.5 bg-ios-blue rounded-full shadow-[0_0_15px_rgba(0,122,255,0.6)] animate-pulse"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Map Pins (Staggered Animation) */}
                <div className="absolute top-[25%] start-[20%] animate-float">
                  <MapPin
                    size={24}
                    className="text-ios-red fill-ios-red/20 drop-shadow-md"
                  />
                </div>
                <div
                  className="absolute top-[60%] end-[25%] animate-float"
                  style={{ animationDelay: "300ms" }}
                >
                  <MapPin
                    size={18}
                    className="text-ios-blue fill-ios-blue/20 drop-shadow-md"
                  />
                </div>
                <div
                  className="absolute bottom-[30%] start-[35%] animate-float"
                  style={{ animationDelay: "600ms" }}
                >
                  <MapPin
                    size={16}
                    className="text-ios-teal fill-ios-teal/20 drop-shadow-md"
                  />
                </div>

                {/* Decorative Radar Rings */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-ios-blue/20 dark:border-ios-blue/10 animate-pulse"
                  style={{ animationDuration: "4s" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-ios-blue/10 dark:border-ios-blue/5 animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "500ms" }}
                />

                {/* Corner UI Elements */}
                <div className="absolute top-6 start-6">
                  <div className="px-2.5 py-2 rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm">
                    <MapPin
                      size={16}
                      className="text-ios-blue dark:text-ios-blue-light"
                    />
                  </div>
                </div>
                <div className="absolute top-6 end-6 text-end">
                  <p className="text-[10px] uppercase tracking-widest text-light-text-tertiary dark:text-dark-text-tertiary font-bold mb-0.5">
                    Status
                  </p>
                  <p className="text-xs font-bold text-ios-red drop-shadow-sm">
                    Signal Lost
                  </p>
                </div>
                <div className="absolute bottom-6 start-6 text-start">
                  <p className="text-[10px] uppercase tracking-widest text-light-text-tertiary dark:text-dark-text-tertiary font-bold mb-0.5">
                    Coordinates
                  </p>
                  <p className="text-xs font-mono font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    40.4° N, 0.0° W
                  </p>
                </div>
              </div>

              {/* Outer Decorative Glow Rings */}
              <div
                className="absolute -inset-4 border border-ios-blue/20 dark:border-ios-blue/10 rounded-[3rem] animate-pulse -z-10"
                style={{ animationDuration: "4s" }}
              />
              <div
                className="absolute -inset-8 border border-ios-blue/10 dark:border-ios-blue/5 rounded-[3.5rem] animate-pulse -z-10"
                style={{ animationDuration: "4s", animationDelay: "500ms" }}
              />
            </div>
          </div>

          {/* === Content === */}
          <div
            className={`sm:p-10 lg:p-12 w-full text-center lg:text-start flex flex-col justify-center h-full animate-fade-in-up ${isRTL ? "lg:text-end" : ""}`}
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-light-text-primary dark:text-dark-text-primary mb-5 tracking-tight leading-[1.05]">
              {t("notFound.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 tracking-normal">
              {t("notFound.subtitle")}
            </p>

            {/* Description */}
            <p className="text-[15px] sm:text-base text-light-text-tertiary dark:text-dark-text-tertiary mb-14 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t("notFound.description")}
            </p>

            {/* Spacer */}
            <div className="h-8 sm:h-10"></div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 w-full">
              <Link
                to="/"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 px-6 h-12 bg-ios-blue hover:bg-ios-blue-dark text-white rounded-xl font-semibold text-base shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <Home size={20} />
                <span className="leading-none">{t("notFound.backHome")}</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 px-6 h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary rounded-xl border border-light-border dark:border-dark-border font-semibold text-base hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary active:scale-[0.98] transition-all duration-200"
              >
                {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                <span className="leading-none">{t("notFound.goBack")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
