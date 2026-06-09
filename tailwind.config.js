/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Premium Font Families
      fontFamily: {
        "sans-en": [
          "Inter",
          "SF Pro Display",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        "sans-ar": ["Tajawal", "SF Pro Arabic", "system-ui", "sans-serif"],
        mono: ["SF Mono", "JetBrains Mono", "monospace"],
      },

      // iOS-Style Glassmorphism Blur Values
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },

      // Premium Color System
      colors: {
        // iOS Glass Colors
        glass: {
          light: "rgba(255, 255, 255, 0.72)",
          dark: "rgba(0, 0, 0, 0.82)",
          "light-md": "rgba(255, 255, 255, 0.52)",
          "dark-md": "rgba(0, 0, 0, 0.52)",
          "light-sm": "rgba(255, 255, 255, 0.32)",
          "dark-sm": "rgba(0, 0, 0, 0.32)",
          "light-xs": "rgba(255, 255, 255, 0.12)",
          "dark-xs": "rgba(0, 0, 0, 0.12)",
          "light-hover": "rgba(255, 255, 255, 0.92)",
          "dark-hover": "rgba(0, 0, 0, 0.92)",
          "light-active": "rgba(255, 255, 255, 0.96)",
          "dark-active": "rgba(0, 0, 0, 0.96)",
          border: {
            light: "rgba(255, 255, 255, 0.42)",
            dark: "rgba(255, 255, 255, 0.08)",
            lightHover: "rgba(255, 255, 255, 0.62)",
            darkHover: "rgba(255, 255, 255, 0.15)",
            lightActive: "rgba(255, 255, 255, 0.82)",
            darkActive: "rgba(255, 255, 255, 0.22)",
          },
        },

        // iOS-inspired System Colors
        ios: {
          blue: "#007AFF",
          blueLight: "#5E9BFF",
          blueDark: "#0055D4",
          green: "#34C759",
          greenLight: "#6EDD8B",
          greenDark: "#248A3D",
          indigo: "#5856D6",
          indigoLight: "#7E7AE8",
          indigoDark: "#3B3AA6",
          orange: "#FF9500",
          orangeLight: "#FFB340",
          orangeDark: "#CC7700",
          pink: "#FF2D55",
          pinkLight: "#FF6B8A",
          pinkDark: "#CC1A3E",
          purple: "#AF52DE",
          purpleLight: "#C57EED",
          purpleDark: "#8A3AB8",
          red: "#FF3B30",
          redLight: "#FF6B63",
          redDark: "#CC2E24",
          teal: "#5AC8FA",
          tealLight: "#8DDBFC",
          tealDark: "#2C9FD8",
          yellow: "#FFCC00",
          yellowLight: "#FFE066",
          yellowDark: "#CCA300",
          gray: "#8E8E93",
          grayLight: "#C6C6C8",
          grayDark: "#636366",
          gray2: "#AEAEB2",
          gray3: "#C7C7CC",
          gray4: "#D1D1D6",
          gray5: "#E5E5EA",
          gray6: "#F2F2F7",
        },

        // Premium Gradient System
        gradient: {
          primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          primaryReverse: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          secondaryReverse: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
          success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          successReverse: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
          warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          warningReverse: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)",
          danger: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
          info: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          dark: "linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)",
          light: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
          premium:
            "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #667eea 100%)",
        },

        // Accent Colors
        accent: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a5",
          900: "#581c87",
          950: "#3b0764",
        },

        // Neutral Colors
        neutral: {
          0: "#ffffff",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          1000: "#000000",
        },

        // Semantic Colors (For consistent theming)
        semantic: {
          primary: "#a855f7",
          primaryHover: "#9333ea",
          primaryActive: "#7e22ce",
          secondary: "#f093fb",
          secondaryHover: "#e879f9",
          secondaryActive: "#d946ef",
          success: "#10b981",
          successHover: "#059669",
          successActive: "#047857",
          warning: "#f59e0b",
          warningHover: "#d97706",
          warningActive: "#b45309",
          error: "#ef4444",
          errorHover: "#dc2626",
          errorActive: "#b91c1c",
          info: "#3b82f6",
          infoHover: "#2563eb",
          infoActive: "#1d4ed8",
        },

        // Dark Mode Optimized Colors
        dark: {
          bg: {
            primary: "#0a0a0a",
            secondary: "#141414",
            tertiary: "#1f1f1f",
            quaternary: "#2a2a2a",
            elevated: "#242424",
            card: "#1c1c1e",
            navbar: "#000000cc",
          },
          text: {
            primary: "#ffffff",
            secondary: "#a1a1aa",
            tertiary: "#71717a",
            disabled: "#52525b",
            accent: "#a855f7",
          },
          border: {
            light: "#27272a",
            DEFAULT: "#3f3f46",
            dark: "#52525b",
          },
        },

        // Light Mode Optimized Colors
        light: {
          bg: {
            primary: "#ffffff",
            secondary: "#fafafa",
            tertiary: "#f4f4f5",
            quaternary: "#e4e4e7",
            elevated: "#ffffff",
            card: "#ffffff",
            navbar: "#ffffffcc",
          },
          text: {
            primary: "#18181b",
            secondary: "#3f3f46",
            tertiary: "#71717a",
            disabled: "#a1a1aa",
            accent: "#a855f7",
          },
          border: {
            light: "#e4e4e7",
            DEFAULT: "#d4d4d8",
            dark: "#a1a1aa",
          },
        },

        // Brand Colors
        brand: {
          primary: "#a855f7",
          primaryGradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
          secondary: "#3b82f6",
          secondaryGradient:
            "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
          accent: "#f43f5e",
          accentGradient: "linear-gradient(135deg, #f43f5e 0%, #f97316 100%)",
          dark: "#1e1e2f",
          light: "#f8fafc",
        },

        // Overlay Colors (For modals, popups, etc.)
        overlay: {
          light: "rgba(0, 0, 0, 0.2)",
          dark: "rgba(0, 0, 0, 0.6)",
          blur: "rgba(0, 0, 0, 0.4)",
          heavy: "rgba(0, 0, 0, 0.8)",
          lightBlur: "rgba(255, 255, 255, 0.2)",
          darkBlur: "rgba(0, 0, 0, 0.4)",
        },

        // Shadow Colors
        shadow: {
          sm: "rgba(0, 0, 0, 0.05)",
          DEFAULT: "rgba(0, 0, 0, 0.08)",
          md: "rgba(0, 0, 0, 0.1)",
          lg: "rgba(0, 0, 0, 0.12)",
          xl: "rgba(0, 0, 0, 0.15)",
          "2xl": "rgba(0, 0, 0, 0.2)",
          colored: "rgba(168, 85, 247, 0.15)",
          dark: "rgba(0, 0, 0, 0.3)",
        },
      },

      // Premium Animation System
      animation: {
        // Floating Animations
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",

        // Glass Effects
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "glass-appear": "glassAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "glass-disappear": "glassDisappear 0.3s cubic-bezier(0.16, 1, 0.3, 1)",

        // Enter/Exit Animations
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left": "slideLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right": "slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)",

        // Fade Animations
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-out",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-down": "fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)",

        // Scale Animations
        "scale-in": "scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "scale-out": "scaleOut 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "scale-pulse": "scalePulse 2s ease-in-out infinite",

        // Shimmer Effects
        "glass-shine": "glassShine 3s infinite",
        shimmer: "shimmer 2s infinite",

        // Loading States
        "skeleton-pulse": "skeletonPulse 1.5s ease-in-out infinite",

        // Interactive
        "hover-lift": "hoverLift 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "tap-scale": "tapScale 0.1s cubic-bezier(0.16, 1, 0.3, 1)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        glowPulse: {
          "0%, 100%": {
            opacity: 1,
            filter: "blur(0px)",
            boxShadow: "0 0 0 0 rgba(168, 85, 247, 0.4)",
          },
          "50%": {
            opacity: 0.8,
            filter: "blur(2px)",
            boxShadow: "0 0 20px 10px rgba(168, 85, 247, 0.2)",
          },
        },
        glassAppear: {
          "0%": {
            opacity: 0,
            backdropFilter: "blur(0px)",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: 1,
            backdropFilter: "blur(16px)",
            transform: "scale(1)",
          },
        },
        glassDisappear: {
          "0%": {
            opacity: 1,
            backdropFilter: "blur(16px)",
            transform: "scale(1)",
          },
          "100%": {
            opacity: 0,
            backdropFilter: "blur(0px)",
            transform: "scale(0.95)",
          },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        glassShine: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "20%": { transform: "translateX(100%) skewX(-12deg)" },
          "100%": { transform: "translateX(100%) skewX(-12deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        skeletonPulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        hoverLift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-4px)" },
        },
        tapScale: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.97)" },
        },
      },

      // Premium Screen Breakpoints (iOS-inspired)
      screens: {
        xs: "375px", // iPhone SE
        sm: "640px", // iPhone 12/13/14
        md: "768px", // iPad Mini
        lg: "1024px", // iPad Air/Pro
        xl: "1280px", // Desktop
        "2xl": "1536px", // Large Desktop
        "3xl": "1920px", // Ultra-wide
      },

      // Premium Spacing System (8px grid)
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },

      // Premium Border Radius
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
        full: "9999px",
      },

      // Premium Shadows
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-lg": "0 20px 60px 0 rgba(31, 38, 135, 0.1)",
        "glass-xl": "0 30px 80px 0 rgba(31, 38, 135, 0.15)",
        none: "none",
      },

      // Custom Font Sizes
      fontSize: {
        xs: ["12px", { lineHeight: "16px", letterSpacing: "-0.01em" }],
        sm: ["14px", { lineHeight: "20px", letterSpacing: "-0.01em" }],
        base: ["16px", { lineHeight: "24px", letterSpacing: "-0.01em" }],
        lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.015em" }],
        xl: ["20px", { lineHeight: "28px", letterSpacing: "-0.015em" }],
        "2xl": ["24px", { lineHeight: "32px", letterSpacing: "-0.02em" }],
        "3xl": ["30px", { lineHeight: "36px", letterSpacing: "-0.02em" }],
        "4xl": ["36px", { lineHeight: "40px", letterSpacing: "-0.025em" }],
        "5xl": ["48px", { lineHeight: "48px", letterSpacing: "-0.03em" }],
        "6xl": ["60px", { lineHeight: "60px", letterSpacing: "-0.03em" }],
        "7xl": ["72px", { lineHeight: "72px", letterSpacing: "-0.04em" }],
        "8xl": ["96px", { lineHeight: "96px", letterSpacing: "-0.04em" }],
      },

      // Z-index Layers
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        auto: "auto",
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
        toast: "1080",
      },

      // Transition Timing Functions
      transitionTimingFunction: {
        ios: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },

  plugins: [
    // Custom plugin for premium glassmorphism and iOS effects
    function ({ addUtilities, addVariant, addComponents, theme }) {
      // RTL/LTR Direction Variants
      addVariant("rtl", '[dir="rtl"] &');
      addVariant("ltr", '[dir="ltr"] &');

      // Premium Glassmorphism Utilities
      const glassUtilities = {
        // iOS-style glass base
        ".glass": {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        },
        ".dark .glass": {
          background: "rgba(0, 0, 0, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },

        // Premium Glass Card
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 4px 24px 0 rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        },
        ".glass-card:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        },
        ".dark .glass-card": {
          background: "rgba(18, 18, 18, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".dark .glass-card:hover": {
          background: "rgba(28, 28, 28, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },

        // Premium Navigation
        ".glass-nav": {
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.02)",
        },
        ".dark .glass-nav": {
          background: "rgba(0, 0, 0, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },

        // Premium Button
        ".glass-button": {
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          fontWeight: "500",
        },
        ".glass-button:hover": {
          background: "rgba(255, 255, 255, 1)",
          transform: "scale(1.02)",
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)",
        },
        ".glass-button:active": {
          transform: "scale(0.98)",
        },
        ".dark .glass-button": {
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
        },
        ".dark .glass-button:hover": {
          background: "rgba(255, 255, 255, 0.15)",
        },

        // Premium Input
        ".glass-input": {
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "12px",
          padding: "12px 16px",
          transition: "all 0.2s ease",
        },
        ".glass-input:focus": {
          borderColor: "#a855f7",
          outline: "none",
          boxShadow: "0 0 0 4px rgba(168, 85, 247, 0.1)",
          background: "rgba(255, 255, 255, 0.95)",
        },
        ".dark .glass-input": {
          background: "rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#ffffff",
        },
        ".dark .glass-input:focus": {
          background: "rgba(0, 0, 0, 0.7)",
        },

        // Glass Shine Effect
        ".glass-shine": {
          position: "relative",
          overflow: "hidden",
        },
        ".glass-shine::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          animation: "glassShine 3s infinite",
        },

        // iOS-style blur layers
        ".blur-xl": {
          backdropFilter: "blur(24px) saturate(180%)",
        },
        ".blur-2xl": {
          backdropFilter: "blur(32px) saturate(200%)",
        },

        // RTL Support
        ".space-x-reverse": {
          "> :not([hidden]) ~ :not([hidden])": {
            "--tw-space-x-reverse": "1",
          },
        },

        // Text Gradient Utilities
        ".text-gradient": {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        },
        ".text-gradient-ios": {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        },
      };

      // Premium Component Classes
      const premiumComponents = {
        ".premium-card": {
          "@apply glass-card p-6": {},
        },
        ".premium-button": {
          "@apply glass-button px-6 py-3 font-medium": {},
        },
        ".premium-container": {
          "@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8": {},
        },
      };

      addUtilities(glassUtilities, ["responsive", "hover", "focus"]);
      addComponents(premiumComponents, ["responsive"]);
    },
  ],
};
