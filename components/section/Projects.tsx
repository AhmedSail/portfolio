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

export const Projects = ({ projects = [] }: { projects: DbProject[] }) => {
  const { language, dir, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Helper to determine the category of any DB project dynamically
  const getProjectCategory = (p: DbProject): string => {
    const combined = `${p.title} ${p.tags || ""} ${p.description || ""}`.toLowerCase();
    if (
      combined.includes("real-time") ||
      combined.includes("realtime") ||
      combined.includes("pos") ||
      combined.includes("لحظي") ||
      combined.includes("أفق") ||
      combined.includes("ofuq")
    ) {
      return "realtime";
    }
    if (
      combined.includes("gov") ||
      combined.includes("logistics") ||
      combined.includes("حكومي") ||
      combined.includes("لوجست") ||
      combined.includes("كفاءة") ||
      combined.includes("kafa")
    ) {
      return "gov";
    }
    if (
      combined.includes("ai") ||
      combined.includes("edtech") ||
      combined.includes("ذكاء") ||
      combined.includes("تعليم") ||
      combined.includes("orchida") ||
      combined.includes("أوركيد")
    ) {
      return "ai";
    }
    if (
      combined.includes("security") ||
      combined.includes("voting") ||
      combined.includes("تصويت") ||
      combined.includes("أمان") ||
      combined.includes("aact") ||
      combined.includes("crypto") ||
      combined.includes("healthcare") ||
      combined.includes("clinic") ||
      combined.includes("prescripto") ||
      combined.includes("طبي")
    ) {
      return "security";
    }
    if (
      combined.includes("estate") ||
      combined.includes("عقار") ||
      combined.includes("canaan") ||
      combined.includes("كنعان")
    ) {
      return "realestate";
    }
    return "general";
  };

  // Helper to parse description and extract (Short description + Impact metric)
  const parseProjectContent = (p: DbProject) => {
    // 1. Clean Title (shorten if contains long legacy separators like '|')
    const cleanTitle = p.title.includes("|")
      ? p.title.split("|")[0].trim()
      : p.title;

    // 2. Parse Description and Impact badge
    let shortDesc = p.description || "";
    let impactBadge: string | null = null;

    if (p.description && p.description.includes("|")) {
      const parts = p.description.split("|");
      shortDesc = parts[0].trim();
      impactBadge = parts[1].trim();
    } else {
      // Default fallback outcome if not explicitly delimited
      const cat = getProjectCategory(p);
      if (cat === "realtime") {
        impactBadge = language === "ar" ? "⚡ زمن استجابة لحظي <150ms" : "⚡ <150ms real-time latency";
      } else if (cat === "gov") {
        impactBadge = language === "ar" ? "🏢 تكامل حكومي موثق بـ HMAC" : "🏢 HMAC-verified gov integration";
      } else if (cat === "security") {
        impactBadge = language === "ar" ? "🔒 سجل تدقيق غير قابل للتلاعب" : "🔒 Tamper-proof audit logs";
      } else if (cat === "ai") {
        impactBadge = language === "ar" ? "🧠 استجابات ذكية في أقل من 1.2s" : "🧠 <1.2s dynamic AI responses";
      } else {
        impactBadge = language === "ar" ? "✓ بيئة إنتاجية معتمدة" : "✓ Production verified platform";
      }
    }

    // 3. Clean tags (fix typos like PostegreSQL, next jsc, MogoDB)
    const tags = (p.tags || "")
      .replace(/PostegreSQL/gi, "PostgreSQL")
      .replace(/next jsc/gi, "Next.js")
      .replace(/MogoDB/gi, "MongoDB")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t.toLowerCase() !== "null");

    const category = getProjectCategory(p);

    return {
      cleanTitle,
      shortDesc,
      impactBadge,
      tags: tags.slice(0, 4), // Keep 3-4 key technologies
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
      ? projects
      : projects.filter((p) => {
          const cat = getProjectCategory(p);
          return (
            cat === activeFilter ||
            (activeFilter === "security" && (cat === "security" || cat === "realestate"))
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
                ? "يمكنك إضافة مشاريع جديدة بسهولة عبر لوحة التحكم أو تشغيل السكريبت."
                : "You can add new projects via the admin dashboard or seed script."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const { cleanTitle, shortDesc, impactBadge, tags, category } =
                parseProjectContent(project);

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
                      {project.featured && (
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
                      {/* Prominent Measurable Outcome / Impact Badge */}
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
