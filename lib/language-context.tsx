"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    navAbout: "About",
    navProjects: "Projects",
    navExperience: "Experience",
    navSkills: "Skills",
    navContact: "Contact",
    resumeBtn: "Resume",

    // Hero
    availableBadge: "Available for new opportunities",
    heroGreeting: "Hi, I'm",
    heroName: "Ahmed Qompoz",
    heroTitle: "Full Stack Engineer",
    heroBio:
      "I architect & build production-grade platforms with Next.js, TypeScript and PostgreSQL: ERP systems, cryptographic e-voting, AI tutoring, government-integrated logistics, and real-time ordering. 8 platforms live and actively used by real businesses.",
    heroCtaProjects: "Explore Platforms",
    heroCtaContact: "Get In Touch",

    // Stats
    statPlatforms: "8+",
    statPlatformsLabel: "Live Platforms",
    statSectors: "6",
    statSectorsLabel: "Industry Sectors",
    statExperience: "3+",
    statExperienceLabel: "Years Experience",
    statStack: "Full-Stack",
    statStackLabel: "Next.js & TypeScript",

    // Projects
    projectsBadge: "Featured Work",
    projectsTitle: "Production",
    projectsTitleHighlight: "Platforms",
    projectsDesc:
      "A curated selection of production platforms engineered for high concurrency, robust security, and measurable business outcomes.",
    filterAll: "All Platforms",
    filterRealtime: "Real-time & POS",
    filterGov: "Gov Integration & Logistics",
    filterAI: "AI & EdTech",
    filterHealthcare: "Healthcare & SaaS",
    filterRealestate: "Real Estate",
    caseStudyBtn: "View Case Study",
    liveDemoBtn: "Live Demo",
    sourceCodeBtn: "GitHub",
    resultPrefix: "Impact:",

    // Experience
    expBadge: "Career Track",
    expTitle: "Work",
    expTitleHighlight: "Experience",
    expDesc:
      "Demonstrated track record of delivering high-impact web applications, automated business workflows, and robust APIs.",
    present: "Present",

    // Skills
    skillsBadge: "Tech Stack",
    skillsTitle: "Core",
    skillsTitleHighlight: "Expertise",
    skillsDesc:
      "Modern tools and technologies I use to architect robust, scalable, and responsive production platforms.",

    // Contact
    contactBadge: "Contact Me",
    contactTitle: "Let's Build",
    contactTitleHighlight: "Something Great",
    contactDesc:
      "Ready to turn complex engineering challenges into elegant, resilient solutions? Let's talk about your next project or role.",
    emailCardTitle: "Direct Email",
    locationCardTitle: "Location",
    onlinePresenceTitle: "Online Profiles",
    formNameLabel: "Your Name",
    formEmailLabel: "Your Email",
    formMessageLabel: "Project Details / Message",
    formSubmitBtn: "Send Message",
    formSendingBtn: "Sending...",
    whatsappBtn: "Chat on WhatsApp",

    // Footer
    footerTagline: "Engineered with precision using Next.js, TypeScript & Tailwind CSS.",
    footerBuiltBy: "Built by Ahmed Qompoz",
  },
  ar: {
    // Nav
    navAbout: "نبذة عني",
    navProjects: "المشاريع",
    navExperience: "الخبرة",
    navSkills: "المهارات",
    navContact: "تواصل معي",
    resumeBtn: "السيرة الذاتية",

    // Hero
    availableBadge: "متاح للمشاريع والفرص الجديدة",
    heroGreeting: "أهلاً، أنا",
    heroName: "أحمد قنبز",
    heroTitle: "مهندس برمجيات Full Stack",
    heroBio:
      "أبني وأصمم منصات إنتاجية متكاملة باستخدام Next.js، TypeScript وPostgreSQL: أنظمة ERP، منصات تصويت إلكتروني مشفرة، تعليم مدعوم بالذكاء الاصطناعي، تكامل لوجستي حكومي، وأنظمة طلبات لحظية. 8 منصات حية تخدم أعمالاً ومستخدمين حقيقيين.",
    heroCtaProjects: "تصفح المنصات",
    heroCtaContact: "تواصل معي",

    // Stats
    statPlatforms: "+8",
    statPlatformsLabel: "منصات إنتاجية حية",
    statSectors: "6",
    statSectorsLabel: "قطاعات أعمال مختلفة",
    statExperience: "+3",
    statExperienceLabel: "سنوات خبرة عملية",
    statStack: "Full-Stack",
    statStackLabel: "تطوير شامل بـ Next.js",

    // Projects
    projectsBadge: "أعمال مختارة",
    projectsTitle: "المنصات",
    projectsTitleHighlight: "الإنتاجية",
    projectsDesc:
      "نخبة من المنصات البرمجية التي طورتها لخدمة متطلبات واقعية تجمع بين الأداء العالي، الأمان المحكم، والنتائج القابلة للقياس.",
    filterAll: "جميع المشاريع",
    filterRealtime: "أنظمة لحظية ونقاط بيع",
    filterGov: "تكامل حكومي ولوجستيات",
    filterAI: "ذكاء اصطناعي وتعليم",
    filterHealthcare: "رعاية صحية وSaaS",
    filterRealestate: "منصات عقارية",
    caseStudyBtn: "تفاصيل المشروع",
    liveDemoBtn: "معاينة حية",
    sourceCodeBtn: "الكود المصدري",
    resultPrefix: "الأثر والنتيجة:",

    // Experience
    expBadge: "المسار المهني",
    expTitle: "الخبرة",
    expTitleHighlight: "العملية",
    expDesc:
      "سجل عملي في تطوير وبناء وصيانة منصات الويب المعقدة وأتمتة مسارات العمل وتكاملات الواجهات البرمجية.",
    present: "حالياً",

    // Skills
    skillsBadge: "الترسانة التقنية",
    skillsTitle: "المهارات",
    skillsTitleHighlight: "والخبرات الأساسية",
    skillsDesc:
      "التقنيات والأدوات المعتمدة في بيئات الإنتاج الحية لبناء أنظمة سريعة، مرنة وقابلة للتوسع بسهولة.",

    // Contact
    contactBadge: "تواصل معي",
    contactTitle: "لنبدأ العمل",
    contactTitleHighlight: "سوياً",
    contactDesc:
      "جاهز لتحويل الأفكار والمتطلبات المعقدة إلى برمجيات متينة وعالية الكفاءة. يسعدني التواصل لبحث مشروعك القادم.",
    emailCardTitle: "البريد الإلكتروني المباشر",
    locationCardTitle: "الموقع",
    onlinePresenceTitle: "حساباتي على الإنترنت",
    formNameLabel: "اسمك الكريم",
    formEmailLabel: "بريدك الإلكتروني",
    formMessageLabel: "تفاصيل المشروع أو الرسالة",
    formSubmitBtn: "إرسال الرسالة",
    formSendingBtn: "جارٍ الإرسال...",
    whatsappBtn: "محادثة مباشرة عبر واتساب",

    // Footer
    footerTagline: "تم التطوير باحترافية وهندسة دقيقة باستخدام Next.js وTypeScript.",
    footerBuiltBy: "بناء وتطوير بواسطة أحمد قنبز",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("preferred_lang") as Language;
      if (savedLang === "ar" || savedLang === "en") {
        setLanguageState(savedLang);
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLang;
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferred_lang", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "ar" : "en";
    setLanguage(next);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir: language === "ar" ? "rtl" : "ltr",
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
