"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

interface ExperienceItem {
  company: string;
  roleEn: string;
  roleAr: string;
  periodEn: string;
  periodAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Orchida Digital Services",
    roleEn: "Full Stack Engineer",
    roleAr: "مهندس برمجيات Full Stack",
    periodEn: "Oct 2025 - Present",
    periodAr: "أكتوبر 2025 - الآن",
    locationEn: "Remote",
    locationAr: "عن بُعد",
    descriptionEn:
      "Developing scalable full-stack web applications, backend APIs, and modern responsive user interfaces for digital client platforms.",
    descriptionAr:
      "تطوير تطبيقات ويب متكاملة، وبناء الواجهات البرمجية الخلفية وتصميم واجهات مستخدم متجاوبة وحديثة لمنصات رقمية متقدمة.",
    highlightsEn: [
      "Architecting full-stack web platforms using Next.js, React, and TypeScript",
      "Designing robust relational database schemas and optimizing queries with PostgreSQL & Drizzle ORM",
      "Implementing role-based access control (RBAC) and secure authentication flows",
    ],
    highlightsAr: [
      "تطوير وبناء منصات ويب إنتاجية باستخدام Next.js و React و TypeScript",
      "تصميم مخططات قواعد البيانات العلائقية وتحسين الاستعلامات باستخدام PostgreSQL و Drizzle ORM",
      "تطبيق منظومة أمان متكاملة للتحكم في الصلاحيات (RBAC) والمصادقة الآمنة للمستخدمين",
    ],
    skills: ["Next.js", "TypeScript", "React", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "REST APIs"],
  },
  {
    company: "ViexelMedia",
    roleEn: "Full Stack Developer",
    roleAr: "مطور برمجيات Full Stack",
    periodEn: "Jan 2021 - Jan 2023",
    periodAr: "يناير 2021 - يناير 2023",
    locationEn: "Remote",
    locationAr: "عن بُعد",
    descriptionEn:
      "Built and maintained responsive client web applications, interactive dashboards, and business integrations.",
    descriptionAr:
      "تطوير وصيانة تطبيقات ويب تفاعلية، ولوحات تحكم تجارية، وربط الخدمات البرمجية لمختلف العملاء.",
    highlightsEn: [
      "Developed modular, reusable UI components with React and Tailwind CSS",
      "Integrated RESTful APIs and managed complex front-end application state",
      "Collaborated on feature delivery, code reviews, and cross-browser responsiveness",
    ],
    highlightsAr: [
      "بناء واجهات مستخدم معيارية وقابلة لإعادة الاستخدام باستخدام React و Tailwind CSS",
      "تكامل واجهات برمجة التطبيقات (REST APIs) وإدارة حالة التطبيقات المعقدة بسلاسة",
      "العمل ضمن فريق لتسليم الميزات البرمجية ومراجعة الكود وضمان التوافق التام مع مختلف الأجهزة",
    ],
    skills: ["React", "JavaScript", "HTML5 / CSS3", "Tailwind CSS", "Node.js", "REST APIs", "Git"],
  },
];

export const Experience = () => {
  const { language, dir, t } = useLanguage();

  return (
    <section id="experience" dir={dir} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest">
              {t("expBadge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
            {t("expTitle")}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500 dark:from-white dark:to-blue-400">
              {t("expTitleHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t("expDesc")}
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {EXPERIENCES.map((exp, idx) => {
            const role = language === "ar" ? exp.roleAr : exp.roleEn;
            const period = language === "ar" ? exp.periodAr : exp.periodEn;
            const location = language === "ar" ? exp.locationAr : exp.locationEn;
            const desc = language === "ar" ? exp.descriptionAr : exp.descriptionEn;
            const highlights = language === "ar" ? exp.highlightsAr : exp.highlightsEn;

            return (
              <Card
                key={idx}
                className="bg-card/60 dark:bg-card/40 border-black/5 dark:border-white/10 hover:border-blue-500/40 transition-all backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-black text-foreground tracking-tight">
                          {exp.company}
                        </h3>
                        <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
                          {role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          {period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          {location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    {desc}
                  </p>

                  {/* Key Deliverables / Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-foreground/90 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/5 dark:border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
