"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Folder,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

export interface DbProject {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  tags: string | null;
  gallery: string | null;
  featured: boolean;
  createdAt?: any;
}

// Project bilingual content dictionary
const PROJECT_TRANSLATIONS: Record<
  string,
  {
    titleEn: string;
    descEn: string;
    impactEn?: string;
    titleAr?: string;
    descAr?: string;
    impactAr?: string;
    tags?: string[];
    category?: string;
  }
> = {
  // AACT
  "1edf6f86-db8d-47e5-b241-280b226b7754": {
    titleEn: "AACT | Professional Education & International Accreditation Platform",
    descEn:
      "Integrated educational ecosystem for graduate programs, specialized diplomas, and automated instant QR certificate validation.",
    impactEn: "Official global accreditation & instant QR verification",
    titleAr: "منصة الأكاديمية الأمريكية للاستشارات والتدريب (AACT)",
    descAr:
      "منظومة تعليمية ومهنية دولية تدمج برامج الدراسات العليا المهنية والاعتمادات مع فحص فوري للشهادات عبر الـ QR ومصحح آلي ذكي.",
    impactAr: "اعتمادات دولية رسمية ونظام فحص فوري للشهادات بالـ QR",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    category: "ai",
  },
  // Ofuq Cafe
  "4bd559df-b895-49d1-9e4a-1fcdcb8470a3": {
    titleEn: "Ofuq Cafe | Real-Time Cloud POS & QR Ordering System",
    descEn:
      "Smart table QR ordering and cloud POS platform with live kitchen dispatching and multi-tier cashier management.",
    impactEn: "Live kitchen sync & zero order loss during rush hours",
    titleAr: "منظومة كافيه أفق الذكية | نقاط البيع السحابية والطلبات اللحظية",
    descAr:
      "منظومة سحابية لحظية لإدارة طلبات الطاولات عبر الـ QR ونقاط البيع السحابية مع مزامنة فورية للمطبخ والكاشير.",
    impactAr: "مزامنة لحظية للطلبات وضمان عدم فقدان أي طلب وقت الذروة",
    tags: ["Next.js", "PostgreSQL", "WebSockets", "Tailwind CSS"],
    category: "realtime",
  },
  // PYSP (E-Voting)
  "d4764bfe-69f2-44e8-a946-c5e41680d327": {
    titleEn: "PYSP | Smart Civic Engagement & E-Voting Platform",
    descEn:
      "Civic participation platform featuring cryptographic ballot auditing, verified voting sessions, and multi-tier governance.",
    impactEn: "Verifiable electoral audit trails & strict RBAC",
    titleAr: "منصة البرلمان الشبابي الفلسطيني (PYSP) | منظومة الاقتراع والمشاركة المدنية",
    descAr:
      "منصة رقمية للمشاركة المدنية وإجراء الانتخابات بسجلات اقتراع مدققة ومحمية وصلاحيات انتخابية مشددة.",
    impactAr: "سجلات اقتراع موثقة وتدقيق انتخابي غير قابل للتلاعب",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    category: "security",
  },
  // Darb (درب)
  "07aeaeee-d016-4059-9a3e-289e7a58523b": {
    titleEn: "Darb | Logistics Fleet Management & Gov Integration Gateway",
    descEn:
      "Enterprise freight management platform featuring real-time Bayan / Logisti API integration for official Waybill lifecycle and static IP proxy routing.",
    impactEn: "Direct Bayan API integration & instant official waybills",
    titleAr: "منصة درب لإدارة النقل واللوجستيات والتكامل الحكومي (منصة بيان)",
    descAr:
      "منظومة لوجستية متكاملة تتميز بربط مباشر ولحظي مع منصة بيان (الهيئة العامة للنقل) لإصدار وثائق النقل الرسمية (Waybills) وProxy Routing آمن.",
    impactAr: "ربط حكومي مباشر مع منصة بيان وإصدار فوري لوثائق النقل",
    tags: ["Next.js", "React", "PostgreSQL", "Drizzle ORM", "Bayan API"],
    category: "gov",
  },
  // Kafa'ah (كفاءة)
  "kafaah-platform": {
    titleEn: "Kafa'ah | Operations & Supply Chain Management Platform",
    descEn:
      "Enterprise operational platform engineered for supply chain tracking, automated workflow routing, and real-time operational performance analytics.",
    impactEn: "Automated operations dispatch & supply chain tracking",
    titleAr: "منصة كفاءة (Kafa'ah) | منظومة إدارة العمليات وسلاسل الإمداد",
    descAr:
      "منظومة سحابية متطورة لإدارة العمليات التشغيلية، ومتابعة الأداء، وأتمتة مسارات العمل وتتبع سلاسل الإمداد للمؤسسات بكفاءة وموثوقية عالية.",
    impactAr: "أتمتة العمليات التشغيلية وتتبع سلاسل الإمداد",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Operations ERP"],
    category: "gov",
  },
  // Yiwu Futian
  "860e4efd-984a-4fbd-98d3-39313ed2f279": {
    titleEn: "Yiwu Futian Market | Multi-Vendor E-Commerce Platform",
    descEn:
      "Comprehensive multi-vendor e-commerce platform with dedicated merchant dashboards, inventory workflows, and localization.",
    impactEn: "Multi-vendor catalog architecture & secure checkouts",
    titleAr: "سوق الفوتيان | منصة تجارة إلكترونية شاملة ومتعددة المتاجر",
    descAr:
      "بناء وتطوير منصة تجارة إلكترونية شاملة ومتعددة المتاجر مع لوحات تحكم للبائعين، وإدارة مرنة للمخزون والطلبات.",
    impactAr: "بنية تحتية متكاملة للمتاجر المتعددة وبوابات الدفع",
    tags: ["Next.js", "React", "TypeScript", "Redux Toolkit", "PostgreSQL"],
    category: "ecommerce",
  },
  // VEO AI
  "1a34c58b-d383-474e-a2ba-179d21a67dd9": {
    titleEn: "VEO AI | Modern Video & Digital Content Studio",
    descEn:
      "Interactive digital studio interface designed for video generation workflows, asset management, and creative tooling.",
    impactEn: "Interactive digital studio & media asset workspace",
    titleAr: "منصة VEO AI | استوديو إنتاج وتوليد الفيديو الرقمي",
    descAr:
      "استوديو تفاعلي حديث لأتمتة وتوليد محتوى الفيديو بالوسائط الذكية مع واجهة تحكم متجاوبة وإدارة الأصول الرقمية.",
    impactAr: "واجهة استوديو عصرية لمعالجة الوسائط والأصول الرقمية",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "AI Tools"],
    category: "ai",
  },
  // Orchida Digital Services
  "0d357438-fabe-4a68-9823-b2ca3b9bd098": {
    titleEn: "Orchida Digital Services | Enterprise Business Portal",
    descEn:
      "Corporate digital services portal with automated SMS/email communications, client intake flows, and high-performance UI.",
    impactEn: "Automated SMS/Brevo notification pipelines",
    titleAr: "منصة أوركيد للخدمات الرقمية (Orchida Digital Services)",
    descAr:
      "بوابة رقمية مؤسسية لتقديم الخدمات الرقمية وحلول الأعمال مع أتمتة إشعارات الرسائل (HotSMS/Brevo) وتجربة مستخدم تفاعلية.",
    impactAr: "مسارات أتمتة للإشعارات عبر Brevo و HotSMS",
    tags: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    category: "gov",
  },
  // Prescripto
  "f0092f5f-6ee7-4070-9f88-e4cf5815b63e": {
    titleEn: "Prescripto | Medical Appointment & Clinic Booking System",
    descEn:
      "Healthcare scheduling platform enabling patients to browse specialists, check live clinic schedules, and book appointments.",
    impactEn: "Streamlined clinic scheduling & doctor availability",
    titleAr: "منظومة بريسكريبتو (Prescripto) | حجز وإدارة المواعيد الطبية",
    descAr:
      "منظومة رقمية متخصصة لحجز وإدارة مواعيد العيادات الطبية، مع استعراض تخصصات الأطباء وجداول التوفر المباشرة للمرضى.",
    impactAr: "إدارة مبسطة لحجوزات العيادات وجداول الأطباء",
    tags: ["React", "Tailwind CSS", "Context API", "REST APIs"],
    category: "security",
  },
  // E-Shop
  "810502da-057b-45df-be2f-93e85cf43997": {
    titleEn: "Modern E-Commerce Storefront",
    descEn:
      "Responsive online storefront featuring custom color theming, component-based catalog architecture, and fluid shopping cart state.",
    titleAr: "متجر إلكتروني متكامل (E-Commerce Storefront)",
    descAr:
      "متجر إلكتروني تفاعلي متجاوب مبني بهندسة المكونات المعيارية مع إدارة حالة سلة المشتريات وتنسيق عصري.",
    tags: ["React", "Tailwind CSS", "JavaScript ES6+", "State Management"],
    category: "ecommerce",
  },
  // Meeting website
  "f7c2dd22-4147-4989-917a-b5dea9efad5e": {
    titleEn: "Web-Based Video Meeting Platform",
    descEn:
      "Real-time virtual video conferencing web client integrating ZegoCloud SDK for responsive, peer-to-peer visual communication.",
    titleAr: "منصة الاجتماعات المرئية (Meeting Platform)",
    descAr:
      "تطبيق ويب للاجتماعات المرئية التفاعلية مع تكامل واجهة ZegoCloud لتوفير اتصال صوتي ومرئي سلس داخل المتصفح.",
    tags: ["React", "Tailwind CSS", "ZegoCloud API", "WebRTC"],
    category: "realtime",
  },
  // Mero Shop
  "7f69fadf-7e31-4f8b-91cf-00257dc77014": {
    titleEn: "Mero Shop E-Commerce Platform",
    descEn:
      "Front-end e-commerce application integrating OAuth social logins, toast notification systems, and Redux global state management.",
    titleAr: "متجر ميرو شوب (Mero Shop)",
    descAr:
      "تطبيق متجر إلكتروني يدمج تسجيل الدخول بحسابات التواصل، ونظام إشعارات تفاعلي مع إدارة الحالة عبر Redux.",
    tags: ["React", "Tailwind CSS", "Redux", "OAuth"],
    category: "ecommerce",
  },
  // Inventory Management
  "fc6807b6-7f27-44e4-80f3-d3c970d09277": {
    titleEn: "Cloud Inventory Management System",
    descEn:
      "Full-stack inventory tracking dashboard built with Next.js, Shadcn/UI, and serverless PostgreSQL database.",
    titleAr: "نظام إدارة المخزون السحابي (Inventory Management)",
    descAr:
      "لوحة تحكم سحابية لإدارة المخزون وتتبع المنتجات بدقة بالاعتماد على Next.js ومكونات Shadcn/UI وقاعدة بيانات بوستجريس سحابية.",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "Shadcn UI"],
    category: "security",
  },
};

