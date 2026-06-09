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
        download: "Download",
        contact: "Contact",
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies",
        gdpr: "GDPR",
        legal: "Legal",
        faq: "FAQs",
      },

      // ========== HERO SECTION ==========
      hero: {
        title: "The Ultimate Delivery App",
        subtitle:
          "Fast, reliable, and seamless – your food, groceries, and packages delivered in minutes.",
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
        title: "About Our Company",
        subtitle: "We are on a mission to revolutionise local delivery",
        mission:
          "Our mission is to connect people with the best local businesses through a fast, reliable, and user‑friendly platform.",
        vision:
          "We envision a world where anyone can get what they need, when they need it, with just a tap.",
        team: "Meet our dedicated team of engineers, designers, and logistics experts.",
        stats: {
          downloads: "1M+ Downloads",
          users: "500k+ Active Users",
          cities: "50+ Cities",
          rating: "4.9 Rating",
        },
      },

      // ========== DOWNLOAD PAGE ==========
      download: {
        title: "Get the App",
        subtitle:
          "Available for iOS and Android – download now and start saving time.",
        ios: "App Store",
        android: "Google Play",
        qr: "Scan QR code",
        requirements: "iOS 13+ / Android 6+",
        version: "v2.0.0",
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
        address: "123 Delivery Street, Tech City",
        phone: "+1 (234) 567-8900",
        email_us: "support@tamamapp.com",
        hours: "Mon–Fri: 9am–6pm",
      },

      // ========== PRIVACY POLICY PAGE ==========
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: January 2025",
        intro:
          "Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.",
        collection: {
          title: "Information We Collect",
          content:
            "We collect information you provide directly, such as when you create an account, place an order, or contact support.",
        },
        usage: {
          title: "How We Use Your Information",
          content:
            "We use your data to process orders, improve our services, communicate with you, and ensure security.",
        },
        sharing: {
          title: "Information Sharing",
          content:
            "We do not sell your personal data. We may share it with delivery partners or as required by law.",
        },
        security: {
          title: "Data Security",
          content:
            "We implement industry‑standard measures to protect your data from unauthorised access.",
        },
        rights: {
          title: "Your Rights",
          content:
            "You can request access, correction, or deletion of your data. Contact us for any privacy concerns.",
        },
      },

      // ========== TERMS OF SERVICE PAGE ==========
      terms: {
        title: "Terms of Service",
        lastUpdated: "Last Updated: June 2026",
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
            "All payments are processed through secure, certified payment gateways operating in Egypt. Delivery fees are calculated based on distance, time, and demand. Our refund policy applies on a case-by-case basis and refunds are processed within 7-14 business days. Cash payments are available in select areas.",
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
        lastUpdated: "Last Updated: January 2025",
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
          a1: "TamamApp is a fast, reliable delivery service that connects you with local restaurants, grocery stores, and delivery partners. We make it easy to get what you need, when you need it.",
          q2: "How do I place an order?",
          a2: "Simply download the app, create an account, browse nearby stores, add items to your cart, and checkout. Your order will be delivered to your doorstep.",
          q3: "What areas do you deliver to?",
          a3: "We currently deliver to major cities including New York, Los Angeles, Chicago, Houston, Phoenix, and more. We're expanding to new areas regularly!",
          q4: "How long does delivery take?",
          a4: "Delivery typically takes 30-45 minutes depending on your location and restaurant preparation time. You can track your order in real-time.",
          q5: "What payment methods do you accept?",
          a5: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and cash on delivery in select areas.",
          q6: "Is my payment information secure?",
          a6: "Yes! We use bank-grade encryption and never store your full payment details. All transactions are PCI compliant.",
          q7: "How do I track my order?",
          a7: "You can track your order in real-time through the app. You'll receive notifications at every step: order confirmed, being prepared, out for delivery, and delivered.",
          q8: "What if my order is incorrect or late?",
          a8: "Contact our 24/7 customer support immediately. We'll investigate and provide a refund or credit for any issues with your order.",
          q9: "How do I create an account?",
          a9: "Download the app and tap 'Sign Up'. You can register with your email, phone number, or social media accounts.",
          q10: "How do I reset my password?",
          a10: "Tap 'Forgot Password' on the login screen. We'll send you a link to reset your password via email or SMS.",
          q11: "How do I contact customer support?",
          a11: "You can reach us 24/7 via in-app chat, email at support@tamamapp.com, or call us at +1 (234) 567-8900.",
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
        supportEmail: "support@tamamapp.com",
        supportPhone: "+1 (234) 567-8900",
        liveChat: "Live Chat",
        noResults: "No results found",
        tryDifferent: "Try different keywords or browse categories below",
      },

      // ========== GDPR PAGE ==========
      gdpr: {
        title: "GDPR Compliance",
        lastUpdated: "Last Updated: January 2025",
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
          content:
            "TamamApp Inc., 123 Delivery Street, Tech City, support@tamamapp.com",
        },
        consent: {
          title: "Your Consent",
          content:
            "By using our service, you consent to our data practices as described in this policy.",
        },
        contact: {
          title: "Contact Our DPO",
          content: "For GDPR‑related requests, please email dpo@tamamapp.com.",
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
        download: "تحميل",
        contact: "اتصل بنا",
        privacy: "الخصوصية",
        terms: "الشروط",
        cookies: "ملفات التعريف",
        gdpr: "اللائحة العامة",
        legal: "قانوني",
        faq: "الاسئلة الشائعة",
      },

      // ========== HERO SECTION ==========
      hero: {
        title: "تطبيق التوصيل الأمثل",
        subtitle: "سريع وموثوق وسلس – طعامك، بقالتك وطرودك تُوصَل في دقائق.",
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
        title: "عن شركتنا",
        subtitle: "نحن في مهمة لإحداث ثورة في التوصيل المحلي",
        mission:
          "مهمتنا هي ربط الناس بأفضل الأعمال المحلية من خلال منصة سريعة وموثوقة وسهلة الاستخدام.",
        vision:
          "نطمح إلى عالم حيث يمكن لأي شخص الحصول على ما يحتاجه، وقتما يحتاجه، بنقرة واحدة.",
        team: "تعرف على فريقنا المخلص من المهندسين والمصممين وخبراء الخدمات اللوجستية.",
        stats: {
          downloads: "+1M تحميل",
          users: "+500k مستخدم",
          cities: "+50 مدينة",
          rating: "4.9 تقييم",
        },
      },

      // ========== DOWNLOAD PAGE ==========
      download: {
        title: "حمّل التطبيق",
        subtitle: "متوفر لنظامي iOS و Android – حمّل الآن ووفر وقتك.",
        ios: "متجر Apple",
        android: "متجر Google",
        qr: "امسح رمز QR",
        requirements: "iOS 13+ / Android 6+",
        version: "الإصدار 2.0.0",
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
        address: "123 شارع التوصيل، مدينة التكنولوجيا",
        phone: "+1 (234) 567-8900",
        email_us: "support@tamamapp.com",
        hours: "الاثنين–الجمعة: 9ص–6م",
      },

      // ========== PRIVACY POLICY PAGE ==========
      privacy: {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: يناير 2025",
        intro:
          "خصوصيتك مهمة بالنسبة لنا. تشرح هذه السياسة كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.",
        collection: {
          title: "المعلومات التي نجمعها",
          content:
            "نجمع المعلومات التي تقدمها مباشرة، مثل عند إنشاء حساب أو تقديم طلب أو الاتصال بالدعم.",
        },
        usage: {
          title: "كيف نستخدم معلوماتك",
          content:
            "نستخدم بياناتك لمعالجة الطلبات وتحسين خدماتنا والتواصل معك وضمان الأمان.",
        },
        sharing: {
          title: "مشاركة المعلومات",
          content:
            "لا نبيع بياناتك الشخصية. قد نشاركها مع شركاء التوصيل أو حسبما يقتضيه القانون.",
        },
        security: {
          title: "أمن البيانات",
          content:
            "نطبق إجراءات على مستوى الصناعة لحماية بياناتك من الوصول غير المصرح به.",
        },
        rights: {
          title: "حقوقك",
          content:
            "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها. اتصل بنا لأي استفسار متعلق بالخصوصية.",
        },
      },

      // ========== TERMS OF SERVICE PAGE ==========
      terms: {
        title: "شروط الخدمة",
        lastUpdated: "آخر تحديث: يونيو ٢٠٢٦",
        intro:
          "بتحميلك أو استخدامك لتطبيق تمام، أنت بتوافق على الالتزام بشروط الخدمة دي. يرجى قراءتها بعناية قبل استخدام خدمات التوصيل بتاعتنا في جميع أنحاء مصر.",
        contents: "المحتويات",
        sections: "أقسام",
        effective: "سارية حالياً",
        print: "طباعة",
        supportText:
          "فريق الدعم بتاعنا موجود عشان يجاوب على أي أسئلة عندك بخصوص الشروط دي.",
        acceptance: {
          title: "قبول الشروط",
          content:
            "بتحميلك أو استخدامك لتطبيق تمام بأي طريقة من الطرق، أنت بتوافق على الالتزام بشروط الخدمة دي. لو مش موافق على أي بند من البنود، يرجى عدم استخدام التطبيق أو الخدمات. استمرار استخدامك للتطبيق يعتبر موافقة مستمرة على أي شروط متحدثة.",
        },
        use: {
          title: "استخدام الخدمة",
          content:
            "بتوافق على استخدام تطبيق تمام فقط للأغراض القانونية وطبقاً للقوانين واللوائح المصرية المعمول بها. ممنوع استخدام التطبيق في أي أنشطة غير قانونية أو الاحتيال أو المضايقة أو نقل مواد ضارة. لينا الحق في التحقيق واتخاذ الإجراءات القانونية ضد المخالفات.",
        },
        account: {
          title: "مسؤولية الحساب",
          content:
            "أنت مسؤول بالكامل عن الحفاظ على سرية بيانات حسابك ورقمك السري. أي نشاط بيتم من خلال حسابك هو مسؤوليتك أنت. لازم تبلغنا فوراً عن أي استخدام غير مصرح به لحسابك. يجب تقديم بيانات صحيحة وكاملة عند إنشاء الحساب.",
        },
        payments: {
          title: "المدفوعات والاسترداد",
          content:
            "جميع المدفوعات بتتم من خلال بوابات دفع آمنة ومعتمدة في مصر. رسوم التوصيل بتتحدد حسب المسافة والوقت والطلب. سياسة الاسترداد بتطبق حسب كل حالة وبتتم خلال ٧-١٤ يوم عمل. الدفع نقداً متاح في مناطق محددة.",
        },
        privacy: {
          title: "الخصوصية وحماية البيانات",
          content:
            "بنقوم بجمع ومعالجة بياناتك الشخصية وفقاً لسياسة الخصوصية بتاعتنا وقوانين حماية البيانات المصرية. معلوماتك بتستخدم عشان نقدم ونحسن خدماتنا ونعالج الطلبات ونتواصل معاك. احنا مش بنبيع بياناتك الشخصية لأي طرف تالت.",
        },
        termination: {
          title: "إنهاء الخدمة",
          content:
            "لينا الحق في تعليق أو إنهاء حسابك في أي وقت بدون إشعار مسبق في حالة مخالفة الشروط دي أو القوانين المصرية. ممكن كمان نوقف الخدمة بشكل مؤقت للصيانة أو التحديثات. تقدر تحذف حسابك في أي وقت من خلال إعدادات التطبيق.",
        },
        liability: {
          title: "حدود المسؤولية",
          content:
            "تطبيق تمام مش مسؤول عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام خدمتنا. مسؤوليتنا محدودة بقيمة الطلب في جميع الأحوال ووفقاً للقانون المصري. احنا مش مسؤولين عن التأخير الناتج عن عوامل خارجة عن سيطرتنا زي الطقس أو الزحمة أو تصرفات الأطراف التالتة.",
        },
      },
      // ========== COOKIE POLICY PAGE ==========
      cookies: {
        title: "سياسة ملفات التعريف",
        lastUpdated: "آخر تحديث: يناير 2025",
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
          a1: "تطبيق تمام هو خدمة توصيل سريعة وموثوقة تربطك بالمطاعم المحلية ومتاجر البقالة وشركاء التوصيل. نوفر لك ما تحتاجه وقتما تحتاجه.",
          q2: "كيف يمكنني تقديم طلب؟",
          a2: "ببساطة قم بتحميل التطبيق وإنشاء حساب وتصفح المتاجر القريبة وأضف العناصر إلى سلة التسوق ثم أكمل عملية الشراء. سيتم توصيل طلبك إلى باب منزلك.",
          q3: "ما المناطق التي تغطيها خدمة التوصيل؟",
          a3: "نقوم حالياً بالتوصيل إلى المدن الكبرى بما في ذلك القاهرة والإسكندرية والجيزة ومدن أخرى. نحن نتوسع إلى مناطق جديدة بانتظام!",
          q4: "كم يستغرق وقت التوصيل؟",
          a4: "يستغرق التوصيل عادة من 30 إلى 45 دقيقة حسب موقعك ووقت تحضير المطعم. يمكنك تتبع طلبك في الوقت الفعلي.",
          q5: "ما طرق الدفع التي تقبلونها؟",
          a5: "نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، باي بال، أبل باي، جوجل باي، والدفع عند الاستلام في مناطق محددة.",
          q6: "هل معلومات الدفع الخاصة بي آمنة؟",
          a6: "نعم! نستخدم تشفير على مستوى البنوك ولا نخزن تفاصيل الدفع الكاملة الخاصة بك. جميع المعاملات متوافقة مع معايير PCI.",
          q7: "كيف يمكنني تتبع طلبي؟",
          a7: "يمكنك تتبع طلبك في الوقت الفعلي من خلال التطبيق. ستتلقى إشعارات في كل خطوة: تأكيد الطلب، قيد التحضير، خارج للتوصيل، تم التوصيل.",
          q8: "ماذا لو كان طلبي خاطئاً أو متأخراً؟",
          a8: "اتصل بدعم العملاء على الفور. سنقوم بالتحقيق وتقديم استرداد أو رصيد لأي مشكلة في طلبك.",
          q9: "كيف يمكنني إنشاء حساب؟",
          a9: "قم بتحميل التطبيق واضغط على 'إنشاء حساب'. يمكنك التسجيل باستخدام بريدك الإلكتروني أو رقم هاتفك أو حسابات التواصل الاجتماعي.",
          q10: "كيف يمكنني إعادة تعيين كلمة المرور؟",
          a10: "اضغط على 'نسيت كلمة المرور' في شاشة تسجيل الدخول. سنرسل لك رابطاً لإعادة تعيين كلمة المرور عبر البريد الإلكتروني أو الرسائل النصية.",
          q11: "كيف يمكنني الاتصال بدعم العملاء؟",
          a11: "يمكنك التواصل معنا على مدار الساعة عبر الدردشة داخل التطبيق أو البريد الإلكتروني support@tamamapp.com أو الاتصال على +1 (234) 567-8900.",
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
        supportEmail: "support@tamamapp.com",
        supportPhone: "+1 (234) 567-8900",
        liveChat: "محادثة مباشرة",
        noResults: "لم يتم العثور على نتائج",
        tryDifferent: "جرب كلمات بحث مختلفة أو تصفح الفئات أدناه",
      },

      // ========== GDPR PAGE ==========
      gdpr: {
        title: "الامتثال للائحة العامة",
        lastUpdated: "آخر تحديث: يناير 2025",
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
          content:
            "TamamApp Inc.، 123 شارع التوصيل، مدينة التكنولوجيا، support@tamamapp.com",
        },
        consent: {
          title: "موافقتك",
          content:
            "باستخدام خدمتنا، فإنك توافق على ممارسات البيانات الخاصة بنا كما هو موضح في هذه السياسة.",
        },
        contact: {
          title: "الاتصال بمسؤول حماية البيانات",
          content:
            "لأي طلبات متعلقة بـ GDPR، يرجى إرسال بريد إلكتروني إلى dpo@tamamapp.com.",
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
