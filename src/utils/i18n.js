import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // ========== GLOBAL ==========
      common: {
        brand: "Tamam",
        description: "Donwload Fastest Delivery App in Egypt Now.",
        loading: "Loading...",
        error: "Something went wrong",
        close: "Close",
        back: "Back",
        learn_more: "Learn More",
        get_started: "Get Started",
        download_now: "Download Now",
        contact_us: "Contact Us",
      },

      // ========== NAVIGATION ==========
      nav: {
        home: "Home",
        about: "About",
        stores: "Stores",
        download: "Download",
        partnership: "Partnership",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies",
        gdpr: "GDPR",
        legal: "Legal",
        faq: "FAQs",
        apps: "Apps",
        apps_short: "Apps",
        apps_all: "All Apps",
        apps_customer: "Customer App",
        apps_customer_desc: "Order food, groceries & packages",
        apps_courier: "Courier App",
        apps_courier_desc: "Deliver orders & earn money",
        apps_store: "Store Web App",
        apps_store_desc: "Manage orders & inventory online",
        apps_fleet: "Fleet Web App",
        apps_fleet_desc: "Manage drivers & delivery operations",
      },
      // ========== HERO SECTION ==========
      hero: {
        title: "The Ultimate Delivery App",
        subtitle: "Food, groceries, and packages delivered in minutes.",
        cta: "Get Started",
        download: "Download App",
      },

      // ========== FEATURES SECTION ==========
      features: {
        title: "Why Choose Us",
        subtitle:
          "Discover what makes our app the best choice for your deliveries",
        fast: {
          title: "Lightning Fast",
          description:
            "Real-time tracking and optimized routes for the quickest delivery times.",
        },
        secure: {
          title: "Secure Payments",
          description: "Multiple payment options with bank‑grade encryption.",
        },
        support: {
          title: "24/7 Customer Support",
          description: "Our team is always ready to help you with any issue.",
        },
        updates: {
          title: "Regular Updates",
          description:
            "We continuously improve the app with new features and fixes.",
        },
      },

      // ========== ABOUT PAGE ==========
      about: {
        title: "About Tamam",
        subtitle:
          "We are on a mission to revolutionize delivery across Egypt — connecting customers, couriers, and stores through one powerful platform.",
        mission: "Our Mission",
        missionDesc:
          "To connect people with the best local businesses through a fast, reliable, and user-friendly delivery platform available to everyone.",
        vision: "Our Vision",
        visionDesc:
          "We envision a world where anyone can get what they need, when they need it, with just a tap — making delivery seamless and accessible.",
        team: "Our Team",
        teamDesc:
          "Meet our dedicated team of engineers, designers, and logistics experts working tirelessly to build the future of delivery in Egypt.",
        stats: {
          downloads: "Downloads",
          dailyOrders: "Daily Orders",
          rating: "Rating",
          cities: "Cities",
        },
      },

      // ========== APPS PAGE ==========
      apps: {
        hero: {
          badge: "Tamam Ecosystem",
          title: "Powerful Apps for Every Need",
          subtitle:
            "From ordering to delivery, management to analytics — we have an app for everyone in the delivery ecosystem.",
        },
        tabs: {
          all: "All Apps",
          mobile: "Mobile Apps",
          web: "Web Apps",
        },
        learnMore: "Learn More",
        customer: {
          title: "Customer App",
          subtitle: "Order anything, anytime",
          description:
            "Browse restaurants and stores, track orders in real-time, and enjoy fast delivery to your doorstep.",
          badge: "iOS • Android",
          features: {
            tracking: "Real-time order tracking",
            payments: "Secure multiple payment options",
            reviews: "Rate and review your orders",
          },
        },
        courier: {
          title: "Courier App",
          subtitle: "Deliver and earn on your schedule",
          description:
            "Accept delivery requests, navigate optimized routes, and earn money with flexible hours.",
          badge: "iOS • Android",
          features: {
            orders: "Accept and manage delivery requests",
            earnings: "Track your earnings in real-time",
            routes: "Optimized delivery routes",
          },
        },
        store: {
          title: "Store Web App",
          subtitle: "Manage your business online",
          description:
            "Handle incoming orders, manage inventory, update menus, and track your store's performance.",
          badge: "Web App",
          features: {
            orders: "Process and manage orders",
            inventory: "Real-time inventory management",
            analytics: "Sales and performance analytics",
          },
        },

        fleet: {
          title: "Fleet Web App",
          subtitle: "Manage your fleet operations",
          description:
            "Monitor your entire fleet in real-time, track performance metrics, and optimize your delivery operations from one centralized dashboard.",
          badge: "Web App",
          features: {
            tracking: "Real-time fleet tracking & monitoring",
            analytics: "Performance & efficiency analytics",
            management: "Driver & vehicle management",
          },
        },
        cta: {
          title: "Ready to Get Started?",
          subtitle:
            "Download the app that fits your needs and join the Tamam ecosystem today.",
        },
      },

      // ========== CUSTOMER PAGE ==========
      customerApp: {
        backToApps: "All Apps",
        hero: {
          badge: "iOS • Android",
          seoTitle: "Tamam: Food, Offers, Shopping & More.",
          title: "Order Anything, Anytime",
          description:
            "Browse thousands of restaurants and stores, track your orders in real-time, and enjoy fast delivery right to your doorstep.",
          ratingText: "• 20k+ Downloads • 400+ Daily Orders",
          downloadAppStore: "Download on the",
          appStore: "App Store",
          getItOn: "GET IT ON",
          googlePlay: "Google Play",
        },
        highlights: {
          tracking: "Real-time order tracking",
          payments: "Secure multiple payment options",
          reviews: "Rate and review your orders",
          fastDelivery: "Fast delivery in under 30 minutes",
          support: "24/7 customer support",
        },
        featuresTitle: "Everything You Need",
        featuresSubtitle:
          "Everything you need for fast, reliable delivery — right in your pocket.",
        features: {
          tracking: {
            title: "Real-time Tracking",
            description:
              "Track your order from the restaurant to your doorstep with live GPS updates and estimated arrival times.",
          },
          payments: {
            title: "Multiple Payments",
            description:
              "Pay your way with digital wallets, InstaBay, or cash on delivery. All transactions are encrypted and secure.",
          },
          notifications: {
            title: "Smart Notifications",
            description:
              "Get instant alerts for order confirmations, driver assignments, and delivery updates. Never miss a beat.",
          },
          selection: {
            title: "Wide Selection",
            description:
              "Browse thousands of restaurants, grocery stores, and shops. Your favorites are just a tap away.",
          },
          history: {
            title: "Order History",
            description:
              "Quickly reorder from your history. See past orders, track spending, and manage your preferences.",
          },
          favorites: {
            title: "Favorites & Ratings",
            description:
              "Save your favorite restaurants and items. Rate your experience and help others discover great places.",
          },
        },
      },

      // ========== COURIER PAGE ==========
      courierApp: {
        backToApps: "All Apps",
        hero: {
          badge: "iOS • Android",
          title: "Deliver & Earn on Your Schedule",
          description:
            "Accept delivery requests, navigate optimized routes, and earn money with flexible hours that fit your lifestyle.",
          downloadAppStore: "Download on the",
          appStore: "App Store",
          getItOn: "GET IT ON",
          googlePlay: "Google Play",
        },
        highlights: {
          orders: "Accept and manage delivery requests",
          earnings: "Track your earnings in real-time",
          routes: "Optimized delivery routes",
          schedule: "Flexible working hours",
          support: "24/7 dedicated support",
        },
        stats: {
          couriers: "1,200+",
          couriersLabel: "Active Couriers",
          rating: "4.8",
          ratingLabel: "Rating",
          earnings: "8 - 12 EGP",
          earningsLabel: "Avg. Earnings/km",
        },
        featuresTitle: "Everything You Need to Succeed",
        features: {
          orders: {
            title: "Order Management",
            description:
              "Accept or decline delivery requests with a single tap. See order details, pickup locations, and drop-off points before accepting.",
          },
          earnings: {
            title: "Earnings Tracker",
            description:
              "Track your daily, weekly, and monthly earnings in real-time. See breakdowns of delivery fees, tips, and bonuses.",
          },
          routes: {
            title: "Smart Navigation",
            description:
              "Get optimized delivery routes with turn-by-turn navigation. Save time and fuel with the most efficient paths.",
          },
          schedule: {
            title: "Flexible Schedule",
            description:
              "Work when you want. Set your availability, take breaks anytime, and achieve the perfect work-life balance.",
          },
          support: {
            title: "24/7 Support",
            description:
              "Get help whenever you need it. Our dedicated courier support team is available around the clock.",
          },
          incentives: {
            title: "Bonuses & Incentives",
            description:
              "Earn extra with peak hour bonuses, referral rewards, and performance incentives. The more you deliver, the more you earn.",
          },
        },
        cta: {
          title: "Ready to Start Earning?",
          subtitle: "Download the Courier App and start delivering today.",
        },
      },

      // ========== STORE PAGE ==========
      storeApp: {
        backToApps: "All Apps",
        hero: {
          badge: "Web App",
          title: "Manage Your Store Online",
          description:
            "Handle incoming orders, manage inventory, update menus, and track your store's performance all from one powerful dashboard.",
          getStarted: "Get Started",
        },
        stats: {
          stores: "Active Stores",
          rating: "Rating",
          support: "Support",
        },
        highlights: {
          dashboard: "Real-time dashboard & reports",
          support: "24/7 dedicated support",
        },
        featuresTitle: "Powerful Store Management",
        features: {
          orders: {
            title: "Order Management",
            description:
              "Receive and process incoming orders in real-time. Accept, reject, or modify orders with a single click. Keep your customers updated on order status.",
          },
          inventory: {
            title: "Inventory Control",
            description:
              "Track stock levels automatically. Get low-stock alerts, manage product listings, and update availability instantly across the platform.",
          },
          analytics: {
            title: "Sales Analytics",
            description:
              "Monitor your store's performance with detailed reports. Track revenue, popular items, peak hours, and customer trends to grow your business.",
          },
          insights: {
            title: "Business Insights",
            description:
              "Make data-driven decisions with comprehensive dashboards. Visualize sales trends, customer behavior, and operational efficiency metrics.",
          },
          customers: {
            title: "Customer Management",
            description:
              "View customer feedback, respond to reviews, and build loyalty. Understand your customers better with detailed interaction history.",
          },
          settings: {
            title: "Store Settings",
            description:
              "Customize your store profile, update menus and pricing, set operating hours, and manage delivery zones all from one dashboard.",
          },
        },
        dashboard: {
          title: "Dashboard",
          ordersToday: "Orders Today",
          revenue: "Revenue",
          salesOverview: "Sales Overview",
          recentOrders: "Recent Orders",
          delivered: "Delivered",
          preparing: "Preparing",
        },
        cta: {
          title: "Ready to Grow Your Business?",
          subtitle:
            "Join hundreds of stores already using Tamam to manage their orders and grow their revenue.",
        },
      },

      // ========== FLEET PAGE ==========
      fleetApp: {
        backToApps: "All Apps",
        hero: {
          badge: "Web App",
          title: "Fleet Dashboard",
          description:
            "Monitor your entire fleet in real-time, track performance metrics, and optimize your delivery operations from one centralized dashboard.",
          getStarted: "Access Dashboard",
        },
        highlights: {
          tracking: "Real-time fleet tracking & monitoring",
          analytics: "Performance & efficiency analytics",
          management: "Driver & vehicle management",
          routes: "Optimized route planning",
          support: "24/7 technical support",
        },
        stats: {
          vehicles: "35",
          vehiclesLabel: "Active Vehicles",
          rating: "4.7",
          ratingLabel: "Fleet Rating",
          efficiency: "85%",
          efficiencyLabel: "Efficiency Rate",
        },
        featuresTitle: "Complete Fleet Management",
        features: {
          tracking: {
            title: "Live Tracking",
            description:
              "Monitor all vehicles in real-time on an interactive map. Track routes, speed, and stops with GPS precision.",
          },
          analytics: {
            title: "Performance Analytics",
            description:
              "Comprehensive reports on delivery times, driver performance, and fleet utilization. Make data-driven decisions.",
          },
          management: {
            title: "Driver Management",
            description:
              "Manage driver profiles, schedules, and assignments. Track individual performance and handle shift planning.",
          },
          routes: {
            title: "Route Optimization",
            description:
              "AI-powered route planning to minimize delivery times and fuel costs. Automatic rerouting for traffic conditions.",
          },
          performance: {
            title: "Real-time Metrics",
            description:
              "Live dashboards showing key KPIs: active deliveries, completion rates, and estimated arrival times.",
          },
          settings: {
            title: "Fleet Settings",
            description:
              "Configure zones, rates, vehicle types, and operational parameters. Full control over your fleet operations.",
          },
        },
        dashboard: {
          title: "Fleet Overview",
          activeFleet: "35 vehicles • 24 active • 85% efficiency",
          active: "Active",
          idle: "Idle",
          offline: "Offline",
          liveTracking: "Live Tracking",
          performance: "Weekly Performance",
          topDrivers: "Top Drivers",
          deliveries: "deliveries",
        },
        cta: {
          title: "Ready to Optimize Your Fleet?",
          subtitle:
            "Access the Fleet Dashboard and take control of your delivery operations today.",
        },
      },

      // ========== CONTACT PAGE ==========
      contact: {
        title: "Contact Us",
        subtitle:
          "We'd love to hear from you. Send us a message and we'll respond within 24 hours.",
        formIntro: "Or send us a quick message...",
        successMessage: "We'll get back to you within 24 hours.",
        name: "Your Name",
        email: "Email Address",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send. Please try again.",
        address: "Beheira Governorate, Egypt",
        phone: "+1 (234) 567-8900",
        email_us: "support@tamaam.cloud",
        hours: "Sat–Fri: 9am–8pm",
      },

      // ========== PRIVACY POLICY PAGE ==========
      privacy: {
        badge: "Privacy Policy",
        title:
          "Comprehensive Privacy Policy for Tamam Applications & Platforms",
        lastUpdated: "Effective Date: July, 2026",
        contactEmail: "Privacy & Data Protection Email",
        deleteAccount: "Direct Account Deletion Link",
        questions:
          "Have questions about your data? Contact our Data Protection Officer.",
        collection: {
          title: "1. Data We Collect & Collection Methods",
          content:
            "We collect minimal personal data necessary for service operation: identity data (phone number, name, email), location data (GPS for delivery tracking), device permissions (camera, microphone, notifications), financial transaction records, and technical identifiers (IP, device info). We use OTP verification for registration and Firebase tools for app stability.",
        },
        age: {
          title: "2. Age Restrictions & Children's Privacy",
          content:
            "Tamam services are exclusively for individuals aged 18 and above. We do not knowingly collect or process data from minors. If a minor's account is discovered, we immediately suspend the account and delete associated data from active databases.",
        },
        usage: {
          title: "3. Purposes & Legal Basis for Data Processing",
          content:
            "Your data is used to: execute delivery contracts between customers, merchants, and couriers; provide operational communication (sharing customer details with assigned couriers); offer technical support; improve platform stability; prevent fraud; and comply with legal and tax obligations.",
        },
        sharing: {
          title: "4. Data Sharing & Third-Party Disclosure",
          content:
            "We do not sell, rent, or trade your personal data. Necessary data is shared only with: assigned delivery couriers (name, location, phone), partner stores (order details), technical service providers (cloud hosting, OTP services, payment gateways), and government authorities when legally required by court order or regulation.",
        },
        transfer: {
          title: "5. International Data Transfer & Storage",
          content:
            "Data may be processed and stored on cloud infrastructure provided by certified global providers (such as Hostinger or Cloudflare). Servers may be located inside or outside the operational country. All providers adhere to strict encryption standards (encrypted in transit and at rest) and equivalent legal protection levels.",
        },
        security: {
          title: "6. Data Security & Breach Notification",
          content:
            "We implement comprehensive technical, administrative, and physical security measures including SSL/TLS encryption, firewalls, and strict access controls. In the unlikely event of a data breach, we commit to notifying affected users and relevant regulatory authorities within the legally required timeframe, explaining the nature of the breach and mitigation steps.",
        },
        deletion: {
          title: "7. Account & Data Deletion Policy",
          content:
            "You can permanently delete your account and data through: the app (Settings > Account > Delete Account), or via the web deletion link (tamaam.cloud/delete-account). Immediately deleted: name, phone number, saved addresses, location history, and wallet closure. Only anonymized financial transaction records are retained for legally required tax periods.",
        },
        rights: {
          title: "8. User Rights & Data Control",
          content:
            "You have the right to: access your personal data, correct inaccurate information, delete your data (right to be forgotten), restrict or object to processing, unsubscribe from marketing notifications, and manage device permissions (location, camera, microphone) through your phone's system settings.",
        },
        links: {
          title: "9. Third-Party Links",
          content:
            "Our applications or website may contain links to external third-party sites (such as restaurant pages or social media). Tamam is not responsible for the privacy practices or content of these external sites. We recommend reading the privacy policies of each external site or application you visit.",
        },
        updates: {
          title: "10. Policy Updates & Modifications",
          content:
            "We reserve the right to modify this privacy policy to align with technical developments or regulatory changes. You will be notified of material changes via a prominent in-app notice or email before the changes take effect. Continued use after the update date constitutes implicit acceptance of the revised policy.",
        },
        contact: {
          title: "11. Data Protection Officer & Contact Information",
          content:
            "For privacy inquiries, complaints, or to exercise your data rights, contact our Data Protection Officer (DPO) at contact@tamaam.cloud. Official response time: within 30 days of receiving your request and verifying your identity. Account deletion link: tamaam.cloud/delete-account",
        },
      },

      // ========== TERMS OF SERVICE PAGE ==========
      terms: {
        title: "Terms of Service",
        lastUpdated: "Last Updated: July 2026",
        intro:
          "By downloading, accessing, or using TamamApp, you agree to be bound by these Terms of Service. Please read them carefully before using our delivery services across Egypt.",
        contents: "Contents",
        sections: "sections",
        effective: "Currently Active",
        print: "Print",
        supportText:
          "Our support team is available to answer your questions about these terms.",
        acceptance: {
          title: "Acceptance of Terms",
          content:
            "By downloading or using TamamApp in any way, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please do not use the application or our services. Your continued use of the app constitutes ongoing acceptance of any updated terms.",
        },
        use: {
          title: "Use of Service",
          content:
            "You agree to use TamamApp only for lawful purposes and in accordance with Egyptian laws and regulations. You may not use the app for any illegal activities, fraud, harassment, or to transmit harmful content. We reserve the right to investigate and take legal action against violations.",
        },
        account: {
          title: "Account Responsibility",
          content:
            "You are fully responsible for maintaining the confidentiality of your account credentials and password. Any activity that occurs under your account is your responsibility. You must notify us immediately of any unauthorized use of your account. You must provide accurate and complete information when creating your account.",
        },
        payments: {
          title: "Payments & Refunds",
          content:
            "All payments are processed through secure, certified payment gateways operating in Egypt. Delivery fees are calculated based on distance, time, and demand. Our refund policy applies on a case-by-case basis and refunds are processed within 7-14 business days. Cash payments are available in select situations.",
        },
        privacy: {
          title: "Privacy & Data Protection",
          content:
            "We collect and process your personal data in accordance with our Privacy Policy and Egyptian data protection laws. Your information is used to provide and improve our services, process orders, and communicate with you. We do not sell your personal data to third parties.",
        },
        termination: {
          title: "Termination of Service",
          content:
            "We reserve the right to suspend or terminate your account at any time without prior notice for violations of these terms or applicable Egyptian laws. We may also temporarily suspend services for maintenance or updates. You may delete your account at any time through the app settings.",
        },
        liability: {
          title: "Limitation of Liability",
          content:
            "TamamApp is not liable for any indirect, incidental, or consequential damages arising from the use of our service. Our liability is limited to the value of the order in all cases and in accordance with Egyptian law. We are not responsible for delays caused by factors outside our control including weather, traffic, or third-party actions.",
        },
      },

      // ========== COOKIE POLICY PAGE ==========
      cookies: {
        title: "Cookie Policy",
        lastUpdated: "Last Updated: July 2026",
        intro:
          "This policy explains how we use cookies and similar technologies.",
        what: {
          title: "What Are Cookies",
          content:
            "Cookies are small text files stored on your device that help us improve your experience.",
        },
        how: {
          title: "How We Use Cookies",
          content:
            "We use essential cookies for functionality, analytics cookies to understand usage, and preference cookies to remember your settings.",
        },
        types: {
          title: "Types of Cookies",
          essential: "Essential – required for the app to work",
          analytics: "Analytics – help us improve performance",
          preferences: "Preferences – remember your language and region",
        },
        manage: {
          title: "Managing Cookies",
          content:
            "You can control and delete cookies through your browser settings.",
        },
      },

      // ========== FAQ PAGE ==========
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about TamamApp",
        description:
          "Find answers to common questions about our delivery service, payments, and more.",
        searchPlaceholder: "Search for answers...",
        categories: {
          general: "General Questions",
          orders: "Orders & Delivery",
          payments: "Payments & Billing",
          account: "Account & Security",
          support: "Support & Help",
        },
        questions: {
          q1: "What is TamamApp?",
          a1: "TamamApp is a fast, reliable delivery service that connects you with local restaurants, grocery stores. We make it easy to get what you need, when you need it.",
          q2: "How do I place an order?",
          a2: "Simply download the app, create an account, browse nearby stores, add items to your cart, and checkout. Your order will be delivered to your doorstep.",
          q3: "What areas do you deliver to?",
          a3: "We currently deliver to major cities in Delta Area. We're expanding to new areas regularly!",
          q4: "How long does delivery take?",
          a4: "Delivery typically takes 30-45 minutes depending on your location and restaurant preparation time. You can track your order in real-time.",
          q5: "What payment methods do you accept?",
          a5: "We accept mobile wallets, InstaPay, and cash on delivery.",
          q6: "Is my payment information secure?",
          a6: "Yes! We use bank-grade encryption and never store your full payment details. All transactions are PCI compliant.",
          q7: "How do I track my order?",
          a7: "You can track your order in real-time through the app. You'll receive notifications at every step: order confirmed, being prepared, out for delivery, and delivered.",
          q8: "What if my order is incorrect or late?",
          a8: "Contact our 24/7 customer support immediately. We'll investigate and provide a refund or credit for any issues with your order.",
          q9: "How do I create an account?",
          a9: "Download the app and tap 'Sign Up'. You can register with your email, phone number.",
          q10: "How do I reset my password?",
          a10: "Tap 'Forgot Password' on the login screen. We'll send you a link to reset your password via email or SMS.",
          q11: "How do I contact customer support?",
          a11: "You can reach us 24/7 via in-app chat, email at support@tamaam.cloud, or call us at +1 (234) 567-8900.",
          q12: "Can I cancel my order?",
          a12: "You can cancel your order within 2 minutes of placing it. After that, the restaurant may have already started preparing your food.",
          q13: "Do you offer refunds?",
          a13: "Yes, we offer refunds for incorrect, missing, or unsatisfactory orders. Contact support within 24 hours for assistance.",
          q14: "How do I apply a promo code?",
          a14: "Enter your promo code at checkout in the 'Promo Code' field. Discount will be applied automatically to eligible orders.",
          q15: "Is there a delivery fee?",
          a15: "Delivery fees vary by distance and demand. Some restaurants offer free delivery on orders over a certain amount.",
        },
        stillHaveQuestions: "Still have questions?",
        contactSupport: "Contact our support team",
        supportEmail: "support@tamaam.cloud",
        supportPhone: "+1 (234) 567-8900",
        liveChat: "Live Chat",
        noResults: "No results found",
        tryDifferent: "Try different keywords or browse categories below",
      },

      // ========== GDPR PAGE ==========
      gdpr: {
        title: "GDPR Compliance",
        lastUpdated: "Last Updated: July 2026",
        intro:
          "We are committed to protecting your data and complying with the General Data Protection Regulation (GDPR).",
        rights: {
          title: "Your Rights Under GDPR",
          right1: "Right to access – request a copy of your data",
          right2: "Right to rectification – correct inaccurate data",
          right3: "Right to erasure – right to be forgotten",
          right4: "Right to restrict processing",
          right5: "Right to data portability",
          right6: "Right to object to processing",
        },
        data_controller: {
          title: "Data Controller",
          content: "TamamApp Inc., support@tamaam.cloud",
        },
        consent: {
          title: "Your Consent",
          content:
            "By using our service, you consent to our data practices as described in this policy.",
        },
        contact: {
          title: "Contact Our DPO",
          content:
            "For GDPR‑related requests, please email support@tamaam.cloud.",
        },
      },

      // ========== 404 PAGE ==========
      notFound: {
        title: "Page Not Found",
        subtitle: "Oops! The page you're looking for doesn't exist.",
        description:
          "The page may have been moved, deleted, or never existed. Let's get you back on track.",
        backHome: "Back to Home",
        goBack: "Go Back",
        suggestions: "You might be looking for:",
        errorCode: "Error 404",
        helpfulLinks: "Quick Navigation",
      },

      // ========== FOOTER ==========
      footer: {
        rights: "All rights reserved.",
      },
    },
  },

  ar: {
    translation: {
      // ========== GLOBAL ==========
      common: {
        brand: "تمام",
        description: "قم بتحميل اسرع تطبيق لتوصيل الطلبات في مصر الأن.",
        loading: "جاري التحميل...",
        error: "حدث خطأ ما",
        close: "إغلاق",
        back: "رجوع",
        learn_more: "اعرف أكثر",
        get_started: "ابدأ الآن",
        download_now: "حمّل التطبيق",
        contact_us: "اتصل بنا",
      },

      // ========== NAVIGATION ==========
      nav: {
        home: "الرئيسية",
        about: "عن التطبيق",
        stores: "المتاجر",
        download: "تحميل",
        partnership: "انضم الينا",
        contact: "اتصل بنا",
        privacy: "الخصوصية",
        terms: "الشروط",
        cookies: "ملفات التعريف",
        gdpr: "اللائحة العامة",
        legal: "قانوني",
        faq: "الاسئلة الشائعة",
        apps: "التطبيقات",
        apps_short: "تطبيقات",
        apps_all: "جميع التطبيقات",
        apps_customer: "تطبيق العميل",
        apps_customer_desc: "اطلب طعام وبقالة وطرود",
        apps_courier: "تطبيق السائق",
        apps_courier_desc: "قم بتوصيل الطلبات واكسب المال",
        apps_store: "تطبيق المتجر",
        apps_store_desc: "أدر الطلبات والمخزون عبر الإنترنت",
        apps_fleet: "تطبيق المشرف",
        apps_fleet_desc: "إدارة السائقين وعمليات التوصيل",
      },

      // ========== HERO SECTION ==========
      hero: {
        title: "تطبيق التوصيل الأمثل",
        subtitle: "طعامك، بقالتك وطرودك تُوصَل في دقائق.",
        cta: "ابدأ الآن",
        download: "حمّل التطبيق",
      },

      // ========== FEATURES SECTION ==========
      features: {
        title: "لماذا نحن؟",
        subtitle: "اكتشف ما يجعل تطبيقنا الخيار الأفضل لتوصيلاتك",
        fast: {
          title: "سرعة فائقة",
          description: "تتبع فوري وطرق محسّنة لأسرع أوقات التوصيل.",
        },
        secure: {
          title: "مدفوعات آمنة",
          description: "خيارات دفع متعددة مع تشفير على مستوى البنوك.",
        },
        support: {
          title: "دعم 24/7",
          description: "فريقنا جاهز دائماً لمساعدتك في أي مشكلة.",
        },
        updates: {
          title: "تحديثات منتظمة",
          description: "نعمل باستمرار على تحسين التطبيق بميزات جديدة.",
        },
      },

      // ========== ABOUT PAGE ==========
      about: {
        title: "عن تمام",
        subtitle:
          "نحن في مهمة لإحداث ثورة في التوصيل في جميع أنحاء مصر — نربط العملاء والسائقين والمتاجر من خلال منصة واحدة قوية.",
        mission: "مهمتنا",
        missionDesc:
          "ربط الناس بأفضل الأعمال المحلية من خلال منصة توصيل سريعة وموثوقة وسهلة الاستخدام متاحة للجميع.",
        vision: "رؤيتنا",
        visionDesc:
          "نتصور عالماً حيث يمكن لأي شخص الحصول على ما يحتاجه، وقتما يحتاجه، بنقرة واحدة — مما يجعل التوصيل سلساً ومتاحاً.",
        team: "فريقنا",
        teamDesc:
          "تعرف على فريقنا المخلص من المهندسين والمصممين وخبراء الخدمات اللوجستية الذين يعملون بلا كلل لبناء مستقبل التوصيل في مصر.",
        stats: {
          downloads: "تحميل",
          dailyOrders: "طلب يومي",
          rating: "تقييم",
          cities: "مدينة",
        },
      },

      // ========== APPS PAGE ==========

      apps: {
        hero: {
          badge: "منظومة تمام",
          title: "تطبيقات قوية لكل احتياج",
          subtitle:
            "من الطلب إلى التوصيل، ومن الإدارة إلى التحليلات — لدينا تطبيق لكل شخص في منظومة التوصيل.",
        },
        tabs: {
          all: "جميع التطبيقات",
          mobile: "تطبيقات الموبايل",
          web: "تطبيقات الويب",
        },
        learnMore: "اعرف المزيد",
        customer: {
          title: "تطبيق العميل",
          subtitle: "اطلب أي شيء في أي وقت",
          description:
            "تصفح المطاعم والمتاجر، وتتبع الطلبات في الوقت الفعلي، واستمتع بالتوصيل السريع إلى باب منزلك.",
          badge: "iOS • Android",
          features: {
            tracking: "تتبع الطلب في الوقت الفعلي",
            payments: "خيارات دفع متعددة وآمنة",
            reviews: "قيّم وراجع طلباتك",
          },
        },
        courier: {
          title: "تطبيق السائق",
          subtitle: "قم بالتوصيل واكسب حسب جدولك",
          description:
            "اقبل طلبات التوصيل، وتنقل عبر الطرق المحسّنة، واكسب المال بساعات مرنة.",
          badge: "iOS • Android",
          features: {
            orders: "اقبل وأدر طلبات التوصيل",
            earnings: "تتبع أرباحك في الوقت الفعلي",
            routes: "طرق توصيل محسّنة",
          },
        },
        store: {
          title: "تطبيق المتجر",
          subtitle: "أدر عملك عبر الإنترنت",
          description:
            "تعامل مع الطلبات الواردة، وأدر المخزون، وحدّث القوائم، وتابع أداء متجرك.",
          badge: "تطبيق ويب",
          features: {
            orders: "معالجة وإدارة الطلبات",
            inventory: "إدارة المخزون في الوقت الفعلي",
            analytics: "تحليلات المبيعات والأداء",
          },
        },
        fleet: {
          title: "تطبيق المشرف",
          subtitle: "أدر عمليات أسطولك",
          description:
            "راقب أسطولك بالكامل في الوقت الفعلي، وتتبع مقاييس الأداء، وحسّن عمليات التوصيل من لوحة تحكم مركزية واحدة.",
          badge: "تطبيق ويب",
          features: {
            tracking: "تتبع ومراقبة الأسطول في الوقت الفعلي",
            analytics: "تحليلات الأداء والكفاءة",
            management: "إدارة السائقين والمركبات",
          },
        },
        cta: {
          title: "مستعد للبدء؟",
          subtitle:
            "حمّل التطبيق الذي يناسب احتياجاتك وانضم إلى منظومة تمام اليوم.",
        },
      },

      // ========== CUSTOMER PAGE ==========
      customerApp: {
        backToApps: "جميع التطبيقات",
        hero: {
          badge: "iOS • Android",
          seoTitle: "تمام: طعام، عروض، تسوق والمزيد.",
          title: "اطلب أي شيء، في أي وقت",
          description:
            "تصفح آلاف المطاعم والمتاجر، وتتبع طلباتك في الوقت الفعلي، واستمتع بالتوصيل السريع إلى باب منزلك.",
          ratingText: "• 20k+ تحميل • 400+ طلب يومي",
          downloadAppStore: "حمّل من",
          appStore: "App Store",
          getItOn: "حمّل من",
          googlePlay: "Google Play",
        },
        highlights: {
          tracking: "تتبع الطلب في الوقت الفعلي",
          payments: "خيارات دفع متعددة وآمنة",
          reviews: "قيّم وراجع طلباتك",
          fastDelivery: "توصيل سريع في أقل من 30 دقيقة",
          support: "دعم عملاء 24/7",
        },
        featuresTitle: "كل ما تحتاجه",
        featuresSubtitle: "كل ما تحتاجه لتوصيل سريع وموثوق — في جيبك مباشرة.",
        features: {
          tracking: {
            title: "تتبع مباشر",
            description:
              "تتبع طلبك من المطعم إلى باب منزلك مع تحديثات GPS مباشرة وأوقات وصول تقديرية.",
          },
          payments: {
            title: "طرق دفع متعددة",
            description:
              "ادفع بالطريقة التي تناسبك – محافظ رقمية، انستاباى، أو نقداً عند الاستلام. جميع المعاملات مشفرة وآمنة.",
          },
          notifications: {
            title: "إشعارات ذكية",
            description:
              "احصل على تنبيهات فورية لتأكيد الطلبات، وتعيين السائقين، وتحديثات التوصيل. لا تفوّت أي شيء.",
          },
          selection: {
            title: "تشكيلة واسعة",
            description:
              "تصفح آلاف المطاعم ومتاجر البقالة والمحلات. وجباتك المفضلة على بعد نقرة واحدة.",
          },
          history: {
            title: "سجل الطلبات",
            description:
              "أعد الطلب بسرعة من سجلك. شاهد الطلبات السابقة، وتتبع الإنفاق، وأدر تفضيلاتك.",
          },
          favorites: {
            title: "المفضلة والتقييمات",
            description:
              "احفظ مطاعمك ووجباتك المفضلة. قيّم تجربتك وساعد الآخرين على اكتشاف أماكن رائعة.",
          },
        },
      },

      // ========== COURIER PAGE ==========
      courierApp: {
        backToApps: "جميع التطبيقات",
        hero: {
          badge: "iOS • Android",
          title: "قم بالتوصيل واكسب حسب جدولك",
          description:
            "اقبل طلبات التوصيل، وتنقل عبر الطرق المحسّنة، واكسب المال بساعات مرنة تناسب نمط حياتك.",
          downloadAppStore: "حمّل من",
          appStore: "App Store",
          getItOn: "حمّل من",
          googlePlay: "Google Play",
        },
        highlights: {
          orders: "اقبل وأدر طلبات التوصيل",
          earnings: "تتبع أرباحك في الوقت الفعلي",
          routes: "طرق توصيل محسّنة",
          schedule: "ساعات عمل مرنة",
          support: "دعم مخصص على مدار الساعة",
        },
        stats: {
          couriers: "1,200 +",
          couriersLabel: "سائق نشط",
          rating: "4.8",
          ratingLabel: "تقييم",
          earnings: "8-12 ج.م",
          earningsLabel: "متوسط الدخل/كيلو",
        },
        featuresTitle: "كل ما تحتاجه للنجاح",
        features: {
          orders: {
            title: "إدارة الطلبات",
            description:
              "اقبل أو ارفض طلبات التوصيل بنقرة واحدة. شاهد تفاصيل الطلب ومواقع الاستلام والتسليم قبل القبول.",
          },
          earnings: {
            title: "متتبع الأرباح",
            description:
              "تتبع أرباحك اليومية والأسبوعية والشهرية في الوقت الفعلي. شاهد تفاصيل رسوم التوصيل والبقشيش والمكافآت.",
          },
          routes: {
            title: "ملاحة ذكية",
            description:
              "احصل على طرق توصيل محسّنة مع إرشادات خطوة بخطوة. وفر الوقت والوقود بأفضل المسارات.",
          },
          schedule: {
            title: "جدول مرن",
            description:
              "اعمل وقتما تريد. حدد أوقات تواجدك، وخذ فترات راحة في أي وقت، وحقق التوازن المثالي بين العمل والحياة.",
          },
          support: {
            title: "دعم 24/7",
            description:
              "احصل على المساعدة وقتما تحتاج. فريق دعم السائقين المخصص متاح على مدار الساعة.",
          },
          incentives: {
            title: "مكافآت وحوافز",
            description:
              "اربح المزيد مع مكافآت ساعات الذروة، ومكافآت الإحالة، وحوافز الأداء. كلما أوصلت أكثر، ربحت أكثر.",
          },
        },
        cta: {
          title: "مستعد لبدء الربح؟",
          subtitle: "حمّل تطبيق السائق وابدأ التوصيل اليوم.",
        },
      },

      // ========== STORE PAGE ==========
      storeApp: {
        backToApps: "جميع التطبيقات",
        hero: {
          badge: "تطبيق ويب",
          title: "أدر متجرك عبر الإنترنت",
          description:
            "تعامل مع الطلبات الواردة، وأدر المخزون، وحدّث القوائم، وتابع أداء متجرك – كل ذلك من لوحة تحكم واحدة قوية.",
          getStarted: "ابدأ الآن",
        },
        stats: {
          stores: "متجر نشط",
          rating: "تقييم",
          support: "دعم",
        },
        highlights: {
          dashboard: "لوحة تحكم وتقارير فورية",
          support: "دعم مخصص على مدار الساعة",
        },
        featuresTitle: "إدارة متجر قوية",
        features: {
          orders: {
            title: "إدارة الطلبات",
            description:
              "استلم وعالج الطلبات الواردة في الوقت الفعلي. اقبل، ارفض، أو عدّل الطلبات بنقرة واحدة. أبقِ عملاءك على اطلاع بحالة الطلب.",
          },
          inventory: {
            title: "التحكم في المخزون",
            description:
              "تتبع مستويات المخزون تلقائياً. احصل على تنبيهات المخزون المنخفض، وأدر قوائم المنتجات، وحدّث التوفر فوراً عبر المنصة.",
          },
          analytics: {
            title: "تحليلات المبيعات",
            description:
              "راقب أداء متجرك مع تقارير مفصلة. تتبع الإيرادات، والمنتجات الأكثر مبيعاً، وساعات الذروة، واتجاهات العملاء لتنمية أعمالك.",
          },
          insights: {
            title: "رؤى الأعمال",
            description:
              "اتخذ قرارات مبنية على البيانات مع لوحات معلومات شاملة. تصور اتجاهات المبيعات، وسلوك العملاء، ومقاييس الكفاءة التشغيلية.",
          },
          customers: {
            title: "إدارة العملاء",
            description:
              "اطلع على آراء العملاء، ورد على التقييمات، وابني الولاء. افهم عملاءك بشكل أفضل مع سجل التفاعلات المفصل.",
          },
          settings: {
            title: "إعدادات المتجر",
            description:
              "خصص ملف متجرك، وحدّث القوائم والأسعار، وحدد ساعات العمل، وأدر مناطق التوصيل – كل ذلك من لوحة تحكم واحدة.",
          },
        },
        dashboard: {
          title: "لوحة التحكم",
          ordersToday: "طلبات اليوم",
          revenue: "الإيرادات",
          salesOverview: "نظرة عامة على المبيعات",
          recentOrders: "الطلبات الأخيرة",
          delivered: "تم التوصيل",
          preparing: "قيد التحضير",
        },
        cta: {
          title: "مستعد لتنمية أعمالك؟",
          subtitle:
            "انضم إلى مئات المتاجر التي تستخدم تمام بالفعل لإدارة طلباتها وزيادة إيراداتها.",
        },
      },

      // ========== FLEET PAGE ==========
      fleetApp: {
        backToApps: "جميع التطبيقات",
        hero: {
          badge: "تطبيق ويب",
          title: "لوحة تحكم المشرف",
          description:
            "راقب أسطولك بالكامل في الوقت الفعلي، وتتبع مقاييس الأداء، وحسّن عمليات التوصيل من لوحة تحكم مركزية واحدة.",
          getStarted: "الوصول الأن",
        },
        highlights: {
          tracking: "تتبع ومراقبة الأسطول في الوقت الفعلي",
          analytics: "تحليلات الأداء والكفاءة",
          management: "إدارة السائقين والمركبات",
          routes: "تخطيط محسّن للطرق",
          support: "دعم فني على مدار الساعة",
        },
        stats: {
          vehicles: "35",
          vehiclesLabel: "مركبة نشطة",
          rating: "4.7",
          ratingLabel: "تقييم الأسطول",
          efficiency: "85٪",
          efficiencyLabel: "معدل الكفاءة",
        },
        featuresTitle: "إدارة كاملة للأسطول",
        features: {
          tracking: {
            title: "تتبع مباشر",
            description:
              "راقب جميع المركبات في الوقت الفعلي على خريطة تفاعلية. تتبع الطرق والسرعة والتوقفات بدقة GPS.",
          },
          analytics: {
            title: "تحليلات الأداء",
            description:
              "تقارير شاملة عن أوقات التوصيل وأداء السائقين واستخدام الأسطول. اتخذ قرارات مبنية على البيانات.",
          },
          management: {
            title: "إدارة السائقين",
            description:
              "أدر ملفات السائقين وجداولهم ومهامهم. تابع الأداء الفردي وتعامل مع تخطيط الورديات.",
          },
          routes: {
            title: "تحسين الطرق",
            description:
              "تخطيط طرق مدعوم بالذكاء الاصطناعي لتقليل أوقات التوصيل وتكاليف الوقود. إعادة توجيه تلقائية لظروف المرور.",
          },
          performance: {
            title: "مقاييس فورية",
            description:
              "لوحات معلومات مباشرة تعرض مؤشرات الأداء الرئيسية: التوصيلات النشطة ومعدلات الإنجاز وأوقات الوصول المقدرة.",
          },
          settings: {
            title: "إعدادات الأسطول",
            description:
              "اضبط المناطق والأسعار وأنواع المركبات ومعايير التشغيل. تحكم كامل في عمليات أسطولك.",
          },
        },
        dashboard: {
          title: "نظرة عامة على الأسطول",
          activeFleet: "٣٥ مركبة • ٢٤ نشطة • كفاءة ٨٥٪",
          active: "نشط",
          idle: "متوقف",
          offline: "غير متصل",
          liveTracking: "تتبع مباشر",
          performance: "الأداء الأسبوعي",
          topDrivers: "أفضل السائقين",
          deliveries: "توصيلة",
        },
        cta: {
          title: "مستعد لتحسين أسطولك؟",
          subtitle:
            "الوصول إلى لوحة تحكم الأسطول وتحكم في عمليات التوصيل اليوم.",
        },
      },

      // ========== CONTACT PAGE ==========
      contact: {
        title: "اتصل بنا",
        subtitle: "نحن سعداء بسماع منك. أرسل لنا رسالة وسنرد خلال 24 ساعة.",
        formIntro: "أو يمكنك إرسال رسالة سريعة ...",
        successMessage: "سنقوم بالرد عليك خلال ٢٤ ساعة.",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال",
        sending: "جاري الإرسال...",
        success: "تم إرسال الرسالة بنجاح!",
        error: "فشل الإرسال. حاول مرة أخرى.",
        address: "محافظة البحيرة, مصر",
        phone: "+1 (234) 567-8900",
        email_us: "support@tamaam.cloud",
        hours: "السبت–الجمعة: 9ص–8م",
      },

      // ========== PRIVACY POLICY PAGE ==========
      privacy: {
        badge: "سياسة الخصوصية",
        title: 'سياسة الخصوصية الشاملة لمنظومة تطبيقات ومنصات "تمام" (Tamam)',
        lastUpdated: "تاريخ سريان العمل: يوليو 2026",
        contactEmail: "البريد الإلكتروني المخصص للخصوصية وحماية البيانات",
        deleteAccount: "رابط طلب حذف الحساب المباشر",
        questions: "هل لديك أسئلة حول بياناتك؟ تواصل مع مسؤول حماية البيانات.",
        collection: {
          title: "1. البيانات التي نجمعها وآلية الجمع",
          content:
            "نحرص على جمع الحد الأدنى من البيانات الشخصية: بيانات الهوية (رقم الهاتف، الاسم، البريد الإلكتروني)، بيانات الموقع الجغرافي (GPS لتتبع التوصيل)، أذونات الجهاز (الكاميرا، الميكروفون، الإشعارات)، سجلات المعاملات المالية، والمعرفات التقنية (IP، معلومات الجهاز). نعتمد التحقق برمز OTP للتسجيل وأدوات Firebase لاستقرار التطبيقات.",
        },
        age: {
          title: "2. النطاق السني وحماية خصوصية القاصرين",
          content:
            'خدمات منظومة "تمام" موجهة حصراً للأفراد الذين بلغت أعمارهم 18 عاماً. نحن لا نجمع أو نعالج بيانات شخصية عائدة لأطفال أو قاصرين عن عمد. في حال اكتشاف حساب أنشأه قاصر، نتخذ إجراءات فورية تشمل حظر الحساب ومسح البيانات المرتبطة به.',
        },
        usage: {
          title: "3. الأغراض والأسباب القانونية لمعالجة البيانات",
          content:
            "نستخدم بياناتك لتنفيذ عقود التوصيل بين العملاء والتجار والكباتن، التواصل التشغيلي (مشاركة تفاصيل العميل مع الكابتن المكلف)، الدعم الفني، تحسين استقرار المنصة، منع الاحتيال، والامتثال للالتزامات الضريبية والقانونية.",
        },
        sharing: {
          title: "4. مشاركة البيانات والإفصاح للأطراف الثالثة",
          content:
            "نلتزم بعدم بيع أو تأجير أو المتاجرة ببياناتك الشخصية. نشارك البيانات الضرورية فقط مع: كباتن التوصيل (الاسم، الموقع، رقم الهاتف)، المتاجر الشريكة (تفاصيل الطلب)، مزودي الخدمات التقنية (الاستضافة السحابية، خدمات OTP، بوابات الدفع)، والجهات الحكومية عند وجود أمر قضائي رسمي.",
        },
        transfer: {
          title: "5. النقل والتخزين الدولي للبيانات عبر الحدود",
          content:
            "قد تتم معالجة وتخزين البيانات عبر خوادم سحابية لدى مزودي خدمات عالميين معتمدين (مثل CloudFlare أو Hostinger). قد تقع هذه الخوادم داخل أو خارج دولة المقر التشغيلي. نضمن التزام جميع المزودين بمعايير تشفير صارمة (مشفرة أثناء النقل وأثناء التخزين).",
        },
        security: {
          title: "6. حماية وأمان البيانات وسجل الخروقات",
          content:
            "نطبق تدابير أمنية تقنية وإدارية شاملة تشمل تشفير SSL/TLS وجدران الحماية وضوابط الوصول الصارمة. في حال وقوع خرق للبيانات، نلتزم بإخطار المستخدمين المتأثرين والجهات التنظيمية المختصة خلال المدة الزمنية المحددة قانوناً.",
        },
        deletion: {
          title: "7. آلية حذف الحساب والبيانات",
          content:
            "يمكنك حذف حسابك نهائياً من داخل التطبيق (الإعدادات > الحساب > حذف الحساب) أو عبر رابط الحذف المباشر (tamaam.cloud/delete-account). يتم مسح الاسم ورقم الهاتف والعناوين وسجل الموقع فوراً. نحتفظ فقط بسجلات الفواتير للفترات المطلوبة ضريبياً في أرشيف مجهّل.",
        },
        rights: {
          title: "8. حقوق المستخدم والتحكم بالبيانات",
          content:
            "تتمتع بحقوق: الوصول لنسخة من بياناتك، التصحيح والتحديث، الحذف والنسيان، تقييد ومعارضة المعالجة، إلغاء الاشتراك في الإشعارات التسويقية، وإدارة أذونات الجهاز (الموقع، الكاميرا، الميكروفون) عبر إعدادات نظام هاتفك.",
        },
        links: {
          title: "9. الروابط والأطراف الخارجية",
          content:
            "قد تحتوي تطبيقاتنا على روابط لمواقع خارجية (مثل صفحات المطاعم أو وسائل التواصل). منصة تمام غير مسؤولة عن ممارسات الخصوصية أو محتوى هذه المواقع. ننصح بقراءة سياسات الخصوصية لكل موقع أو تطبيق خارجي يتم الانتقال إليه.",
        },
        updates: {
          title: "10. التحديثات والتعديلات على سياسة الخصوصية",
          content:
            "نحتفظ بالحق في تعديل هذه السياسة لتتوافق مع التطوير التقني أو التعديلات التشريعية. سنخطرك بالتعديلات الجوهرية عبر إشعار داخل التطبيق أو البريد الإلكتروني قبل سريانها. استمرارك في الاستخدام بعد التحديث يُعد موافقة ضمنية على السياسة المعدلة.",
        },
        contact: {
          title: "11. مسؤول حماية البيانات ومعلومات الاتصال",
          content:
            "للاستفسارات أو الشكاوى المتعلقة بالخصوصية، تواصل مع مسؤول حماية البيانات (DPO) عبر contact@tamaam.cloud. مدة الرد الرسمية: 30 يوماً من استلام الطلب والتحقق من الهوية. رابط حذف الحساب: tamaam.cloud/delete-account",
        },
      },

      // ========== TERMS OF SERVICE PAGE ==========
      terms: {
        title: "شروط الخدمة",
        lastUpdated: "آخر تحديث: يوليو 2026",
        intro:
          "بتحميلكم أو استخدامكم لتطبيق تمام، فإنكم توافقون على الالتزام بشروط الخدمة هذه. يرجى قراءتها بعناية قبل استخدام خدمات التوصيل الخاصة بنا في جميع أنحاء مصر.",
        contents: "المحتويات",
        sections: "أقسام",
        effective: "سارية حالياً",
        print: "طباعة",
        supportText:
          "فريق الدعم الخاص بنا متاح للإجابة على أي أسئلة لديكم بخصوص هذه الشروط.",
        acceptance: {
          title: "قبول الشروط",
          content:
            "بتحميلكم أو استخدامكم لتطبيق تمام بأي طريقة، فإنكم توافقون على الالتزام بشروط الخدمة هذه. في حال عدم الموافقة على أي بند من البنود، يرجى عدم استخدام التطبيق أو الخدمات. استمرار استخدامكم للتطبيق يعتبر موافقة مستمرة على أي شروط محدثة.",
        },
        use: {
          title: "استخدام الخدمة",
          content:
            "توافقون على استخدام تطبيق تمام فقط للأغراض القانونية وطبقاً للقوانين واللوائح المصرية المعمول بها. يمنع استخدام التطبيق في أي أنشطة غير قانونية أو الاحتيال أو المضايقة أو نقل مواد ضارة. نحتفظ بالحق في التحقيق واتخاذ الإجراءات القانونية ضد المخالفات.",
        },
        account: {
          title: "مسؤولية الحساب",
          content:
            "أنتم مسؤولون بالكامل عن الحفاظ على سرية بيانات حسابكم ورقمكم السري. أي نشاط يتم من خلال حسابكم هو مسؤوليتكم. يجب إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابكم. يجب تقديم بيانات صحيحة وكاملة عند إنشاء الحساب.",
        },
        payments: {
          title: "المدفوعات والاسترداد",
          content:
            "جميع المدفوعات تتم من خلال بوابات دفع آمنة ومعتمدة في مصر. رسوم التوصيل تحدد حسب المسافة والوقت والطلب. سياسة الاسترداد تطبق حسب كل حالة وتتم خلال ٧-١٤ يوم عمل. الدفع النقدي متاح في حالات محددة.",
        },
        privacy: {
          title: "الخصوصية وحماية البيانات",
          content:
            "نقوم بجمع ومعالجة بياناتكم الشخصية وفقاً لسياسة الخصوصية الخاصة بنا وقوانين حماية البيانات المصرية. معلوماتكم تستخدم لتقديم خدماتنا وتحسينها ومعالجة الطلبات والتواصل معكم. نحن لا نبيع بياناتكم الشخصية لأي طرف ثالث.",
        },
        termination: {
          title: "إنهاء الخدمة",
          content:
            "نحتفظ بالحق في تعليق أو إنهاء حسابكم في أي وقت بدون إشعار مسبق في حالة مخالفة هذه الشروط أو القوانين المصرية. يمكن أيضاً إيقاف الخدمة بشكل مؤقت للصيانة أو التحديثات. يمكنكم حذف حسابكم في أي وقت من خلال إعدادات التطبيق.",
        },
        liability: {
          title: "حدود المسؤولية",
          content:
            "تطبيق تمام غير مسؤول عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام خدمتنا. مسؤوليتنا محدودة بقيمة الطلب في جميع الأحوال ووفقاً للقانون المصري. نحن غير مسؤولين عن التأخير الناتج عن عوامل خارجة عن سيطرتنا مثل الطقس أو الازدحام المروري أو تصرفات الأطراف الثالثة.",
        },
      },
      // ========== COOKIE POLICY PAGE ==========
      cookies: {
        title: "سياسة ملفات التعريف",
        lastUpdated: "آخر تحديث: يوليو 2026",
        intro:
          "تشرح هذه السياسة كيفية استخدامنا لملفات التعريف والتقنيات المشابهة.",
        what: {
          title: "ما هي ملفات التعريف؟",
          content:
            "ملفات التعريف هي ملفات نصية صغيرة تُخزَّن على جهازك وتساعدنا على تحسين تجربتك.",
        },
        how: {
          title: "كيف نستخدم ملفات التعريف؟",
          content:
            "نستخدم ملفات التعريف الأساسية للوظائف الأساسية، وتحليلية لفهم الاستخدام، وتفضيلات لتذكر إعداداتك.",
        },
        types: {
          title: "أنواع ملفات التعريف",
          essential: "أساسية – ضرورية لعمل التطبيق",
          analytics: "تحليلية – تساعدنا على تحسين الأداء",
          preferences: "تفضيلات – تذكر لغتك ومنطقتك",
        },
        manage: {
          title: "إدارة ملفات التعريف",
          content:
            "يمكنك التحكم في ملفات التعريف وحذفها من خلال إعدادات المتصفح.",
        },
      },

      // ========== FAQ PAGE ==========

      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "كل ما تحتاج معرفته عن تطبيق تمام",
        description:
          "اعثر على إجابات للأسئلة الشائعة حول خدمة التوصيل والمدفوعات والمزيد.",
        searchPlaceholder: "ابحث عن إجابات...",
        categories: {
          general: "أسئلة عامة",
          orders: "الطلبات والتوصيل",
          payments: "المدفوعات والفواتير",
          account: "الحساب والأمان",
          support: "الدعم والمساعدة",
        },
        questions: {
          q1: "ما هو تطبيق تمام؟",
          a1: "تطبيق تمام هو خدمة توصيل سريعة وموثوقة تربطك بالمطاعم المحلية ومتاجر البقالة. نوفر لك ما تحتاجه وقتما تحتاجه.",
          q2: "كيف يمكنني تقديم طلب؟",
          a2: "ببساطة قم بتحميل التطبيق وإنشاء حساب وتصفح المتاجر القريبة وأضف العناصر إلى سلة التسوق ثم أكمل عملية الشراء. سيتم توصيل طلبك إلى باب منزلك.",
          q3: "ما المناطق التي تغطيها خدمة التوصيل؟",
          a3: "نقوم حالياً بالتوصيل إلى بعض مدن الدلتا. ونتوسع قريباً إلى مناطق جديدة بانتظام!",
          q4: "كم يستغرق وقت التوصيل؟",
          a4: "يستغرق التوصيل عادة من 30 إلى 45 دقيقة حسب موقعك ووقت تحضير المطعم. يمكنك تتبع طلبك في الوقت الفعلي.",
          q5: "ما طرق الدفع التي تقبلونها؟",
          a5: "نقبل المحافظ الإلكترونية، انستاباي، والدفع النقدي عند الاستلام.",
          q6: "هل معلومات الدفع الخاصة بي آمنة؟",
          a6: "نعم! نستخدم تشفير على مستوى البنوك ولا نخزن تفاصيل الدفع الكاملة الخاصة بك. جميع المعاملات متوافقة مع معايير PCI.",
          q7: "كيف يمكنني تتبع طلبي؟",
          a7: "يمكنك تتبع طلبك في الوقت الفعلي من خلال التطبيق. ستتلقى إشعارات في كل خطوة: تأكيد الطلب، قيد التحضير، خارج للتوصيل، تم التوصيل.",
          q8: "ماذا لو كان طلبي خاطئاً أو متأخراً؟",
          a8: "اتصل بدعم العملاء على الفور. سنقوم بالتحقيق وتقديم استرداد أو رصيد لأي مشكلة في طلبك.",
          q9: "كيف يمكنني إنشاء حساب؟",
          a9: "قم بتحميل التطبيق واضغط على 'إنشاء حساب'. يمكنك التسجيل باستخدام بريدك الإلكتروني أو رقم هاتفك.",
          q10: "كيف يمكنني إعادة تعيين كلمة المرور؟",
          a10: "اضغط على 'نسيت كلمة المرور' في شاشة تسجيل الدخول. سنرسل لك رابطاً لإعادة تعيين كلمة المرور عبر البريد الإلكتروني أو الرسائل النصية.",
          q11: "كيف يمكنني الاتصال بدعم العملاء؟",
          a11: "يمكنك التواصل معنا على مدار الساعة عبر الدردشة داخل التطبيق أو البريد الإلكتروني support@tamaam.cloud أو الاتصال على +1 (234) 567-8900.",
          q12: "هل يمكنني إلغاء طلبي؟",
          a12: "يمكنك إلغاء طلبك خلال دقيقتين من تقديمه. بعد ذلك، قد يكون المطعم قد بدأ في تحضير طعامك.",
          q13: "هل تقدمون استرداد الأموال؟",
          a13: "نعم، نقدم استرداد الأموال للطلبات الخاطئة أو المفقودة أو غير المرضية. اتصل بالدعم خلال 24 ساعة للحصول على المساعدة.",
          q14: "كيف يمكنني استخدام رمز الخصم؟",
          a14: "أدخل رمز الخصم الخاص بك عند الدفع في حقل 'رمز الخصم'. سيتم تطبيق الخصم تلقائياً على الطلبات المؤهلة.",
          q15: "هل هناك رسوم توصيل؟",
          a15: "تختلف رسوم التوصيل حسب المسافة والطلب. تقدم بعض المطاعم توصيل مجاني للطلبات التي تزيد عن مبلغ معين.",
        },
        stillHaveQuestions: "لا تزال لديك أسئلة؟",
        contactSupport: "اتصل بفريق الدعم",
        supportEmail: "support@tamaam.cloud",
        supportPhone: "+1 (234) 567-8900",
        liveChat: "محادثة مباشرة",
        noResults: "لم يتم العثور على نتائج",
        tryDifferent: "جرب كلمات بحث مختلفة أو تصفح الفئات أدناه",
      },

      // ========== GDPR PAGE ==========
      gdpr: {
        title: "الامتثال للائحة العامة",
        lastUpdated: "آخر تحديث: يوليو 2026",
        intro:
          "نحن ملتزمون بحماية بياناتك والامتثال للائحة العامة لحماية البيانات (GDPR).",
        rights: {
          title: "حقوقك بموجب GDPR",
          right1: "الحق في الوصول – يمكنك طلب نسخة من بياناتك",
          right2: "الحق في التصحيح – تصحيح البيانات غير الدقيقة",
          right3: "الحق في المحو (الحق في النسيان)",
          right4: "الحق في تقييد المعالجة",
          right5: "الحق في نقل البيانات",
          right6: "الحق في الاعتراض على المعالجة",
        },
        data_controller: {
          title: "مراقب البيانات",
          content: "TamamApp Inc، support@tamaam.cloud",
        },
        consent: {
          title: "موافقتك",
          content:
            "باستخدام خدمتنا، فإنك توافق على ممارسات البيانات الخاصة بنا كما هو موضح في هذه السياسة.",
        },
        contact: {
          title: "الاتصال بمسؤول حماية البيانات",
          content:
            "لأي طلبات متعلقة بـ GDPR، يرجى إرسال بريد إلكتروني إلى support@tamaam.cloud.",
        },
      },

      // ========== 404 PAGE ==========
      notFound: {
        title: "الصفحة غير موجودة",
        subtitle: "عذراً! الصفحة التي تبحث عنها غير موجودة.",
        description:
          "ربما تم نقل الصفحة أو حذفها أو لم تكن موجودة. دعنا نعيدك إلى المسار الصحيح.",
        backHome: "العودة للرئيسية",
        goBack: "رجوع",
        suggestions: "قد تبحث عن:",
        errorCode: "خطأ 404",
        helpfulLinks: "روابط سريعة",
      },

      // ========== FOOTER ==========
      footer: {
        rights: "جميع الحقوق محفوظة.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