export const Projects = ({ projects = [] }: { projects: DbProject[] }) => {
  const { language, dir, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter out portfolio self-project
  const publicProjects = projects.filter((p) => {
    if (p.id === "3d8b9055-f691-4115-82e7-433d38afff34") return false;
    const lower = (p.title || "").toLowerCase();
    return !lower.includes("بورتفوليو") && !lower.includes("portfolio");
  });

  // Helper to determine category dynamically
  const getProjectCategory = (p: DbProject): string => {
    if (PROJECT_TRANSLATIONS[p.id]?.category) {
      return PROJECT_TRANSLATIONS[p.id].category!;
    }
    const combined = `${p.title} ${p.tags || ""} ${p.description || ""}`.toLowerCase();
    if (combined.includes("pos") || combined.includes("أفق") || combined.includes("ufuq")) {
      return "realtime";
    }
    if (combined.includes("logistics") || combined.includes("لوجست") || combined.includes("كفاءة") || combined.includes("بيان")) {
      return "gov";
    }
    if (combined.includes("veo") || combined.includes("aact") || combined.includes("ذكاء")) {
      return "ai";
    }
    if (combined.includes("voting") || combined.includes("تصويت") || combined.includes("prescripto") || combined.includes("طبي")) {
      return "security";
    }
    return "ecommerce";
  };

  // Helper to parse description, title and impact
  const parseProjectContent = (p: DbProject) => {
    const translation = PROJECT_TRANSLATIONS[p.id];

    let cleanTitle = p.title.includes("|") ? p.title.split("|")[0].trim() : p.title;
    let shortDesc = p.description ? p.description.split("|")[0].trim() : "";
    let impactBadge: string | null = null;

    if (translation) {
      if (language === "en") {
        cleanTitle = translation.titleEn;
        shortDesc = translation.descEn;
        impactBadge = translation.impactEn || null;
      } else {
        cleanTitle = translation.titleAr || cleanTitle;
        shortDesc = translation.descAr || shortDesc;
        impactBadge = translation.impactAr || null;
      }
    } else {
      // For any future project: only use explicit delimiter '|' for impact; no fake defaults
      if (p.description && p.description.includes("|")) {
        const parts = p.description.split("|");
        shortDesc = parts[0].trim();
        impactBadge = parts[1].trim();
      }
    }

    // Clean tags
    const tags = (translation?.tags || (p.tags || "")
      .replace(/PostegreSQL/gi, "PostgreSQL")
      .replace(/next jsc/gi, "Next.js")
      .replace(/MogoDB/gi, "MongoDB")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && tag.toLowerCase() !== "null")
    ).slice(0, 4);

    const category = getProjectCategory(p);

    return {
      cleanTitle,
      shortDesc,
      impactBadge,
      tags,
      category,
    };
  };

  const filterTabs = [
    { key: "all", label: t("filterAll"), icon: Folder },
    { key: "realtime", label: t("filterRealtime"), icon: Zap },
    { key: "gov", label: t("filterGov"), icon: Server },
    { key: "ai", label: t("filterAI"), icon: Sparkles },
    { key: "security", label: t("filterHealthcare"), icon: ShieldCheck },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? publicProjects
      : publicProjects.filter((p) => {
          const cat = getProjectCategory(p);
          return (
            cat === activeFilter ||
            (activeFilter === "security" && (cat === "security" || cat === "ecommerce"))
          );
        });

  return (
    <section id="projects" dir={dir} className="py-28 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Folder className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              {t("projectsBadge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
            {t("projectsTitle")}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 dark:from-white dark:to-blue-400">
              {t("projectsTitleHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("projectsDesc")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 max-w-4xl mx-auto">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-card/70 hover:bg-card border border-black/5 dark:border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Database Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-card/40 border border-black/5 dark:border-white/10 max-w-xl mx-auto">
            <Folder className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold mb-1">
              {language === "ar" ? "لا توجد مشاريع في هذا القسم بعد" : "No projects in this category"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {language === "ar"
                ? "يمكنك إضافة مشاريع جديدة بسهولة عبر لوحة التحكم."
                : "You can add new projects via the admin dashboard."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const { cleanTitle, shortDesc, impactBadge, tags, category } =
                parseProjectContent(project);

              // Only flagship production projects get featured badge
              const isFlagshipFeatured =
                project.featured &&
                project.id !== "7f69fadf-7e31-4f8b-91cf-00257dc77014" && // Not Mero Shop
                project.id !== "fc6807b6-7f27-44e4-80f3-d3c970d09277"; // Not Inventory

              return (
                <Card
                  key={project.id || index}
                  className="group relative bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 hover:border-blue-500/40 transition-all duration-500 overflow-hidden backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={
                        project.imageUrl ||
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                      }
                      alt={cleanTitle}
                      width={600}
                      height={380}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 start-4 flex items-center gap-2">
                      <Badge className="bg-blue-600/90 backdrop-blur-md text-white border-0 px-3 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px]">
                        {category}
                      </Badge>
                      {isFlagshipFeatured && (
                        <Badge className="bg-amber-500/90 backdrop-blur-md text-white border-0 px-2.5 py-1 rounded-xl font-bold text-[10px]">
                          ★ Featured
                        </Badge>
                      )}
                    </div>

                    {/* External Quick Links */}
                    <div className="absolute top-4 end-4 flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                          title={t("sourceCodeBtn")}
                          aria-label={t("sourceCodeBtn")}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                          title={t("liveDemoBtn")}
                          aria-label={t("liveDemoBtn")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* 3-4 Key Tech Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {tags.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Clean Short Title */}
                      <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-blue-500 transition-colors leading-snug">
                        <Link href={`/view/projects/${project.id}`}>{cleanTitle}</Link>
                      </h3>

                      {/* Crisp 1-line Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {shortDesc}
                      </p>
                    </div>

                    <div>
                      {/* Genuine Measurable Outcome / Impact Badge */}
                      {impactBadge && (
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-4">
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                            <span className="line-clamp-1">{impactBadge}</span>
                          </div>
                        </div>
                      )}

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                        <Link
                          href={`/view/projects/${project.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider"
                        >
                          <span>{t("caseStudyBtn")}</span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 ${
                              language === "ar" ? "rotate-180" : ""
                            }`}
                          />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                          >
                            <span>{t("liveDemoBtn")}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
